import React from 'react';
import '../styles/pages/LoginPage.css';
import LoginForm from '../components/LoginForm.js';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    return (
        <section className='LoginPage'>
            <div style={{width: "100px", height: "20%"}}></div>
            <div className='logo-text'>login</div>
            <LoginForm/>
            <div style={{width: "100px", height: "20%"}}></div>
            <div id='none-auth-text'>아직 회원이 아니신가요 ?</div>
            <button className='login-sigin-btn'>sign in</button>
        </section>
    );
};

export default LoginPage;