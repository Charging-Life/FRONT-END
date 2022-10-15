import React, { useEffect, useState } from 'react';
import '../styles/components/Header.css';
import FilterOffCanvas from './OffCanvases/FilterOffCanvas';
import NoticeOffCanvas from './OffCanvases/NoticeOffCanvas';
import { useNavigate } from 'react-router';
// import axios from 'axios';
// import useInterval from '../components/useInterval';

const Header = ({page, isListView, setIsListView}) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();
    const PROXY = process.env.REACT_APP_PROXY;

    const onClickLogo = () => {
        navigate("/");
    }

    useEffect(() => {
        if(localStorage.getItem('CL_accessToken')) {
            setIsUser(true);
        }
    }, []);

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo' 
                    className='header_logo' onClick={onClickLogo}/>
                {
                    page === "main" ?
                    <div>
                        {
                            isUser ? 
                            <>
                                <img src='images/icons/CL_icon_notice.png' alt='notice' 
                                    className='header_notice'
                                    onClick={()=>{setShowNotice(true)}}/>
                            </> : 
                            <>
                                <img src='images/icons/CL_icon_login.png' alt='login' 
                                    className='header_login'
                                    onClick={()=>{navigate('/login')}}/>
                                <img src='images/icons/CL_icon_signup.png' alt='signup' 
                                    className='header_signup'
                                    onClick={()=>{navigate('/signup')}}/>
                            </>
                        }
                    </div> :
                    page === "bookmark" ? 
                    <div>
                        { isListView ? 
                            <img src={'images/icons/CL_icon_map_view.png'} alt='view' 
                            className='header_view map'
                            onClick={()=>{setIsListView(!isListView)}}/>
                            :
                            <>
                            <img src='images/icons/CL_icon_search.png' alt='search' 
                            className='header_search'
                            onClick={()=>{setShowFilter(true)}}/>
                            <img src={'images/icons/CL_icon_list_view.png'} alt='view' 
                            className='header_view'
                            onClick={()=>{setIsListView(!isListView)}} /> </>}
                        <img src='images/icons/CL_icon_notice.png' alt='notice' 
                                    className='header_notice'
                                    onClick={()=>{setShowNotice(true)}}/>
                    </div> : ''
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