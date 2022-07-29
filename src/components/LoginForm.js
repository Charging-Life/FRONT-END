import React, {useState} from 'react';
import '../styles/components/LoginForm.css';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo ] = useState({
        id: '',
        pw: ''
    });

    const onChangeId = (e) => {
        setLoginInfo((prev) => {
            return { ...prev, id: e.target.value}
        })
    }

    const onChangePw = (e) => {
        setLoginInfo((prev) => {
            return { ...prev, pw: e.target.value}
        })
    }

    const onClickLogin = () => {
        // 통신하는 부분 추가
        navigate("/");
    }

    return (
        <div className='LoginForm'>
            <input value={loginInfo.id}  onChange={onChangeId} placeholder='    e-mail을 입력하세요'/><br/>
            <input value={loginInfo.pw} onChange={onChangePw} placeholder='    password를 입력하세요'/><br/><br/>
            <button onClick={onClickLogin}>login</button>
        </div>
    );
};

export default LoginForm;