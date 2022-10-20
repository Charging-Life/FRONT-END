import React, {useState} from 'react';
import { useNavigate } from 'react-router';

import './../../styles/components/bars/Bar.css';

const Bar = ({value}) => {

    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState(value);
    const isLogined = localStorage.getItem('CL_auth') === null ? false : true;

    // value에 따라서 navigate로 url 이동
    const handleNav = (e) => {
        
        switch(e.currentTarget.id) {
            case '1' : {
                navigate('/');
                break;
            }
            case '2' : {
                if(!isLogined) {
                    alert('로그인 후 이용해주세요.');
                    return;
                }
                navigate('/bookmark');
                break;
            }
            case '3' : {
                navigate('/board');
                break;
            }
            case '4' : {
                if(!isLogined) {
                    alert('로그인 후 이용해주세요.');
                    return;
                }
                navigate('/my');
                break;
            }
            default : {}
        }

        setActiveNav(e.currentTarget.id);
    }

    return (
        // activeNav에 따른 아이콘 변경
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

export default Bar;