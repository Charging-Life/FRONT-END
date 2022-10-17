import React, { useEffect, useState } from 'react';
import '../../styles/components/bars/ProgressBar.css';

const ProgressBar = ({ startTime }) => {
    // 끝나는 시간 출력 예외 처리
    const checkHour = () => {
        const shour = parseInt(startTime.sHour);

        // FAST면 시작시간을 기준으로 한시간 뒤의 경우를 계산
        if (startTime.status === 'FAST') {
            if (shour + 1 >= 24) return shour - 23;
            return shour + 1;
        }
        // SLOW면 시작시간을 기준으로 14시간 뒤의 경우를 계산
        else {
            if (shour + 14 >= 24) return shour - 10;
            return shour + 14;
        }
    }
    // 남는 시간을 계산하는 함수
    const checkLeftTime = () => {
        const today = new Date();

        // 현재 시와 분
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        // 끝나는 시간
        let endHour = endTime.eHour;

        // 현재 시간이 끝나는 시간보다 크다면 끝나는 시간에 24를 더하여 예외처리
        if (currentHour > endTime.eHour) {
            endHour = endTime.eHour + 24;
        }

        // 현재시간의 총 분, 끝나는 시간의 총 분
        const sumCurrentTime = currentHour * 60 + currentMinute;
        const sumEndTime = endHour * 60 + endTime.eMinute;

        // 남는 시간의 총 분
        const leftVal = sumEndTime - sumCurrentTime;

        // 남는 시간의 시와 분
        const leftHour = parseInt(leftVal / 60);
        const leftMinute = leftVal % 60;

        // 퍼센트를 계산하기 위해 SLOW, FAST를 구분하여 분모를 결정
        const standard = startTime.status === 'FAST' ? 60 : 14 * 60;
        // 진행 퍼센트 계산
        const tPercent = 100 - (100 * leftVal / standard);

        // 남는 시간 정리
        setLeftTime({
            lHour: leftHour,
            lMinute: leftMinute,
            percent: tPercent,
            pxPercent: tPercent * 2.6
        })
    }

    // 끝나는 시간을 저장하는 useState
    const [endTime, setEndTime] = useState({
        eHour: checkHour(),
        eMinute: parseInt(startTime.sMinute)
    });
    // 남는 시간을 저장하는 useState
    const [leftTime, setLeftTime] = useState({
        lHour: '',
        lMinute: '',
        percent: '',
        pxPercent: ''
    });

    // 시작시간이 최신화 될 때마다 남은 시간을 계산
    useEffect(() => {
        checkLeftTime();
    }, [startTime, endTime]);

    return (
        <>
            <div id='progress_bar_img'>
                {leftTime.percent === ''
                    ? <img id='progress_bar_thunder' src='images/icons/CL_icon_thunder.png' alt='thunder' />
                    : <img id='progress_bar_thunder_move' style={{ left: `${leftTime.pxPercent - 10}px` }} src='images/icons/CL_icon_thunder.png' alt='thunder' />
                }

            </div>
            <div id='progress_bar_bg'>
                {leftTime.percent === ''
                    ? <div id='process_bar_set' />
                    : <div id='process_bar_set_move' style={{width: `${leftTime.percent}%`}}/>
                }
            </div>
            <div id='progress_bar_bottom'>
                {`${startTime.sHour}:${startTime.sMinute}`}
                <div>{leftTime.lHour !== 0 && leftTime.lHour + '시간'} {leftTime.lMinute}분 남았습니다.</div>
                {`${endTime.eHour}:${endTime.eMinute}`}
            </div>
        </>
    );
};

export default ProgressBar;