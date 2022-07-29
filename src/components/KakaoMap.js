/*global kakao*/ 
import React, { useEffect, useState } from 'react';
import '../styles/components/KakaoMap.css';
import ChargingStationModal from './ChargingStationModal'

const KakaoMap = () => {
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption); 
    });

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