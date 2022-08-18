import React, { useEffect, useState } from 'react';
import '../styles/components/Header.css';
import FilterOffCanvas from './OffCanvases/FilterOffCanvas';
import NoticeOffCanvas from './OffCanvases/NoticeOffCanvas';
import { useNavigate } from 'react-router';
import useInterval from './useInterval';
import axios from 'axios';
import { PROXY } from '../security/setupProxy';

const Header = ({page}) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();

    const onClickLogo = () => {
        navigate("/");
    }

    useEffect(() => {
        if(localStorage.getItem('CL_accessToken')) {
            setIsUser(true);
        }
    }, []);

    // useInterval(() => {
    //     // 반복할 로직 : 알림 쌓인것 있는지 1분마다 요청
    //     axios.get(`${PROXY}/alarm`)
    //     .then((res) => {
    //         // 받아오는 데이터 중에 안읽은 것이 있으면 이미지 변경
            
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // }, 60000); 

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo' 
                    className='header_logo' onClick={onClickLogo}/>
                {
                    page === "main" &&
                    <div>
                        <img src='images/icons/CL_icon_search.png' alt='search' 
                            className='header_search'
                            onClick={()=>{setShowFilter(true)}}/>
                        {
                            isUser ? 
                            <>
                                <img src='images/CL_icon_notice.png' alt='notice' 
                                    className='header_notice'
                                    onClick={()=>{setShowNotice(true)}}/>
                                <img src='images/CL_icon_setting.png' alt='setting' 
                                    className='header_setting'
                                    onClick={()=>{navigate('/my')}}/>
                            </> : 
                            <>
                                <img src='images/CL_icon_login.png' alt='login' 
                                    className='header_login'
                                    onClick={()=>{navigate('/login')}}/>
                                <img src='images/CL_icon_signup.png' alt='signup' 
                                    className='header_signup'
                                    onClick={()=>{navigate('/signup')}}/>
                            </>
                        }
                    </div> 
                }
            </div>

            <NoticeOffCanvas
                show = {showNotice}
                onHide = {()=>{setShowNotice(false)}}
            />
            <FilterOffCanvas
                show = {showFilter}
                onHide = {()=>{setShowFilter(false)}}
            />
        </>

    );
};

export default Header;