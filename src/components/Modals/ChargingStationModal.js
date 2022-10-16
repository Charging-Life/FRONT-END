import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingStationModal.css';

const ChargingStationModal = ({show, onHide}) => {
    const [stationDetail, setStationDetail] = useState({});
    const [chargerList, setChargerList] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const chargerTypes = ['DC 차데모', 'AC3 상', 'DC 콤보', 'AC 완속'];
    let isUser = localStorage.getItem('CL_auth') === 'USER' ? true : false;
    // isUser = true;

    const chargers = [
        {
            'chargingState' : '대기중',
            'chargerType' : ['AC 완속'],
            'output': '50kW'
        },
        {
            'chargingState' : '대기중',
            'chargerType' : ['DC 차데모'],
            'output': '완속'
        },
        {
            'chargingState' : '대기중',
            'chargerType' : ['DC 콤보', 'DC 차데모'],
            'output': '50kW'
        },
        {
            'chargingState' : '대기중',
            'chargerType' : ['DC 차데모', 'AC3 상', 'DC 콤보'],
            'output': '완속'
        }
    ]

    const setColor = (type) => {
        
        let result = '';
        switch(type) {
            case '대기중' : {
                result = 'holding';
                break;
            }
            case '충전중' : {
                result = 'charging';
                break;
            }
            case '통신미연결' : {
                result = 'disconnected';
                break;
            }
            case '운영중지' : {
                result = 'shutdown';
                break;
            }
        }

        return result;
    }

    // 즐겨찾기 추가 / 해제 로직
    const handleBookMark = (e) => {
        
    }

    // 충전기 출력 
    const makeChargerList = () => {

        const result = [];
        chargers.map((ele, idx) => 
                result.push(<div id='charger-box' key={idx}>
                <div><span id={setColor(ele.chargingState)}>{ele.chargingState}</span><br/>{ele.output}</div>
                <div>{chargerTypes.map((type, idx) => {
                    if(ele.chargerType.includes(type)){
                        return <span key={idx} id='include'>{type}&nbsp;&nbsp;</span>
                    } else {
                        return <span key={idx}>{type}&nbsp;&nbsp;</span>
                    }
                })}</div>
            </div>)
        )
        
        return result;
    }

    useEffect(()=>{
        if(show[1]){
            axios.get(`${process.env.REACT_APP_PROXY}/station/${show[1]}`)
            .then((res)=>{
                setStationDetail({
                    stat: '',
                    statNm: res.data.statNm,
                    statId: res.data.statId,
                    address: res.data.address,
                    business: res.data.business.business,
                    useTime: res.data.useTime,
                    businessCall: res.data.businessCall,
                    parkingFree: res.data.parkingFree,
                    chargers: res.data.chargers,
                    memberCount: res.data.memberCount
                })
                setChargerList(res.data.chargerDtos);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[show[1]])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/member/station/${stationDetail.statId}`, {
            headers : {
                'Authorization' : localStorage.getItem('CL_accessToken')
            }
        })
            .then((res)=>{
                setIsSelected(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className='ChargingStationModal'>
            <Modal centered show={show[0]} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>충전소 운영 현황</span>
                    <div id='close-icon' onClick={onHide}><img src='/images/icons/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body className='station-detail-modal'>
                    <div className='modal-charging-info'>
                        <span id='charging-state'>충전 가능</span>
                        <div id='charging-location'>
                            <div id={ isUser ? 'user-charging-location-info' : ''}>
                                <b>{stationDetail.statNm}</b><br/>
                                <span>{stationDetail.address}</span>
                            </div>
                            { isUser && <div id='starBox' onClick={handleBookMark}><img src={isSelected ? 'images/icons/CL_icon_selected_star.png' : 'images/icons/CL_icon_star.png'}/></div>}
                        </div>
                        <hr/>
                        <div id='charging-station-info-text'><b>충전소 정보</b> { isUser && <span>현재 {stationDetail.memberCount}명이 대기중이예요 !</span>}</div>
                        <div className='charging-station-info'>
                            <div>운영 기관 &nbsp;&nbsp; {stationDetail.business}</div>
                            <div>운영 시간 &nbsp;&nbsp; {stationDetail.useTime?stationDetail.useTime:'-'}</div>
                            <div>연락처 &nbsp;&nbsp; {(stationDetail.businessCall&&stationDetail.businessCall!=='null')?stationDetail.businessCall:'-'}</div>
                            <div>주차 요금 &nbsp;&nbsp; {stationDetail.parkingFree?'무료':'유료'}</div>
                        </div><br/><hr/>
                        <div id='charging-type'><b>충전기 정보</b></div>
                        <div id='charger-list-box'>
                            {makeChargerList()}
                        </div>
                        <br/>
                    </div>
                    {isUser &&
                    <div id='gotoBtn'>
                        <button>지금 출발할게요 !</button>
                    </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingStationModal;
