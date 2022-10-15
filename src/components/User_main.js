import React, { useEffect } from 'react';
import '../styles/components/User_main.css';
import axios from 'axios';
import ProgressBar from './bars/ProgressBar';
import { useState } from 'react';
import useInterval from '../hooks/useInterval';

const User_main = () => {
    const [startTime, setStartTime] = useState({
        sHour: '22',
        sMinute: '10',
        status: 'SLOW',
        change: true
    });
    const setSTime = () => {
        setStartTime({
            sHour: '22',
            sMinute: '10',
            status: 'SLOW',
            change: !startTime.change
        })
        console.log(startTime);
    }
    useInterval(setSTime ,60000);

    const [proceedTime, setProceedTime] = useState({
        pHour: '',
        pMinute: ''
    });

    const proceededTime = () => {
        const today = new Date();

        let currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        const startHour = parseInt(startTime.sHour);
        const startMinute = parseInt(startTime.sMinute);

        if (startHour > currentHour) {
            currentHour = today.getHours() + 24;
        }

        const sumCurrent = currentHour * 60 + currentMinute;
        const sumStart = startHour * 60 + startMinute;
        const proceeded = sumCurrent - sumStart;

        setProceedTime({
            pHour: parseInt(proceeded / 60),
            pMinute: proceeded % 60
        })
    }

    useEffect(()=>{
        proceededTime();
    },[startTime])

    useEffect(() => {
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
                        <div>{'이수화'}님</div>
                        <div>현재 {proceedTime.pHour !== 0 && proceedTime.pHour + '시'} {proceedTime.pMinute}분 째
                            <span>
                                {startTime.status === 'FAST' ? ' 급속 충전 ' : ' 완속 충전'} 중
                            </span> 입니다.
                        </div>
                    </div>
                    <div id='main_progress_bar_box'>
                        <ProgressBar startTime={startTime} />
                    </div>
                    <div id='main_progress_button'>
                        <button>충전소 상세 보기</button>
                    </div>
                </div>
                <div id='main_bottom_box'>
                    <div id='main_search_box'>
                        <div>충전소 검색</div>
                        <img src='images/icons/CL_icon_loc_white.png' alt='loc' />
                    </div>
                    <div id='main_qr_box'>
                        <div>충전 시작하기</div>
                        <img src='images/icons/CL_icon_QR.png' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default User_main;