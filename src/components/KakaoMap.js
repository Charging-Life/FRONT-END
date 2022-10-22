/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/components/KakaoMap.css';
import LoadingWindow from './LoadingWindow';
import ChargingStationModal from './Modals/ChargingStationModal';
import useInterval from '../hooks/useInterval';

const KakaoMap = ({ station, setLocation, isManager, location }) => {
    // 상세정보 모달 
    const [showModal, setShowModal] = useState(false);
    const [myLoc, setMyLoc] = useState(false);
    const [center, setCenter] = useState('');
    const [statId, setStatId] = useState('');
    const [isbookmarked, setIsBookmarked] = useState(false);
    const [getCenter, setGetCenter] = useState('');
    const [getLevel, setGetLevel] = useState(5);

    // 즐겨찾기 여부를 조회
    const bookmarkFlag = (statId) => {
        axios.get(`${process.env.REACT_APP_PROXY}/member/station/${statId}`, {
            headers: {
                'Authorization': localStorage.getItem('CL_accessToken')
            }
        })
            .then((res) => {
                if (res.data === true) {
                    setIsBookmarked(true);
                }
            })
            .catch(err => console.log(err));
    }

    // 마커 클릭 이벤트
    const handleClick = (statId) => {
        setIsBookmarked(false);
        setStatId(statId);
        bookmarkFlag(statId);
    }

    // 마커 색 지정 함수
    const selectSrc = (chargers) => {
        // 전체 마커 중 색 판별
        let statList = [];
        chargers.map(x=>{
            switch (x.stat) {
                case 2:
                    statList.push(1); break;
                case 3:
                    statList.push(2); break;
                case 1: case 9:
                    statList.push(3); break;
                case 4: case 5:
                    statList.push(4); break;
                default:
            }
        })
        const colorNum = isManager?Math.max(...statList):Math.min(...statList);
        let color;
        switch(colorNum){
            case 1:
                color = 'green'; break;
            case 2:
                color = 'blue'; break;
            case 3:
                color = 'yellow'; break;
            case 4:
                color = 'red'; break;
            default:
        }
        return !color ? 'green' : color;
    }

    const createMarker = (map) => {
        // 마커 생성
        station.map(stationData => {
            const businessId = isManager ? stationData.business.businessId : stationData.statId[0] + stationData.statId[1];
            // 마커 위치
            const latlng = new kakao.maps.LatLng(stationData['lat'], stationData['lng']);
            // 회사 이미지
            const comImgSrc = `${process.env.REACT_APP_PROXY}/marker_${businessId}.png`;
            const comImgSize = new kakao.maps.Size(22, 40);
            // 마커 이미지
            const markerImgSrc = `${process.env.REACT_APP_PROXY}/CL_marker_${selectSrc(stationData.chargers)}.png`;
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

    const createMap = () => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(center.lat, center.lng), // 지도의 중심좌표
                level: getLevel // 지도의 확대 레벨
            };
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);

        createMarker(map);

        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        if(!isManager) kakao.maps.event.addListener(map, 'center_changed', function () {
            // 지도의 중심좌표를 얻어옵니다 
            var latlng = map.getCenter();
            var level = map.getLevel();

            setGetCenter(latlng);
            setGetLevel(level);
        });
    }

    useEffect(() => {
        if (station.length > 0) {
            createMap();
            setMyLoc(true);
        }
    }, [station])

    const falseMyLoc = () => {
        alert('현재 위치를 받아오지 못했습니다.\n위치 액세스 허용을 확인해주세요.');
        setCenter({ lat: 37.514575, lng: 127.0495556 });
        setMyLoc(true);
    }

    const findMyLoc = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude, // 위도
                    lng = position.coords.longitude; // 경도

                const geocoder = new kakao.maps.services.Geocoder();

                const callback = (result, status) => {
                    // 주소가 정상적으로 받아와졌다면
                    if (status === kakao.maps.services.Status.OK) {
                        // 상위 주소만 받아와 저장
                        const locationStr = result[0].address_name.split(' ');
                        setCenter({ lat: lat, lng: lng });
                        setLocation(locationStr[0]);
                    }
                };
                // 좌표와 콜백 함수를 인자로 전달
                geocoder.coord2RegionCode(lng, lat, callback);
            });
        }
        else {
            if (center === '') falseMyLoc();
        }
    }

    useEffect(() => {
        findMyLoc();
    }, []);

    const checkAddress = (locationStr, lat, lng) => {
        if(location !== locationStr){
            setCenter({ lat: lat, lng: lng });
            setLocation(locationStr);
        }
    }

    const checkCenter = () => {
        const geocoder = new kakao.maps.services.Geocoder();
        const lat = getCenter.getLat();
        const lng = getCenter.getLng();

        const callback = (result, status) => {
            // 주소가 정상적으로 받아와졌다면
            if (status === kakao.maps.services.Status.OK) {
                // 상위 주소만 받아와 저장
                const locationStr = result[0].address_name.split(' ');

                checkAddress(locationStr[0], lat, lng);
            }
        };
        // 좌표와 콜백 함수를 인자로 전달
        geocoder.coord2RegionCode(lng, lat, callback);
    }

    useInterval(checkCenter, 2000);

    return (
        <>
            <div id='map' className='KakaoMap'></div>
            {!myLoc && <LoadingWindow falseMyLoc={falseMyLoc} />}
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