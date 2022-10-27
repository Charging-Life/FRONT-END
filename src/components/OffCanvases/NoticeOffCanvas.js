import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

import '../../styles/components/OffCanvases/NoticeOffCanvas.css';
import NoticeModal from '../Modals/NoticeModal';
import ChargingStationModal from '../Modals/ChargingStationModal';
import useInterval from '../../hooks/useInterval';

const NoticeOffCanvas = ({ show, onHide }) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showStation, setShowStation] = useState(false);
    const [detailInfo, setDetailInfo] = useState({});
    const [notices, setNotices] = useState([]);

    const PROXY = process.env.REACT_APP_PROXY;

    const [noticeState] = useState({
        charging_complete: ['차량 충전이 완료되었습니다.', 'images/icons/CL_icon_notice_complete.png'],
        general_vehicle: ['충전소에 일반차량이 있습니다.', 'images/icons/CL_icon_notice_general.png'],
        stowage: ['충전소에 적재물이 있습니다.', 'images/icons/CL_icon_notice_stowage.png'],
        bad_condition: ['충전소 상태가 좋지 않습니다.', 'images/icons/CL_icon_notice_bad.png'],
        electronic_veicle: ['충전을 하지 않는 전기차량이 있습니다.', 'images/icons/CL_icon_notice_none.png']
    })

    const selectState = (state) => {
        const returnObject = {
            img_src: '',
            phrases: ''
        }

        switch (state) {
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
            case 'electronic_veicle':
                returnObject['img_src'] = noticeState[state][1];
                returnObject['phrases'] = noticeState[state][0];
                break;
            default:
        }

        return returnObject;
    }

    // 알림 누르면 모달창 띄우기
    const handleNoticeDetail = (e) => {
        // 알람 상세보기 모달
        // setShowNotice(true);
        // setDetailInfo(noticeInfo[e.target.id-1]);
        setShowStation([true, e.target.id]);
    }

    const showNotices = () => {
        const list = [];
        for (let i = 0; i < notices.length; i++) {
            if (notices[i]['status'] === 'none') break;
            list.push(
                <div key={i} id={notices[i]['statId']} className={notices[i]['isChecked'] ? 'notice_checked_box' : 'notice_box'}
                    onClick={handleNoticeDetail}>
                    <img src={selectState(notices[i]['status'])['img_src']}
                        className='notice_img' />
                    <div>
                        <div className='notice_msg'>
                            {selectState(notices[i]['status'])['phrases']}
                        </div>
                        <div className='notice_sub_msg'>
                            {notices[i]['statNm']}
                        </div>
                        <div className='notice_sub_msg'>
                            {notices[i]['address']}
                        </div>
                    </div>
                </div>
            );
        }
        return list;
    }

    useEffect(() => {
        // axios로 알림정보 통신
        if(localStorage.getItem('CL_accessToken')) axios.get(`${PROXY}/alarm`, {
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
            .then((res) => {
                setNotices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    useInterval(() => {
        // 반복할 로직 : 알림 쌓인것 있는지 1분마다 요청
        if(localStorage.getItem('CL_accessToken')) axios.get(`${PROXY}/alarm`, {
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
            .then((res) => {
                // 받아오는 데이터 중에 안읽은 것이 있으면 이미지 변경
                setNotices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, 1000000);

    return (
        <>
            <div className='NoticeOffCanvas'>
                <Offcanvas show={show} onHide={onHide} placement='end'
                    className='notice_offcanvas'>
                    <Offcanvas.Header>
                        <Offcanvas.Title className='offcanvas_title'>알림</Offcanvas.Title>
                        <img src='images/icons/CL_icon_close.png' alt='닫기'
                            className='offcanvas_close'
                            onClick={onHide} />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {show && showNotices()}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <ChargingStationModal show={showStation} onHide={() => setShowStation(false)} />
            <NoticeModal info={detailInfo} show={showNotice} setShowStation={setShowStation} onHide={() => setShowNotice(false)} />
        </>
    );
};

export default NoticeOffCanvas;