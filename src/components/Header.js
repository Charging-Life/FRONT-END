import React, { useState } from 'react';
import '../styles/components/Header.css';
import FilterOffCanvas from './OffCanvases/FilterOffCanvas';
import NoticeOffCanvas from './OffCanvases/NoticeOffCanvas';

const Header = () => {
    const [showNotice, setShowNotice] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo' 
                    className='header_logo'/>
                <div>
                    <img src='images/CL_icon_search.png' alt='search' 
                        className='header_search'
                        onClick={()=>{setShowFilter(true)}}/>
                    <img src='images/CL_icon_notice.png' alt='notice' 
                        className='header_notice'
                        onClick={()=>{setShowNotice(true)}}/>
                </div>
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