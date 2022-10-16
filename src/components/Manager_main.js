import React, { useEffect, useState } from 'react';
import axios from 'axios';

import KakaoMap from '../components/KakaoMap';

const Manager_main = () => {

    const [station, setStation] = useState([]);
    const [stationState, setStationState] = useState([]);
    const [location, setLocation] = useState('');
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY}/station/manager`,{
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
        .then((res)=>{
            setStation(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        if(location !== ''){
            axios.get(`${process.env.REACT_APP_PROXY}/station/manager`,{
                headers: {
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
            .then((res)=>{
                setStation(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })

            axios.get(`${process.env.REACT_APP_GET_STATION_URL}`)
            .then((res)=>{
                setStationState(res.data.items.item);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[location])
    
    return (
        <>
            <div className='mainpage_kakaomap'>
                <KakaoMap station={station} stationState={stationState} setLocation={setLocation}/>
            </div>
        </>
    );
};

export default Manager_main;