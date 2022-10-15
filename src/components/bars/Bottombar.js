import React, {useState} from 'react';
import { useNavigate } from 'react-router';

import './../../styles/components/bars/Bottombar.css';

const Bottombar = ({value}) => {

    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState(value);
    const isLogined = localStorage.getItem('CL_auth') === null ? false : true;

    const handleNav = (e) => {
        if(!isLogined) {
            alert('로그인 후 이용해주세요.');
            return;
        }
        else {
            setActiveNav(e.currentTarget.id);

            switch(e.currentTarget.id) {
                case '1' : {
                    navigate('/');
                    break;
                }
                case '2' : {
                    navigate('/bookmark');
                    break;
                }
                case '3' : {
                    navigate('/board');
                    break;
                }
                case '4' : {
                    navigate('/my');
                    break;
                }
                default : {}
            }
        }
    }

    return (
        <div id='Bottombar'>
            <div id='1' onClick={handleNav}>
                <img src={activeNav === 1 ? '/images/icons/CL_icon_selected_home.png' : '/images/icons/CL_icon_home.png'} />
            </div>
            <div id='2' onClick={handleNav}>
                <img src={activeNav === 2 ? '/images/icons/CL_icon_selected_bookmark.png' : '/images/icons/CL_icon_bookmark.png'} />
            </div>
            <div id='3' onClick={handleNav}>
                <img src={activeNav === 3 ? '/images/icons/CL_icon_selected_board.png' : '/images/icons/CL_icon_board.png'} />
            </div>
            <div id='4' onClick={handleNav}>
                <img src={activeNav === 4 ? '/images/icons/CL_icon_selected_my.png' : '/images/icons/CL_icon_my.png'} />
            </div>
        </div>
    );
};

export default Bottombar;