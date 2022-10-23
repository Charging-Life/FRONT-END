import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import '../styles/pages/MyPage.css';
import Header from '../components/Header';
import UpdateModal from '../components/Modals/UpdateModal';
import ChargingSearchModal from '../components/Modals/ChargingSearchModal';
import Bar from '../components/bars/Bar';

const MyPage = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [manageStation, setManageStation] = useState([]);
    const isUser = localStorage.getItem('CL_auth') === 'USER';

    // manager : 여러회사 선택가능 / user : 사용자 / company : 하나만 선택가능
    // admin : 앱 관리자
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        businessNames: [],
        carNames: [],
        auth: ''
    })

    const makeCompanyBox = () => {
        const companyBoxArr = [];
        userInfo.businessNames.map((ele) => {
            companyBoxArr.push(<div className='company-box'>{ele}</div>)
        })

        return companyBoxArr;
    }

    const showStationList = () =>{
        const showList = [];

        if(manageStation.length > 0){
            for(let i = 0; i < manageStation.length; i++){
                showList.push(
                    <div key={i} className='show_manage_station'>
                        <div>
                            <div>{manageStation[i]['statNm']}</div>
                            <div>{manageStation[i]['address']}</div>
                        </div>
                        <button><img alt='삭제' src='images/icons/CL_icon_delete.png'/></button>
                    </div>
                );
            }
        }
        else{
            showList.push(<div className='station_empty' key={-1}>등록된 충전소가 없습니다.</div>)
        }

        return showList;
    }

    const classifyAuth = () => {
        switch(localStorage.getItem('CL_auth')) {
            case 'USER': 
                return <>
                        <div className='my_title_text'>차량 정보</div>
                        <div className='car_box'>{userInfo.carNames}</div>
                    </>
            case 'COMPANY': 
               return <div id='manager_charging_list'>
                        <div className='charging_box'>
                            <span>관할 충전소 목록</span>
                            <button id='search-station-btn' onClick={()=>{setShowSearchModal(true)}}>추가하기</button>
                        </div>
                        <div className='show_station_list'>{showStationList()}</div>
                    </div>
            case 'MANAGER': 
                 return <>
                        <div className='my_title_text'>기업 정보</div>
                        <div id='company-container'>{makeCompanyBox()}</div>
                    </>
            case 'ADMIN':
                return ''
        }
    }
    

    const onClickLogout = () => {
        // 로그아웃 통신
        if(window.confirm("로그아웃 하시겠습니까 ?")) {
            localStorage.removeItem('CL_accessToken');
            localStorage.removeItem('CL_refreshToken');
            localStorage.removeItem('CL_auth');
            navigate('/');
        }
    }

    const onClickSignout = () => {
        // 회원탈퇴 통신
    }

    useEffect(() => {
        // axios로 회원정보 통신
        const auth = localStorage.getItem('CL_auth') && localStorage.getItem('CL_auth').toLowerCase();
        axios.get(`${process.env.REACT_APP_PROXY}/member/${auth}`, {
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
        .then((res) => {
            setUserInfo((prev) => {
                return { ...prev, 
                    name: res.data.name,
                    email: res.data.email,
                    businessNames: res.data.businessNames,
                    carNames: res.data.carNames[0],
                    auth: res.data.auth
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(`${process.env.REACT_APP_PROXY}/station/manager`,{
            headers: {
                Authorization: localStorage.getItem('CL_accessToken')
            }
        })
        .then((res)=>{
            const addList = [];
            res.data.map(data=>{
                addList.push({
                    statNm: data['statNm'],
                    statId: data['statId'],
                    address: data['address'],
                    location: data['location']
                })
            })
            setManageStation(addList);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);


    return (
        <div className='MyPage'>
            <div className='mainpage_header'>
                <Header page={"my"}/>
            </div>
            <div id='mypage_container'>
                <div className='user_info_box'>
                    <div id='name_email_text'>
                        <div>{userInfo.name} 님</div>
                        <div class='my_title_text'>이메일</div>
                        <div>{userInfo.email}</div>
                    </div>
                    { classifyAuth() }
                </div>
                <div className='add-function-btns'>
                    <div className='my_title_text'>추가 기능</div>
                    <div className='my_btns'>
                        <button onClick={() => setShow(true)}>회원정보 수정하기</button>
                        <button onClick={onClickLogout}>로그아웃</button>
                        <button onClick={onClickSignout}>회원 탈퇴</button>
                    </div>
                </div>
            </div>
            <Bar value={4}/>
            <UpdateModal userInfo={userInfo} show={show} onHide={()=>setShow(false)}/>
            <ChargingSearchModal show={showSearchModal} onHide={()=>{setShowSearchModal(false)}}
                                manageStation={manageStation} setManageStation={setManageStation}/>
        </div>
    );
};

export default MyPage;