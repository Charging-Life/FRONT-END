import React from 'react';
import { useNavigate } from 'react-router';

import '../styles/pages/SignupPage.css';
import SignupForm from '../components/SignupForm.js';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <section className='LoginPage'>
            {/* <div style={{width: "100px", height: "20%"}}></div>/ */}
            <div className='signUpLogoText'>sign in</div>
            <SignupForm/>
            <div style={{width: "100px", height: "5%"}}></div>
            <div id='none-auth-text'>이미 회원이신가요 ?</div>
            <button className='login-sigin-btn' onClick={handleLogin}>login</button>
        </section>
    );
};

export default SignupPage;