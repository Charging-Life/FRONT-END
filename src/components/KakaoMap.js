/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/components/KakaoMap.css';
import LoadingWindow from './LoadingWindow';
import ChargingStationModal from './Modals/ChargingStationModal';

const KakaoMap = ({ station, stationState, setLocation, isManager, location, userMain }) => {
    // 상세정보 모달 
    const [showModal, setShowModal] = useState(false);
    const [statId, setStatId] = useState('');
    const [isbookmarked, setIsBookmarked] = useState(false);
    const [myLoc, setMyLoc] = useState(false);
    const [center, setCenter] = useState({lat: 37.514575, lng: 127.0495556})

    // 마커 색 지정 함수
    const selectSrc = (id) => {
        let color
        // 전체 마커 중 station에 일치하는 id만 색 판별
        stationState.filter(state => {
            if (state.statId === id) {
                switch (state.stat) {
                    case '2':
                        color = 'green';
                        break;
                    case '3':
                        color = 'blue';
                        break;
                    case '4': case '5':
                        color = 'red';
                        break;
                    case '1': case '9':
                        color = 'yellow';
                        break
                    default:
                        color = 'green';
                }
            }
        });
        return !color ? 'green' : color;
    }

    // 마커 클릭 이벤트
    const handleClick = (statId) => {
        setIsBookmarked(false);
        setStatId(statId);
        bookmarkFlag(statId);
    }

    // 즐겨찾기 여부를 조회
    const bookmarkFlag = (statId) => {
        axios.get(`${process.env.REACT_APP_PROXY}/member/station/${statId}`, {
            headers : {
                'Authorization' : localStorage.getItem('CL_accessToken')
            }
        })
        .then((res)=>{
            if(res.data === true) {
                setIsBookmarked(true);
            }
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        if (!userMain) {
            const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(center.lat, center.lng), // 지도의 중심좌표
                    level: 5 // 지도의 확대 레벨
                };
            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            const map = new kakao.maps.Map(mapContainer, mapOption);

            const createMarker = () => {
                // station, stationState가 있을 경우
                if (station && stationState) {
                    // 마커 생성
                    station.map(stationData => {
                        const businessId = isManager ? stationData.business.businessId : stationData.statId[0] + stationData.statId[1];
                        // 마커 위치
                        const latlng = new kakao.maps.LatLng(stationData['lat'], stationData['lng']);
                        // 회사 이미지
                        const comImgSrc = `${process.env.REACT_APP_PROXY}/marker_${businessId}.png`;
                        const comImgSize = new kakao.maps.Size(22, 40);
                        // 마커 이미지
                        const markerImgSrc = `${process.env.REACT_APP_PROXY}/CL_marker_${selectSrc(businessId)}.png`;
                        const markerImgSize = new kakao.maps.Size(30, 44);

                        // 회사 이미지와 마커 이미지 세팅
                        const createComImg = new kakao.maps.MarkerImage(comImgSrc, comImgSize);
                        const createMarkerImg = new kakao.maps.MarkerImage(markerImgSrc, markerImgSize);

                        // 회사이미지와 마커 이미지를 중복으로 생성
                        const comImg = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: latlng, // 마커를 표시할 위치
                            image: createComImg // 마커 이미지 
                        });
                        const markerImg = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: latlng, // 마커를 표시할 위치
                            image: createMarkerImg, // 마커 이미지 
                            clickable: true
                        });

                        // 마커에 클릭이벤트를 등록합니다
                        kakao.maps.event.addListener(markerImg, 'click', () => {
                            handleClick(stationData.statId);
                            setShowModal(true);
                        });
                    })
                }
            }

            const failGetLoc = () => {
                alert('현재 위치를 받아올 수 없습니다.');
                createMarker(37.514575, 127.0495556);
                setMyLoc(true);
            }
            const successGetLoc = (lat, lng) => {
                // 경도 위도를 통해 주소를 얻기 위한 api
                const geocoder = new kakao.maps.services.Geocoder();

                const callback = (result, status) => {
                    // 주소가 정상적으로 받아와졌다면
                    if (status === kakao.maps.services.Status.OK) {
                        // 상위 주소만 받아와 저장
                        const locationStr = result[0].address_name.split(' ');
                        setLocation(locationStr[0]);
                    }
                };
                // 좌표와 콜백 함수를 인자로 전달
                geocoder.coord2RegionCode(lng, lat, callback);
                setMyLoc(true);
            }
            // 현재 위치 받아오기
            // 현재 위치를 받아올수 있다면
            const getMyLoc = () => {
                let success = false;
                if (navigator.geolocation) {
                    success = true;
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function (position) {

                        var lat = position.coords.latitude, // 위도
                            lng = position.coords.longitude; // 경도

                        var locPosition = new kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

                        setCenter({lat: lat, lng: lng});
                        map.setCenter(locPosition);
                        successGetLoc(lat, lng);
                        return;
                    });
                }
                // 현재 위치를 받아올 수 없다면
                else {
                    failGetLoc();
                    return;
                }
                setTimeout(() => {
                    if (!success) failGetLoc();
                    return;
                }, 10000);
            }
            if(station.length === 0) getMyLoc();
            if(station.length > 0) createMarker();
        }
    }, [station, stationState, userMain]);

    return (
        <>
            <div id='map' className='KakaoMap'></div>
            {!myLoc && <LoadingWindow />}
            <ChargingStationModal
                show={showModal}
                statId={statId}
                isbookmarked={isbookmarked}
                setIsBookmarked={setIsBookmarked}
                onHide={() => { setShowModal(false) }}
            />
        </>
    );
};

export default KakaoMap;