import React, { useState } from 'react';
import '../styles/components/Header.css';
import FilterOffCanvas from './OffCanvases/FilterOffCanvas';
import NoticeOffCanvas from './OffCanvases/NoticeOffCanvas';
import { useNavigate } from 'react-router';

const Header = ({page}) => {
    const [showNotice, setShowNotice] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const onClickLogo = () => {
        navigate("/");
    }

    return (
        <>
            <div className='Header'>
                <img src='images/CL_Logo_horizontality.png' alt='logo' 
                    className='header_logo' onClick={onClickLogo}/>
                {
                    page === "main" ? 
                    <div>
                        <img src='images/CL_icon_search.png' alt='search' 
                            className='header_search'/>
                        <img src='images/CL_icon_notice.png' alt='notice' 
                            className='header_notice'
                            onClick={()=>{setShowNotice(true)}}/>
                        <img src='images/CL_icon_setting.png' alt='setting' 
                            className='header_setting'
                            onClick={()=>{navigate('/my')}}/>
                    </div> : null
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