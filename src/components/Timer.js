import React, { useEffect, useRef, useState } from 'react';

const Timer = () => {
    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(0);
    const time = useRef(180);
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if(time.current <= 0) {
            clearInterval(timerId.current);
        }
    }, [sec]);

    const Style = {
        timer : {
            'color': 'red', 
            'textAlign': 'center', 
            'lineHeight': '34px'
        }
    }

    return (
        <div style={Style.timer}>
            {String(min).length === 1 ? '0'+ min : min } : 
            {String(sec).length === 1 ? '0'+ sec : sec }
        </div>
    );
};

export default Timer;