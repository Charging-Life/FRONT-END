import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/ChargingStationModal.css';

const ChargingStationModal = ({show, onHide}) => {
    
    // 충전소 id : show[1] -> 통신해서 값 받아서 출력

    return (
        <div className='ChargingStationModal'>
            <Modal centered show={show[0]} onHide={onHide}>
                <Modal.Header>
                    <div></div>
                    <span>충전소 운영 현황</span>
                    <div id='close-icon' onClick={onHide}><img src='/images/CL_icon_close.png'/></div>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-charging-info'>
                        <span id='charging-state'>충전 가능</span>
                        <div id='charging-location'>옥계현진에버빌엠파이어</div>
                        <div id='charging-location-info'>경상북도 구미시 산호대로 21길 6</div>
                        <br/>
                        <div id='charging-type'><b>충전기 타입</b> &nbsp; DC콤보</div>
                        <hr/>
                        <div id='charging-station-info-text'><b>충전소 정보</b> </div>
                        <div className='charging-station-info'>
                            <div>운영 기관 &nbsp;&nbsp; 지커넥트</div>
                            <div>운영 시간 &nbsp;&nbsp; 24시간 이용가능</div>
                            <div>연락처 &nbsp;&nbsp; 1544-4279</div>
                            <div>충전요금 &nbsp;&nbsp; 유료</div>
                        </div>
                        <br/><br/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChargingStationModal;
