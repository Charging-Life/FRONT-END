import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Header from '../components/Header';
import './/..//styles/pages/BookmarkPage.css';
import Bottombar from '../components/bars/Bottombar.js';
import ChargingSearchModal from '../components/Modals/ChargingSearchModal';
import BookmarkBox from '../components/BookmarkBox';

const BookmarkPage = () => {

    const [isListView, setIsListView] = useState(true);
    const [manageStation, setManageStation] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);
    console.log(manageStation);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/station/manager`,{
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
        .then(res => {
            setManageStation(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div id='BookmarkPage'>
            <div id='bookmarkHeader'>
                <Header page={"bookmark"} isListView={isListView} setIsListView={setIsListView}/>
            </div>
            {
                isListView ? 
                <div id='bookmarkContainer'>
                {
                    manageStation.length === 0 ?
                    <div id='noBookmark'>
                        <div></div>
                        현재 등록된 <br/>즐겨찾기가 없습니다 
                        <button onClick={() => setShowSearchModal(true)}>+ 추가하기</button>
                    </div>
                    :
                    <>
                        { 
                            manageStation.map((ele, idx) => {
                                return <BookmarkBox data={ele} key={idx} manageStation={manageStation} setManageStation={setManageStation} />
                            })
                        }
                        <div id='addBtn' onClick={() => setShowSearchModal(true)}>+</div>
                    </>
                }
                </div>
                : "지도"
            }
            <Bottombar value={2}/>
            <ChargingSearchModal show={showSearchModal} onHide={()=>{setShowSearchModal(false)}}
                                manageStation={manageStation} setManageStation={setManageStation}/>
        </div>
    );
};

export default BookmarkPage;