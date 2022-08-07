import React, {useEffect, useState} from 'react';
import '../styles/pages/MyPage.css';
import Header from '../components/Header';
import UpdateModal from '../components/Modals/UpdateModal';
import {PROXY} from '../security/setupProxy';
import axios from 'axios';

const MyPage = () => {
    const [show, setShow] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        auth: '',
        carnumber: '26나2222',
        // admin : 여러회사 선택가능 / user : 사용자 / company : 하나만 선택가능
        company: ["강남구","세종시","소프트베리"]
    })

    const makeCompanyBox = () => {
        const companyBoxArr = [];
        userInfo.company.map((ele) => {
            companyBoxArr.push(<div className='company-box'>{ele}</div>)
        })

        return companyBoxArr;
    }

    const classifyAuth = () => {
        switch(userInfo.auth) {
            case 'USER': 
                return <>
                        <div className='my-title-text'>차량 정보</div>
                        <div className='company-box'>{userInfo.carnumber}</div>
                    </>
            case 'ADMIN': 
                return <>
                        <div className='my-title-text'>기업 정보</div>
                        <div id='company-container'>{makeCompanyBox()}</div>
                    </>
            case 'COMPANY': {
                return ''
            }
        }
    }

    const onClickLogout = () => {
        // 로그아웃 통신
    }

    const onClickSignout = () => {
        // 회원탈퇴 통신
    }

    useEffect(() => {
        // axios로 회원정보 통신
        axios.get(`${PROXY}/member/user`, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
        .then((res) => {
            setUserInfo((prev) => {
                return { ...prev, 
                    name: res.data.name,
                    email: res.data.email,
                    auth: 'COMPANY',
                    // carnumber: res.data.carnumber
                    carnumber: '26나2222'
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