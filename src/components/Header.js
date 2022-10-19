import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/components/Header.css';
import FilterOffCanvas from './OffCanvases/FilterOffCanvas';
import NoticeOffCanvas from './OffCanvases/NoticeOffCanvas';

const Header = ({ page, isListView, setIsListView }) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const isLogined = localStorage.getItem('CL_accessToken') ? true : false;
    const isManager = localStorage.getItem('CL_auth') === "COMPANY" ? true : false;
    const PROXY = process.env.REACT_APP_PROXY;

    const onClickLogo = () => {
        navigate("/");
    }

    const makeIcons = () => {
        const result = [];

        if (!isLogined) {
            result.push(<div>
                <img src='images/icons/CL_icon_login.png' alt='login'
                    className='header_login'
                    onClick={() => { navigate('/login') }} />
                <img src='images/icons/CL_icon_signup.png' alt='signup'
                    className='header_signup'
                    onClick={() => { navigate('/signup') }} />
            </div>);
        }
        else if (page === "main") {
            if (isManager) {
                result.push(<div className='tempName'>
                    <img src='images/icons/CL_icon_notice.png' alt='notice'
                    className='header_notice'
                    onClick={() => { setShowNotice(true) }} />
                    <div className='red_circle' />
                    </div>)
            }
            else {
                result.push(<div>
                    <img src='images/icons/CL_icon_filter.png' alt='search'
                        className='header_search'
                        onClick={() => { setShowFilter(true) }} />
                    <img src='images/icons/CL_icon_notice.png' alt='notice'
                        className='header_notice'
                        onClick={() => { setShowNotice(true) }} />
                </div>);
            }
        }
        else if (page === "bookmark") {
            if (isManager) {
                result.push(<img src='images/icons/CL_icon_notice.png' alt='notice'
                    className='header_notice'
                    onClick={() => { setShowNotice(true) }} />)
            }
            else if (!isManager && isListView) {
                result.push(<div>
                    <img src={'images/icons/CL_icon_map_view.png'} alt='view'
                        className='header_view map'
                        onClick={() => { setIsListView(!isListView) }} />
                    <img src='images/icons/CL_icon_notice.png' alt='notice'
                        className='header_notice'
                        onClick={() => { setShowNotice(true) }} />
                </div>);
            }
            else {
                result.push(<div>
                    <img src='images/icons/CL_icon_search.png' alt='search'
                        className='header_search'
                        onClick={() => { setShowFilter(true) }} />
                    <img src={'images/icons/CL_icon_list_view.png'} alt='view'
                        className='header_view'
                        onClick={() => { setIsListView(!isListView) }} />
                    <img src='images/icons/CL_icon_notice.png' alt='notice'
                        className='header_notice'
                        onClick={() => { setShowNotice(true) }} />
                </div>);
            }
        }
        return result;
    }

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo'
                    className='header_logo' onClick={onClickLogo} />
                {makeIcons()}
            </div>

            <NoticeOffCanvas
                show={showNotice}
                onHide={() => { setShowNotice(false) }}
            />
            <FilterOffCanvas
                show={showFilter}
                onHide={() => { setShowFilter(false) }}
            />
        </>

    );
};

export default Header;