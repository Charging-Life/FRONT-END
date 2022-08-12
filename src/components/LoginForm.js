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

    const onChangeId = (e) => {
        setLoginInfo((prev) => {
            return { ...prev, email : e.target.value}
        })
    }

    const onChangePw = (e) => {
        setLoginInfo((prev) => {
            return { ...prev, password : e.target.value}
        })
    }

    const onClickLogin = () => {
        axios.post(`${PROXY}/member/login`, loginInfo)
        .then((res) => {
            localStorage.setItem('accessToken', res.data.accessToken)
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
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