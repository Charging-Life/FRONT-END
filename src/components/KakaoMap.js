/*global kakao*/ 
import React, { useEffect, useState } from 'react';
import '../styles/components/KakaoMap.css';
import ChargingStationModal from './Modals/ChargingStationModal'

const KakaoMap = ({station, stationState, setLocation}) => {
    const [showModal, setShowModal] = useState(false)

    const selectSrc = (id) => {
        let color
        stationState.filter(state => {
            if(state.statId === id){
                switch(state.stat){
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
        return !color?'green':color;
    }

    useEffect(()=>{
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(36.14490754662367, 128.3917041774922), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption); 

        if(station && stationState){
            const geocoder = new kakao.maps.services.Geocoder();
    
            const callback = (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const locationStr = result[0].address_name.split(' ');
                    setLocation(locationStr[0]);
                }
            };
            geocoder.coord2RegionCode(128.34426484783592, 36.11765842312729, callback);
    
            station.map(stationData =>{
                // console.log(stationData.business.businessId);
                const latlng = new kakao.maps.LatLng(stationData['lat'], stationData['lng']);
    
                const comImgSrc = `${process.env.REACT_APP_PROXY}/marker_${stationData.business.businessId}.png`;
                const comImgSize = new kakao.maps.Size(22, 40); 
    
                const markerImgSrc = `${process.env.REACT_APP_PROXY}/CL_marker_${selectSrc(stationData.business.businessId)}.png`;
                const markerImgSize = new kakao.maps.Size(30, 44); 
    
                const createComImg = new kakao.maps.MarkerImage(comImgSrc, comImgSize); 
                const createMarkerImg = new kakao.maps.MarkerImage(markerImgSrc, markerImgSize); 
    
                const comImg = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: latlng, // 마커를 표시할 위치
                    image : createComImg // 마커 이미지 
                });
                const markerImg = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: latlng, // 마커를 표시할 위치
                    image : createMarkerImg, // 마커 이미지 
                    clickable: true
                });

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(markerImg, 'click', ()=>{
                    setShowModal([true, stationData['statId']]);
                });
            })
        }
    },[station, stationState]);

    return (
        <>
            <div id='map' className='KakaoMap'></div>

            <ChargingStationModal
                show={showModal}
                onHide={()=>{setShowModal(false)}}
            />
        </>
    );
};

export default KakaoMap;