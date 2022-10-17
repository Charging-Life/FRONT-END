import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/components/Modals/QRModal.css';

const QRModal = ({ show, onHide }) => {
    // 급속인지 완속인지 판단하는 state
    const [rapidity, setRapidity] = useState(' ');
    // qr코드를 생성 했는지 안했는지 판단하는 state
    const [qrCode, setQRCode] = useState(false);
    // qr코드 이미지 src를 저장하는 state
    const [qrImgSrc, setQRImgSrc] = useState('');

    // 급속인지 완속인지 저장하는 함수
    const setMethod = (method) => {
        if (method === 'fast') setRapidity(true);
        else setRapidity(false);
    }

    useEffect(() => {
        // 모달이 닫힐 경우 초기값으로 세팅
        setRapidity(' ');
        setQRCode(false);
        setQRImgSrc('');
    }, [onHide])

    useEffect(()=>{
        // qr코드 이미지 경로가 세팅되면 qr코드 생성
        if(qrImgSrc !== '') setQRCode(true);
    },[qrImgSrc])

    // qr코드 생성하는 함수
    const createQRCode = () =>{
        // 충전 방식이 결정되었을 경우
        if(rapidity !== ' '){
            // memberid와 충전 방식을 서버에 보내고 qr코드 이미지를 byte로 반환 받음
            // -> 추후에 id는 파라미터에서 제거
            axios.get(`${process.env.REACT_APP_PROXY}/qr?memberId=${608541}&chargerStatus=${'SLOW'}`,{
                // byte로 받아오기 때문에 blob으로 response
                responseType: 'blob',
                headers: {
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
            .then((res)=>{
                // blob type의 값을 이미지 주소로 변환하여 저장
                const url = window.URL || window.webkitURL;
                setQRImgSrc(url.createObjectURL(res.data));
            })
            .catch((err)=>console.log(err));
        } 
    }

    return (
        <div className='QRModal'>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header style={{ color: "black", fontWeight: "700" }}>
                    QR코드 생성
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <div className={['qr_modal_question_show', qrCode && 'qr_modal_question_unshow'].join(' ')}>
                                어떤 충전을 하시겠어요?
                            </div>
                            <div className={['qr_modal_notice_unshow', !qrCode && 'qr_modal_notice_show'].join(' ')}>
                                QR코드를 카메라에 인식시켜주세요.
                            </div>
                        </div>
                        <div className={['qr_modal_select_box', qrCode && 'qr_modal_unselect_box'].join(' ')}>
                            <button onClick={() => setMethod('fast')}
                                className={['qr_modal_unSelect_btn', rapidity === true && 'qr_modal_select_btn'].join(' ')}>
                                금속 충전
                            </button>
                            <button onClick={() => setMethod('slow')}
                                className={['qr_modal_unSelect_btn', rapidity === false && 'qr_modal_select_btn'].join(' ')}>
                                완속 충전
                            </button>
                        </div>
                        <div className={['qr_modal_QR_box', qrCode && 'qr_modal_unQR_box'].join(' ')}>
                            <img id='qr_modal_QR_code' src={qrImgSrc} alt='QR'/>
                        </div>
                        <div id='qr_modal_create_box'>
                            <button id='qr_modal_cancel_btn' onClick={()=>onHide()}>
                                취소
                            </button>
                            <button className={['qr_modal_imposi_create', rapidity!==' ' && !qrCode && 'qr_modal_posi_create'].join(' ')}
                                    onClick={()=>createQRCode()}>
                                생성
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QRModal;

