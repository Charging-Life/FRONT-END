import React, { useEffect } from 'react';
import '../../styles/components/OffCanvases/NoticeOffCanvas.css';
import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import NoticeModal from '../Modals/NoticeModal';
import ChargingStationModal from '../Modals/ChargingStationModal';
import { noticeInfo } from '../../security/noticeInfo.js';

const NoticeOffCanvas = ({show, onHide}) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showStation, setShowStation] = useState([false]);
    const [detailInfo, setDetailInfo] = useState({});

    const [noticeState] = useState({
        charging_complete: ['차량 충전이 완료되었습니다.', 'images/CL_icon_notice_complete.png'],
        general_vehicle: ['충전소에 일반차량이 있습니다.', 'images/CL_icon_notice_general.png'],
        stowage: ['충전소에 적재물이 있습니다.', 'images/CL_icon_notice_stowage.png'],
        bad_condition: ['충전소 상태가 좋지 않습니다.', 'images/CL_icon_notice_bad.png']
    })

    const selectState=(state)=>{
        const returnObject = {
            img_src: '',
            phrases: ''
        }

        switch(state){
            case 'charging_complete':
                returnObject['img_src'] = noticeState[state][1];
                returnObject['phrases'] = noticeState[state][0];
                break;
            case 'general_vehicle':
                returnObject['img_src'] = noticeState[state][1];
                returnObject['phrases'] = noticeState[state][0];
                break;
            case 'stowage':
                returnObject['img_src'] = noticeState[state][1];
                returnObject['phrases'] = noticeState[state][0];
                break;
            case 'bad_condition':
                returnObject['img_src'] = noticeState[state][1];
                returnObject['phrases'] = noticeState[state][0];
                break;
            default:
        }

        return returnObject;
    }

    // 알림 누르면 모달창 띄우기
    const handleNoticeDetail = (e) => {
        setShowNotice(true);
        setDetailInfo(noticeInfo[e.target.id-1]);
    }

    const showNotices =()=>{
        const list = [];
        for(let i = 0; i < noticeInfo.length; i++){
            list.push(
                <div key={i} id={noticeInfo[i]['id']} className={noticeInfo[i]['isChecked'] ? 'notice_checked_box' : 'notice_box'}
                    onClick={handleNoticeDetail}>
                    <img src={selectState(noticeInfo[i]['state'])['img_src']}
                        className='notice_img'/>
                    <div>
                        <div className='notice_msg'>
                            {selectState(noticeInfo[i]['state'])['phrases']}
                        </div>
                        <div className='notice_sub_msg'>
                            {noticeInfo[i]['number']}
                        </div>
                        <div className='notice_sub_msg'>
                            {noticeInfo[i]['location']}
                        </div>
                    </div>
                </div>
            );
        }
        return list;
    }

    return (
        <>
        <div className='NoticeOffCanvas'>
            <Offcanvas show={show} onHide={onHide} placement='end'
                        className='notice_offcanvas'>
                <Offcanvas.Header>
                    <Offcanvas.Title className='offcanvas_title'>알림</Offcanvas.Title>
                    <img src='images/CL_icon_close.png' alt='닫기'
                        className='offcanvas_close'
                        onClick={onHide}/>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {show && showNotices()}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
        <ChargingStationModal show={showStation} onHide={() => setShowStation(false)}/>
        <NoticeModal info={detailInfo} show={showNotice} setShowStation={setShowStation} onHide={() => setShowNotice(false)} />
        </>
    );
};

export default NoticeOffCanvas;