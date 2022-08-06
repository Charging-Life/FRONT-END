import React, { useEffect } from 'react';
import '../styles/pages/MainPage.css';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';
import axios from 'axios';
import GetChargerStatusURL from '../security/GetChargerStatusURL.json'

const MainPage = () => {
    const url = GetChargerStatusURL['url'];
    console.log(url);

    useEffect(()=>{
        axios.get(url).then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
    },[])

    return (
        <div className='MainPage'>
            <div className='mainpage_header'>
                <Header page={"main"}/>
            </div>
            <div className='mainpage_kakaomap'>
                <KakaoMap/>
            </div>
        </div>
    );
};

export default MainPage;