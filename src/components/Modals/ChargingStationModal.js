import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingStationModal.css';

const ChargingStationModal = ({show, onHide}) => {
    const [stationDetail, setStationDetail] = useState({});
    const [chargerList, setChargerList] = useState([]);
    const chargerTypes = ['DC 차데모', 'AC3 상', 'DC 콤보', 'AC 완속'];

    const chargers = [
        {
            'chargingState' : '대기중',
            'chargerType' : ['AC 완속'],
            'output': '50kW'
        },
        {
            'chargingState' : '충전중',
            'chargerType' : ['DC 차데모'],
            'output': '완속'
        },
        {
            'chargingState' : '통신미연결',
            'chargerType' : ['DC 콤보', 'DC 차데모'],
            'output': '50kW'
        },
        {
            'chargingState' : '충전중',
            'chargerType' : ['DC 차데모', 'AC3 상', 'DC 콤보'],
            'output': '완속'
        }
    ]

    useEffect(()=>{
        if(show[1]){
            axios.get(`${process.env.REACT_APP_PROXY}/station/${show[1]}`)
            .then((res)=>{
                setStationDetail({
                    stat: '',
                    statNm: res.data.statNm,
                    address: res.data.address,
                    business: res.data.business.business,
                    useTime: res.data.useTime,
                    businessCall: res.data.businessCall,
                    parkingFree: res.data.parkingFree,
                    chargers: res.data.chargers
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
                        <br/><hr/>
                        <div id='charging-station-info-text'><b>충전소 정보</b> </div>
                        <div className='charging-station-info'>
                            <div>운영 기관 &nbsp;&nbsp; {stationDetail.business}</div>
                            <div>운영 시간 &nbsp;&nbsp; {stationDetail.useTime?stationDetail.useTime:'-'}</div>
                            <div>연락처 &nbsp;&nbsp; {(stationDetail.businessCall&&stationDetail.businessCall!=='null')?stationDetail.businessCall:'-'}</div>
                            <div>주차 요금 &nbsp;&nbsp; {stationDetail.parkingFree?'무료':'유료'}</div>
                        </div><br/><hr/>
                        <div id='charging-type'><b>충전기 정보</b></div>
                        <div id='charger-list-box'>
                            {
                                chargers.map((ele, idx) => 
                                    <div id='charger-box'>
                                        <div><b>{ele.chargingState}<br/>{ele.output}</b></div>
                                        <div>{chargerTypes.map((type, idx) => {
                                            if(ele.chargerType.includes(type)){
                                                return <span style={{'color': '#48DB8C', 'fontWeight': 'bold'}}>{type}&nbsp;&nbsp;</span>
                                            } else {
                                                return <span>{type}&nbsp;&nbsp;</span>
                                            }
                                        })}</div>
                                    </div>
                                )
                            }
                        </div>
                        <br/><br/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingStationModal;
