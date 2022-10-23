 import '../styles/components/LoadingWindow.css';
 import useInterval from '../hooks/useInterval';
import { useEffect, useState } from 'react';

const LoadingWindow = ({falseMyLoc}) => {
    const [light, setLight] = useState(false);

    const controlLight = () => {
        setLight(!light);
    }

    useInterval(controlLight, 500);

    const endLoad = () => {
        falseMyLoc();
    }

    useInterval(endLoad, 30000);

    return (
        <div id='LoadingWindow'>
            <img src='images/icons/CL_big_thunder.png' alt='big_thunder' className={['loading_thunder_none', light && 'loading_thunder'].join(' ')}/>
            <div>위치를 불러오고 있습니다.</div>
        </div>
    );
};

export default LoadingWindow;