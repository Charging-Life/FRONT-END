import React, { useEffect } from 'react';
import '../styles/components/User_main.css';
import axios from 'axios';
import ProgressBar from './bars/ProgressBar';
import { useState } from 'react';
import useInterval from '../hooks/useInterval';
import QRModal from './Modals/QRModal';

const User_main = () => {
    // qr코드를 생성하는 모달
    const [qrModal, setQRModal] = useState(false);
    // 시작 시간을 저장하는 useState
    const [startTime, setStartTime] = useState({
        sHour: '2',
        sMinute: '10',
        status: 'FAST',
        change: true
    });
    // 시작 시간을 set 하는 함수 -> 후에 axios로 수정 필요
    const setSTime = () => {
        // qr코드를 생성하는 모달이 켜져있는 동안은 실행 x
        // -> 주기적으로 실행되는데 qr 모달의 부모 요소기 때문에 재렌더링 되기 때문
        if (qrModal) return;
        setStartTime({
            sHour: '2',
            sMinute: '10',
            status: 'FAST',
            // state가 바뀐다는 것을 명시하기 위한 프로퍼티
            change: !startTime.change
        })
    }
    // 1분마다 함수를 실행하는 hook
    useInterval(setSTime, 60000);

    // 진행된 시간을 저장하는 useState
    const [proceedTime, setProceedTime] = useState({
        pHour: '',
        pMinute: ''
    });

    // 얼마나 진행됐는지 계산하는 함수
    const proceededTime = () => {
        const today = new Date();
        // 현재 시간과 분
        let currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        // 시작한 시간과 분
        const startHour = parseInt(startTime.sHour);
        const startMinute = parseInt(startTime.sMinute);

        // 시작한 시간이 현재 시간보다 클 때
        if (startHour > currentHour) {
            // 현재 시간에 24를 더해줌으로서 예외처리
            currentHour = today.getHours() + 24;
        }

        // 현재 시간의 총 분
        const sumCurrent = currentHour * 60 + currentMinute;
        // 시작 시간의 총 분
        const sumStart = startHour * 60 + startMinute;
        // 진행 된 시간의 총 분
        const proceeded = sumCurrent - sumStart;

        // 진행 된 시와 분을 저장
        setProceedTime({
            pHour: parseInt(proceeded / 60),
            pMinute: proceeded % 60
        })
    }

    // 시작 시간을 받아올 때마다 진행 시간 계산
    useEffect(() => {
        proceededTime();
    }, [startTime])

    useEffect(() => {
        // 사용자의 정보 받아오는 axios
        // 후에 데이터 처리 필요
        const auth = localStorage.getItem('CL_auth') && localStorage.getItem('CL_auth').toLowerCase();
        axios.get(`${process.env.REACT_APP_PROXY}/member/${auth}`, {
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div id='User_main'>
                <div id='main_progress_box'>
                    <div id='main_progress_info'>
                        <div>{'COCOPAS'}님</div>
                        <div>현재 {proceedTime.pHour !== 0 && proceedTime.pHour + '시간'} {proceedTime.pMinute}분 째
                            <span>
                                {startTime.status === 'FAST' ? ' 급속 충전 ' : ' 완속 충전'} 중
                            </span> 입니다.
                        </div>
                        {/* <div>
                            QR코드를 생성하고 충전을 시작해보세요!
                        </div> */}
                    </div>
                    <div id='main_progress_bar_box'>
                        <ProgressBar startTime={startTime} />
                    </div>
                    <div id='main_progress_button'>
                        <button>충전소 상세 보기</button>
                    </div>
                </div>
                <div id='main_qr_box' onClick={() => setQRModal(true)}>
                    <div>충전 시작하기</div>
                    <img src='images/icons/CL_icon_QR.png' />
                </div>
            </div>

            <QRModal
                show={qrModal}
                onHide={() => setQRModal(false)}
            />
        </>
    );
};

export default User_main;