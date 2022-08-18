import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingStationModal.css';

const ChargingStationModal = ({show, onHide}) => {
    const [stationDetail, setStationDetail] = useState({});
    const [chargerList, setChargerList] = useState([]);

    useEffect(()=>{
        if(show[1]){
            axios.get(`${process.env.REACT_APP_PROXY}/station/${show[1]}`)
            .then((res)=>{
                setStationDetail({
                    stat: '',
                    statNm: res.data.statNm,
                    address: res.data.address,
                    business: res.data.business,
                    useTime: res.data.useTime,
                    businessCall: res.data.businessCall,
                    parkingFree: res.data.parkingFree
                })
                setChargerList(res.data.chargerDtos);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[show[1]])

    return (
        <div className='ChargingStationModal'>
            <Modal centered show={show[0]} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>충전소 운영 현황</span>
                    <div id='close-icon' onClick={onHide}><img src='/images/icons/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-charging-info'>
                        <span id='charging-state'>충전 가능</span>
                        <div id='charging-location'>{stationDetail.statNm}</div>
                        <div id='charging-location-info'>{stationDetail.address}</div>
                        <br/>
                        <div id='charging-type'><b>충전기 타입</b> &nbsp; DC콤보</div>
                        <hr/>
                        <div id='charging-station-info-text'><b>충전소 정보</b> </div>
                        <div className='charging-station-info'>
                            <div>운영 기관 &nbsp;&nbsp; {stationDetail.business}</div>
                            <div>운영 시간 &nbsp;&nbsp; {stationDetail.useTime?stationDetail.useTime:'-'}</div>
                            <div>연락처 &nbsp;&nbsp; {(stationDetail.businessCall&&stationDetail.businessCall!=='null')?stationDetail.businessCall:'-'}</div>
                            <div>주차 요금 &nbsp;&nbsp; {stationDetail.parkingFree?'무료':'유료'}</div>
                        </div>
                        <br/><br/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingStationModal;
