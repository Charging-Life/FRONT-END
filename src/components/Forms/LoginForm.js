import React, {useState} from 'react';
import '../../styles/components/LoginForm.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

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
        axios.post(`${process.env.REACT_APP_PROXY}/member/login`, loginInfo)
        .then((res) => {
            localStorage.setItem('CL_email', loginInfo.email);
            localStorage.setItem('CL_auth', res.data.auth);
            localStorage.setItem('CL_accessToken', res.data.accessToken);
            localStorage.setItem('CL_refreshToken', res.data.refreshToken);
            navigate("/");
        })
        .catch((err) => {
            alert(err.response.data.description);
        });
    }

    return (
        <div className='Form'>
            <input value={loginInfo.id} type='text' name='email' onChange={handleLoginData} placeholder='    e-mail을 입력하세요'/><br/>
            <input value={loginInfo.pw} type='password' name='password' onChange={handleLoginData} placeholder='    password를 입력하세요'/><br/><br/>
            <button onClick={onClickLogin}>login</button>
        </div>
    );
};

export default LoginForm;