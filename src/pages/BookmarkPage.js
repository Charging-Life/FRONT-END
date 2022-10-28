import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Header from '../components/Header';
import './/..//styles/pages/BookmarkPage.css';
import Bottombar from '../components/bars/Bar.js';
import ChargingSearchModal from '../components/Modals/ChargingSearchModal';
import BookmarkBox from '../components/BookmarkBox';
import { useNavigate } from 'react-router';

const BookmarkPage = () => {
    const navi = useNavigate();

    const [isListView, setIsListView] = useState(true);
    const [manageStation, setManageStation] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/station/manager`,{
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
        .then(res => {
            setManageStation(res.data);
        })
        .catch(err => {
            console.log(err);
            console.log('토큰이 만료되었습니다. 다시 로그인 해주세요.');
            navi(`/login`);

            localStorage.removeItem('CL_accessToken');
            localStorage.removeItem('CL_refreshToken');
            localStorage.removeItem('CL_auth');
        });
    }, []);

    return (
        <div id='BookmarkPage'>
            <div id='bookmarkHeader'>
                <Header page={"bookmark"} isListView={isListView} setIsListView={setIsListView}/>
            </div>
            <>
                {
                    manageStation.length === 0 ?
                    <div id='noBookmark'>
                        현재 등록된 <br/>즐겨찾기가 없습니다 
                    </div>
                    :
                    <div id='bookmarkContainer'>
                        { 
                            manageStation.map((ele, idx) => {
                                return <BookmarkBox data={ele} key={idx} 
                                manageStation={manageStation} setManageStation={setManageStation} />
                            })
                        }
                    </div>
                }
                <div id='addBtn' onClick={() => setShowSearchModal(true)}><img src='/images/icons/CL_icon_add_bookmark.png'/></div>
            </>
            <Bottombar value={2}/>
            <ChargingSearchModal 
                    show={showSearchModal} 
                    onHide={()=>{setShowSearchModal(false)}}
                    manageStation={manageStation} 
                    setManageStation={setManageStation}/>
        </div>
    );
};

export default BookmarkPage;