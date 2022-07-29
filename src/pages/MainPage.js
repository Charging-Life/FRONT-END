import React from 'react';
import '../styles/pages/MainPage.css';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';

const MainPage = () => {
    return (
        <div className='MainPage'>
            <Header/>
            <KakaoMap/>
        </div>
    );
};

export default MainPage;