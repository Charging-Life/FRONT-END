import React from 'react';
import '../styles/pages/MainPage.css';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';

const MainPage = () => {
    return (
        <div className='MainPage'>
            <div className='mainpage_header'>
                <Header/>
            </div>
            <div className='mainpage_kakaomap'>
                <KakaoMap/>
            </div>
        </div>
    );
};

export default MainPage;