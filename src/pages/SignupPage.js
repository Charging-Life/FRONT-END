import React from 'react';
import { useNavigate } from 'react-router';

import '../styles/pages/SignupPage.css';
import SignupForm from '../components/Forms/SignupForm.js';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <section className='SignupPage'>
            <div id='signup_container'>
                <div className='signup_logo_text'>sign in</div>
                <SignupForm/>
                <div id='login_btn_box'>
                    <div id='none_auth_text'>이미 회원이신가요 ?</div>
                    <button className='signin_login_btn' onClick={handleLogin}>login</button>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;