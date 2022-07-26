import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../../styles/components/SignupForm.css';
import {isValidEmail, isValidPassword, isValidCarNumber} from '../../utils/checkUserInput.js';
import Timer from '../Timer';

const SignupForm = () => {

    const navigate = useNavigate();
    const [certificationNum, setCertificationNum] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [completeCertification, setCompleteCertification] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [timeover, setTimeover] = useState(false);

    const [signupInfo, setSignupInfo ] = useState({
        email : '',
        password : '',
        name : '', 
        auth : 'USER',
        car : ''
    });

    // 회원가입 데이터 set
    const handleSignupData = (e) => {
        
        if(e.target.name === 'certification') {
            setCertificationNum(e.target.value);
        }
        else if (e.target.name === 'checkPassword') {
            setCheckPassword(e.target.value);
        }
        else {
            setSignupInfo({
                ...signupInfo, 
                [e.target.name]: e.target.value
            });
        }
    };

    // 이메일 인증 요청 통신
    const handleCertification = () => {

        if(!signupInfo.email) {
            alert('이메일을 입력해주세요.');
            return;
        }

        if(!isValidEmail(signupInfo.email)) {
            alert('이메일을 형식에 맞게 입력해 주세요.');
            return;
        }

        if(completeCertification) {
            alert('이미 인증이 완료되었습니다.');
            return;
        }
        
        axios.post(`${process.env.REACT_APP_PROXY}/email`, {
            'email': signupInfo.email
        })
        .then((res) => {
            // 이메일 인증 성공
            alert('입력한 이메일을 확인해주세요.');
            setTimerOn(true);
        })
        .catch((err) => {
            // 이메일 인증 실패
            console.log(err);
            alert(err.response.data.description);
        });
    }

    // 인증번호 재발송 요청 통신
    const handleReCertification = () => {

        if(completeCertification) {
            alert('이미 인증이 완료되었습니다.');
            return;
        }

        axios.patch(`${process.env.REACT_APP_PROXY}/email`, {
            'email': signupInfo.email
        })
        .then((res) => {
            // 재발급 성공
            alert('입력한 이메일을 확인해주세요.');
            setTimerOn(true);
        })
        .catch((err) => {
            // 재발급 실패
            console.log(err);
            if(err.response.data.errorCode === 2001) {
                alert('이전에 입력한 이메일과 일치하지 않습니다.');
            }
            setTimeover(true); // 재발급 on
        });
    }

    // 인증번호 입력 확인 통신
    const handleCheckCertifNum = () => {

        if(!certificationNum) {
            alert('인증번호를 입력해주세요.');
            return;
        }

        if(completeCertification) {
            alert('이미 인증이 완료되었습니다.');
            return;
        }
        
        axios.get(`${process.env.REACT_APP_PROXY}/email?code=${certificationNum}&email=${signupInfo.email}`)
        .then((res) => {
            // 인증번호 일치
            if(res.data) {
                alert('인증되었습니다.');
                setCompleteCertification(true);
                setTimerOn(false);
            }
            else {
                // 인증번호 불일치
                alert('인증번호가 일치하지 않습니다. 다시 입력해주세요.');
            }
        })
        .catch((err) => {
            console.log(err);
            alert('인증번호가 만료되었습니다. 재발급해주세요.');
            setTimeover(true); // 재발급 on
            setTimerOn(false);
        });
    }

    // 회원가입 입력값 예외 처리
    const checkSignupData = () => {

        if(!signupInfo.name){
            alert('이름을 입력해주세요.');
            return false;
        }
        else if(!signupInfo.password) {
            alert('비밀번호를 입력해주세요.');
            return false;
        }
        else if(signupInfo.auth === 'USER' && !signupInfo.car){
            alert('차량번호를 입력해주세요.');
            return false;
        }

        if(!isValidPassword(signupInfo.password)) {
            alert('비밀번호를 8자리 이상 입력해 주세요.')
            return false;
        }

        if(signupInfo.password !== checkPassword) {
            alert('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
            return false;
        }

        if(signupInfo.auth === 'USER' && !isValidCarNumber(signupInfo.car)) {
            alert('차량번호를 올바르게 입력해 주세요.')
            return false;
        }

        if(!completeCertification) {
            alert('인증이 완료되지 않았습니다.');
            return false;
        }

        return true;
    }

    // 회원가입 통신
    const onClickSignup = () => {

        if(!checkSignupData()) return;
        
        let url = signupInfo.auth === 'USER' ? 'new' : 'company';
        axios.post(`${process.env.REACT_APP_PROXY}/member/${url}`, signupInfo)
        .then((res) => {
            navigate("/login");
        })
        .catch((err) => {
            console.log(err);
        });

    }

    useEffect(() => {
        setSignupInfo({
            email : '',
            password : '',
            name : '', 
            auth : signupInfo.auth,
            car : ''
        });
        setCompleteCertification(false);
        setCertificationNum('');
        setCheckPassword('');
        setTimerOn(false);
        setTimeover(false);
    }, [signupInfo.auth]);

    return (
        <div id='Signup'>
            <div id='typeRadio'>
                <input 
                    type='radio' 
                    value='USER' 
                    name='auth'  
                    checked={signupInfo.auth === 'USER'} 
                    onChange={handleSignupData}/>
                    &nbsp;&nbsp;<label>사용자</label> 
                    &nbsp;&nbsp;&nbsp;
                <input 
                    type='radio'   
                    value='MANAGER'
                    name='auth'    
                    checked={signupInfo.auth === 'MANAGER'} 
                    onChange={handleSignupData}/>
                    &nbsp;&nbsp;<label>관리자</label>
            </div>
            <input 
                    type='text' 
                    value={signupInfo.name} 
                    name='name' 
                    onChange={handleSignupData}
                    placeholder='이름을 입력하세요'/>
            <div id='signupBox'>
                <div><input 
                    value={signupInfo.email} 
                    type='text' 
                    name='email' 
                    onChange={handleSignupData} 
                    placeholder='e-mail을 입력하세요'/></div>
                <div>{
                    timerOn ? <Timer setTimeover={setTimeover} setTimerOn={setTimerOn}/> : (
                    timeover ? 
                    <button id='certifBtn' onClick={handleReCertification}>재발급받기</button> :
                    <button id='certifBtn' onClick={handleCertification}>인증하기</button>)
                }</div>
            </div>
            <div id='signupBox'>
                <div><input 
                    value={certificationNum} 
                    type='text' 
                    name='certification'
                    onChange={handleSignupData} 
                    placeholder='인증번호를 입력하세요'/></div>
                    <div><button id='certifBtn' onClick={handleCheckCertifNum}>확인하기</button></div>
                </div>
            <input 
                value={signupInfo.password} 
                type='password' 
                name='password' 
                onChange={handleSignupData} 
                placeholder='password를 입력하세요 (8자리 이상)'/>
            <input 
                value={checkPassword} 
                type='password' 
                name='checkPassword' 
                onChange={handleSignupData} 
                placeholder='password를 한번 더 입력하세요'/>
            {
                signupInfo.auth === 'USER' ?
                <input 
                    value={signupInfo.car} 
                    type='text' 
                    name='car'
                    onChange={handleSignupData} 
                    placeholder='차량번호를 입력하세요'/>
                    : <div style={{width: "100%", height: "12%"}}></div>
            }
            <button id="signin_btn" onClick={onClickSignup}>sign in</button>
        </div>
    );
};

export default SignupForm;