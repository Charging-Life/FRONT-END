import React from 'react';
import '../styles/components/NoticeOffCanvas.css';
import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react';

const NoticeOffCanvas = ({show, onHide}) => {
    const [noticeState] = useState({
        charging_complete: ['차량 충전이 완료되었습니다.', 'images/CL_icon_notice_complete.png'],
        general_vehicle: ['충전소에 일반차량이 있습니다.', 'images/CL_icon_notice_general.png'],
        stowage: ['충전소에 적재물이 있습니다.', 'images/CL_icon_notice_stowage.png'],
        bad_condition: ['충전소 상태가 좋지 않습니다.', 'images/CL_icon_notice_bad.png']
    })

    // 더미 데이터, 후에 지울 것
    const [dummy] = useState([
        {
            state: "charging_complete",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "general_vehicle",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "stowage",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "bad_condition",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "charging_complete",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "general_vehicle",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "stowage",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        },
        {
            state: "bad_condition",
            number: "12나 3456",
            location: "구미시 옥계동 삼구아파드"
        }
    ])

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

    const showNotices =()=>{
        const list = [];
        for(let i = 0; i < dummy.length; i++){
            list.push(
                <div key={i} className='notice_box'>
                    <img src={selectState(dummy[i]['state'])['img_src']}
                        className='notice_img'/>
                    <div>
                        <div className='notice_msg'>
                            {selectState(dummy[i]['state'])['phrases']}
                        </div>
                        <div className='notice_sub_msg'>
                            {dummy[i]['number']}
                        </div>
                        <div className='notice_sub_msg'>
                            {dummy[i]['location']}
                        </div>
                    </div>
                </div>
            );
        }

        return list;
    }

    return (
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
    );
};

export default NoticeOffCanvas;