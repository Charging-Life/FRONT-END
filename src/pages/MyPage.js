import React, {useEffect, useState} from 'react';
import '../styles/pages/MyPage.css';
import Header from '../components/Header';
import UpdateModal from '../components/Modals/UpdateModal';
import {PROXY} from '../security/setupProxy';
import axios from 'axios';

const MyPage = () => {
    const [show, setShow] = useState(false);

    // manager : 여러회사 선택가능 / user : 사용자 / company : 하나만 선택가능
    // admin : 앱 관리자
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        businessNames: [],
        carNames: []
    })

    const makeCompanyBox = () => {
        const companyBoxArr = [];
        userInfo.businessNames.map((ele) => {
            companyBoxArr.push(<div className='company-box'>{ele}</div>)
        })

        return companyBoxArr;
    }

    const classifyAuth = () => {
        switch(localStorage.getItem('CL_auth')) {
            case 'USER': 
                return <>
                        <div className='my-title-text'>차량 정보</div>
                        <div className='company-box'>{userInfo.carnumber}</div>
                    </>
            case 'MANAGER': 
                return <>
                        <div className='my-title-text'>기업 정보</div>
                        <div id='company-container'>{makeCompanyBox()}</div>
                    </>
            case 'COMPANY': 
                return ''
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
        }
    }

    const onClickSignout = () => {
        // 회원탈퇴 통신
    }

    useEffect(() => {
        // axios로 회원정보 통신
        const auth = localStorage.getItem('CL_auth').toLowerCase();
        axios.get(`${PROXY}/member/${auth}`, {
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
                    carNames: res.data.carNames
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })

    }, []);

    return (
        <div className='MyPage'>
            <div className='mainpage_header'>
                <Header page={"my"}/>
            </div>
            <div className='user-info-box'>
                <div id='user-name'>{userInfo.name} 님</div>
                <div className='my-title-text'>이메일</div>
                <div id='email-text'>{userInfo.email}</div>
                {
                    classifyAuth()
                }
            </div>
            <div className='add-function-btns'>
                <div className='my-title-text'>추가 기능</div>
                <div className='my-btns'>
                    <button onClick={() => setShow(true)}>회원정보 수정하기</button>
                    <button onClick={onClickLogout}>로그아웃</button>
                    <button onClick={onClickSignout}>회원 탈퇴</button>
                </div>
            </div>
            <UpdateModal userInfo={userInfo} show={show} onHide={()=>setShow(false)}/>
        </div>
    );
};

export default MyPage;