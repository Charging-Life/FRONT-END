import React, { useEffect, useState } from 'react';
import '../../styles/components/bars/ProgressBar.css';

const ProgressBar = ({ startTime }) => {
    const today = new Date();

    const checkHour = () => {
        const shour = parseInt(startTime.sHour);

        if (startTime.status === 'FAST') {
            if (shour + 1 >= 24) return shour - 23;
            return shour + 1;
        }
        else {
            if (shour + 14 >= 24) return shour - 10;
            return shour + 14;
        }
    }
    const checkLeftTime = () => {
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        let endHour = endTime.eHour;

        if (currentHour > endTime.eHour) {
            endHour = endTime.eHour + 24;
        }

        const sumCurrentTime = currentHour * 60 + currentMinute;
        const sumEndTime = endHour * 60 + endTime.eMinute;

        const leftVal = sumEndTime - sumCurrentTime;

        const leftHour = parseInt(leftVal / 60);
        const leftMinute = leftVal % 60;

        const standard = startTime.status === 'FAST' ? 60 : 14 * 60;
        const tPercent = 100 - (100 * leftVal / standard);

        setLeftTime({
            lHour: leftHour,
            lMinute: leftMinute,
            percent: tPercent,
            pxPercent: tPercent * 2.6
        })
    }

    const [endTime, setEndTime] = useState({
        eHour: checkHour(),
        eMinute: parseInt(startTime.sMinute)
    });
    const [leftTime, setLeftTime] = useState({
        lHour: '',
        lMinute: '',
        percent: '',
        pxPercent: ''
    });

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
                <div>{leftTime.lHour !== 0 && leftTime.lHour + '시'} {leftTime.lMinute}분 남았습니다.</div>
                {`${endTime.eHour}:${endTime.eMinute}`}
            </div>
        </>
    );
};

export default ProgressBar;