import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/NoticeModal.css';
import { noticeState } from '../../security/noticeInfo.js';

const NoticeModal = ({info, show, setShowStation, onHide}) => {

    const handleChargeStation = () => {
        onHide();
        setShowStation([true, info['station_id']]);
    }

    return (
        <div className='NoticeModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>알림 상세보기</span>
                    <div id='close-icon' onClick={onHide}><img src='/images/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body>
                   {
                       show &&
                       <div className='modal-charging-info'>
                            <img id='notice-image' src={info.image}/>
                            <div id='notice-state'>{noticeState[info.state][0]}</div>
                            <div className='notice-text'>{info.location}</div>
                            <div className='notice-text'>{info.number}</div>
                            <button id='go-station-modal' onClick={handleChargeStation}>충전소 정보보기</button>
                        </div>
                   }
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NoticeModal;

