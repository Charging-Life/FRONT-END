import '../styles/pages/MainPage.css';
import User_main from '../components/User_main';
import Header from '../components/Header';
import Bar from '../components/bars/Bar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMap from '../components/KakaoMap';

const MainPage = () => {
    const isManager = localStorage.getItem('CL_auth') && localStorage.getItem('CL_auth') === 'MANAGER' ? true : false;

    const [station, setStation] = useState([]);
    const [stationState, setStationState] = useState([]);
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/station/manager`, {
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
            .then((res) => {
                setStation(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        if (location !== '') {
            axios.get(`${process.env.REACT_APP_PROXY}${isManager?'/station/manager':`/station?city=${location}`}`, {
                headers: {
                    Authorization: localStorage.getItem('CL_accessToken')
                }
            })
                .then((res) => {
                    setStation(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })

            axios.get(`${process.env.REACT_APP_GET_STATION_URL}`)
                .then((res) => {
                    setStationState(res.data.items.item);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [location])

    return (
        <div className='MainPage'>
            <div className='mainpage_header'>
                <Header page={"main"} />
            </div>
            <KakaoMap station={station} stationState={stationState} setLocation={setLocation} isManager={isManager} location={location}/>
            <Bar value={1} />
        </div>
    );
};

export default MainPage;