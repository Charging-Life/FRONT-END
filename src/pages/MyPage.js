import React, {useEffect, useState} from 'react';
import '../styles/pages/MyPage.css';
import Header from '../components/Header';
import UpdateModal from '../components/Modals/UpdateModal';

const MyPage = () => {
    const [show, setShow] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: "이수화",
        email: "tnghk9611@naver.com",
        company: ["강남구","세종시","소프트베리"],
        isAdmin: true
    })

    const makeCompanyBox = () => {
        const companyBoxArr = [];
        userInfo.company.map((ele) => {
            companyBoxArr.push(<div className='company-box'>{ele}</div>)
        })

        return companyBoxArr;
    }

    const onClickLogout = () => {
        // 로그아웃 통신
    }

    const onClickSignout = () => {
        // 회원탈퇴 통신
    }

    useEffect(() => {
        // axios로 회원정보 통신
    }, []);

    return (
        <div className='MyPage'>
            <div className='mainpage_header'>
                <Header page={"my"}/>
            </div>
            <div className='user-info-box'>
                <div id='user-name'>{userInfo.name}님</div>
                <div className='my-title-text'>이메일</div>
                <div id='email-text'>{userInfo.email}</div>
                {
                    userInfo.isAdmin ? 
                    <>
                        <div className='my-title-text'>기업 정보</div>
                        <div id='company-container'>{makeCompanyBox()}</div>
                    </>
                    : 
                    <>
                        <div className='my-title-text'>차량 정보</div>
                        <div className='company-box'>26나 1234</div>
                    </>
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