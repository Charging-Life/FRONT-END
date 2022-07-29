import React from 'react';
import '../styles/components/Header.css';

const Header = () => {
    return (
        <div className='Header'>
            {/* <div className='header_empty'/> */}
            <img src='images/CL_Logo_horizontality.png' alt='logo' className='header_logo'/>
            <div>
                <img src='images/CL_icon_search.png' alt='search' className='header_search'/>
                <img src='images/CL_icon_notice.png' alt='notice' className='header_notice'/>
            </div>
        </div>
    );
};

export default Header;