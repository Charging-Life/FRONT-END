import React, { useState } from 'react';
import '../styles/components/Header.css';
import NoticeOffCanvas from './NoticeOffCanvas.js';

const Header = () => {
    const [showNotice, setShowNotice] = useState(false);

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo' 
                    className='header_logo'/>
                <div>
                    <img src='images/CL_icon_search.png' alt='search' 
                        className='header_search'/>
                    <img src='images/CL_icon_notice.png' alt='notice' 
                        className='header_notice'
                        onClick={()=>{setShowNotice(true)}}/>
                </div>
            </div>

            <NoticeOffCanvas
                show = {showNotice}
                onHide = {()=>{setShowNotice(false)}}
            />
        </>

    );
};

export default Header;