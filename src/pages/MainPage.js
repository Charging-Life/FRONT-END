import '../styles/pages/MainPage.css';
import User_main from '../components/User_main';
import Header from '../components/Header';
import Bar from '../components/bars/Bar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMap from '../components/KakaoMap';

const MainPage = () => {
    const isManager = localStorage.getItem('CL_auth') && localStorage.getItem('CL_auth') === 'COMPANY' ? true : false;

    const [station, setStation] = useState([]);
    const [location, setLocation] = useState('');
    const [clickBtn, setClickBtn] = useState(false);
    const [userMain, setUserMain] = useState(false);
    const [finalFilter, setFinalFilter] = useState('');

    const filteringData = (data) => {
        console.log(finalFilter);
        console.log(data);
        if(finalFilter !== ''){
            let tempStation = data.filter(x=>{
                if(!finalFilter.limits && !finalFilter.locations && !finalFilter.speeds && !finalFilter.types){
                    return x;
                }
                if(finalFilter.limits){
                    if(x.limitYn === finalFilter.limits) return x;
                }
                if(finalFilter.locations){
                    let addressList = x.address.split(' ');
                    let express = false;
                    addressList.map(y=>{
                        if(y.length >= 4){
                            let charLen = y.length;
                            if(y[charLen - 4] === '고' && y[charLen - 3] === '속'){
                                express = true;
                            }
                        }
                    })
                    if(express){
                        if(finalFilter.locations === '고속도로') return x;
                    } 
                    else{
                        if(finalFilter.locations === '일반도로') return x
                    }
                 }
                if(finalFilter.speeds){
                    let tempOutPut = x.chargers.map(y=>y.outPut);
                    let success = false;
                    for(let t of tempOutPut){
                        if(finalFilter.speeds.includes(t)){
                            success = true;
                            break;
                        }
                    }
                    if(success) return x;
                }
                if(finalFilter.types){
                    let tempType = x.chargers.map(y=>y.chargerType);
                    let success = false;
                    for(let t of tempType){
                        if(finalFilter.types.includes(t)){
                            success = true;
                            break;
                        }
                    }
                    if(success) return x;
                }
            });
            console.log(tempStation);
            setStation(tempStation);
        }
        else{
            setStation(data);
        }
    }

    useEffect(() => {
        if (isManager) {
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
        }
        else if (location !== '') {
            axios.get(`${process.env.REACT_APP_PROXY}${isManager ? '/station/manager' : `/station?city=${location}`}`)
                .then((res) => {
                    filteringData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [location, userMain, finalFilter])

    const clickUserBtn = () => {
        localStorage.getItem('CL_accessToken')?setClickBtn(true):alert('로그인 후 이용해주세요.');
    }

    useEffect(() => {
        if (clickBtn) {
            const standardLen = window.innerWidth >= window.innerHeight ? window.innerWidth * 2.5 : window.innerHeight * 2.5;
            const rightLen = -standardLen / 2 + 65;
            const bottomLen = window.innerWidth >= 450 ? -standardLen / 2 + 65 : -standardLen / 2 + 115;
            const smallRightLen = 30;
            const smallBottomLen = window.innerWidth >= 450 ? 30 : 70;

            document.getElementsByClassName("map_user_main_btn")[0].setAttribute("style",
                `width: ${standardLen}px;
                height: ${standardLen}px;
                border-radius: ${standardLen / 2}px;
                bottom: ${rightLen}px;
                right: ${bottomLen}px;`
            );
            document.getElementsByClassName("map_user_main_btn_img")[0].setAttribute("style",
                `opacity: 0;
                transition: all 0.01s linear;`
            )

            setTimeout(() => {
                setUserMain(!userMain);
                setLocation('');
            }, 400);
            setTimeout(() => {
                setClickBtn(false);
                document.getElementsByClassName("map_user_main_btn")[0].setAttribute("style",
                    `bottom: ${smallBottomLen}px;
                    right: ${smallRightLen}px;
                    width: 70px;
                    height: 70px;`
                );
            }, 600);
            setTimeout(() => document.getElementsByClassName("map_user_main_btn_img")[0].setAttribute("style",
                `opacity: 1;
                transition: all 0.2s linear;`
            ), 980);
        }
    }, [clickBtn])

    return (
        <div className='MainPage'>
            <div className='mainpage_header'>
                <Header page={"main"} finalFilter ={finalFilter} setFinalFilter={setFinalFilter}/>
            </div>
            <div>
                <KakaoMap station={station} setLocation={setLocation} isManager={isManager} location={location} userMain={userMain} />
                {userMain && <User_main />}
                <Bar value={1} />
            </div>
            {!isManager && <button className='map_user_main_btn' onClick={() => clickUserBtn()}>
                <img src={`images/icons/CL_user_${!userMain?'main':'map'}_btn.png`} className='map_user_main_btn_img' />
            </button>}
        </div>
    );
};

export default MainPage;