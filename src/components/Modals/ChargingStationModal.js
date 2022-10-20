import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingStationModal.css';

const ChargingStationModal = ({show, statId, onHide}) => {

    const [stationDetail, setStationDetail] = useState({});
    const [business, setBusiness] = useState({});
    const [selectBookmark, setSelectBookmark] = useState(false);
    const [selectWish, setSelectWish] = useState();
    const [count, setCount] = useState(0);
    let isUser = localStorage.getItem('CL_auth') === 'USER' ? true : false;
    const chargerTypes = ['DC 차데모', 'AC3 상', 'DC 콤보', 'AC 완속'];
    const mappingCharger = {
        '01': ['DC 차데모'],
        '02': ['AC 완속'],
        '03': ['DC 차데모', 'AC3 상'],
        '04': ['DC 콤보'],
        '05': ['DC 차데모', 'DC 콤보'], 
        '06': ['DC 차데모', 'AC3 상', 'DC 콤보'],
        '07': ['AC3 상']
    }
    
    const setType = (type) => {
        
        const result = [];
        switch(type) {
            case 2 : { // 대기중
                result.push(['holding', '대기중']);
                break;
            }
            case 3 : { // 충전중
                result.push(['charging', '충전중']);
                break;
            }
            case 1: case 9: { // 통신미연결
                result.push(['disconnected', '통신미연결']);
                break;
            }
            case 4: case 5: { // 운영중지
                result.push(['shutdown', '운영중지']);
                break;
            }
        }

        return result;
    }

    // 즐겨찾기 추가 / 해제 로직
    const handleBookMark = (e) => {
        
    }

    // 찜 등록 및 삭제 기능
    const handleWish = () => {

        if(selectWish) {
            axios.delete(`${process.env.REACT_APP_PROXY}/member/destination/${stationDetail.statId}`, {
                headers: { 
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
            .then(res => {
                setCount(count-1);
                setSelectWish(false);
            })
            .catch(err => {console.log(err)});
        }
        else {
            axios.post(`${process.env.REACT_APP_PROXY}/member/destination`, {
                statId: [stationDetail.statId]
            }, {
                headers: { 
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
            .then(res => {
                setCount(count+1);
                setSelectWish(true);
            })
            .catch(err => {console.log(err)});
        }
    
    }

    // 모달 닫을 때 실행
    const handleClose = () => {
        onHide();
    }

    // 충전기 출력 
    const makeChargerList = () => {

        const result = [];
        stationDetail.chargers && stationDetail.chargers.map((ele, idx) => 
                result.push(<div id='charger-box' key={idx}>
                <div><span id={setType(ele.stat)[0][0]}>{setType(ele.stat)[0][1]}</span><br/>{ele.outPut}kW</div>
                <div>{chargerTypes.map((type, idx) => {
                    if(mappingCharger[`${ele.chargerType}`].includes(type)){
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
        console.log(statId);

        let res;
        if(statId){
            
            if(localStorage.getItem('CL_accessToken')) {
                res = axios.get(`${process.env.REACT_APP_PROXY}/station/${statId}`, {
                    headers : {
                        Authorization: localStorage.getItem('CL_accessToken')
                    }
                })
            }
            else {
                res = axios.get(`${process.env.REACT_APP_PROXY}/station/${statId}`)
            }
            
            res.then((res)=>{
                setStationDetail(res.data);
                setBusiness(res.data.business);
                setCount(res.data.memberCount);
                setSelectWish(res.data.checkDes);
            })
            .catch((err)=>{
                console.log(err);
            })

        }
    },[statId])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/member/station/${stationDetail.statId}`, {
            headers : {
                'Authorization' : localStorage.getItem('CL_accessToken')
            }
        })
        .then((res)=>{
            if(res.data === true) {
                setSelectBookmark(true);
            }
        })
        .catch(err => console.log(err));
    }, [statId])

    return (
        <div className='ChargingStationModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>충전소 운영 현황</span>
                    <div id='close-icon' onClick={() => handleClose()}><img src='/images/icons/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body className='station-detail-modal'>
                    <div className='modal-charging-info'>
                        <span id='charging-state'>충전 가능</span>
                        <div id='charging-location'>
                            <div id={ isUser ? 'user-charging-location-info' : ''}>
                                <b>{stationDetail.statNm}</b><br/>
                                <span>{stationDetail.address}</span>
                            </div>
                            { isUser && <div id='starBox' onClick={handleBookMark}><img src={selectBookmark ? 'images/icons/CL_icon_selected_star.png' : 'images/icons/CL_icon_star.png'}/></div>}
                        </div>
                        <hr/>
                        <div id='charging-station-info-text'><b>충전소 정보</b> { isUser && <span>현재 {count}대가 가는중이예요</span>}</div>
                        <div className='charging-station-info'>
                            <div>운영 기관 &nbsp;&nbsp; {business.business}</div>
                            <div>운영 시간 &nbsp;&nbsp; {stationDetail.useTime?stationDetail.useTime:'-'}</div>
                            <div>연락처 &nbsp;&nbsp; {(business.businessCall&&stationDetail.business.businessCall!=='null')?stationDetail.business.businessCall:'-'}</div>
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
                        <button onClick={handleWish}>{selectWish ? '가고 있는 중입니다 !' : '지금 출발할게요 !'}</button>
                    </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingStationModal;
