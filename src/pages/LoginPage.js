import React from 'react';
import { useNavigate } from 'react-router';

import '../styles/pages/LoginPage.css';
import LoginForm from '../components/Forms/LoginForm.js';

const LoginPage = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/signup');
    }

    return (
        <section className='LoginPage'>
            <div style={{width: "100px", height: "20%"}}></div>
            <div className='logo-text'>login</div>
            <LoginForm/>
            <div style={{width: "100px", height: "20%"}}></div>
            <div id='none-auth-text'>아직 회원이 아니신가요 ?</div>
            <button className='login-sigin-btn' onClick={handleLogin}>sign in</button>
        </section>
    );
};

export default LoginPage;