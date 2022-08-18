import React, {useState} from 'react';
import '../styles/components/LoginForm.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {PROXY} from '../security/setupProxy';

const LoginForm = () => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo ] = useState({
        email : '',
        password : ''
    });

    const handleLoginData = (e) => {
        setLoginInfo({
            ...loginInfo, 
            [e.target.name]: e.target.value
        });
    };

    const onClickLogin = () => {
        axios.post(`${PROXY}/member/login`, loginInfo)
        .then((res) => {
            localStorage.setItem('CL_auth', res.data.auth);
            localStorage.setItem('CL_accessToken', res.data.accessToken);
            localStorage.setItem('CL_refreshToken', res.data.refreshToken);
            navigate("/");
        })
        .catch((err) => {
            alert('로그인 실패 !');
            console.log(err);
        });
    }

    return (
        <div className='LoginForm'>
            <input value={loginInfo.id} name='email' onChange={handleLoginData} placeholder='    e-mail을 입력하세요'/><br/>
            <input value={loginInfo.pw} name='password' onChange={handleLoginData} placeholder='    password를 입력하세요'/><br/><br/>
            <button onClick={onClickLogin}>login</button>
        </div>
    );
};

export default LoginForm;