import React, { useEffect, useCallback,useState } from 'react';
import { SignUpEmailAuthBox } from '../SignUp/component/SignUpLayout';
import { EntireContainer, EntireWrapper } from '../SignUp/component/SignUpFrame';
import LogInQuery from '../../react-query/login';
import { useNavigate } from 'react-router-dom';
import {TITLE_PAGE} from '../../constant/PagePath'
import LogInAOC from './hoc/LogInAOC';

const LogIn = () => {

    const [email,setEmail] = useState('');
    const [emailMessage,setEmailMessage] = useState('');
    const [password,setPassword] = useState('');
    const [passwordMessage,setPasswordMessage] = useState('');
    const {isLoading:loginLoading,mutate,isError,isSuccess,error}=LogInQuery();
    const navigate = useNavigate();
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    useEffect(()=>{
        if(!loginLoading){
            if(isSuccess){
                navigate(`/${TITLE_PAGE}`);
            }else if(isError){
                console.error(error);
                setEmailMessage(error.message);
            }
        }
    },[isSuccess,isError,loginLoading])

    const onChangeEmail = useCallback((evt)=>{
        const {currentTarget:{value:emailValue}} = evt;
        setEmail(emailValue);
        if(emailRegEx.test(emailValue)){
            setEmailMessage('');
        }else{
            setEmailMessage('이메일 형식에 맞게 입력해 주세요!');
        }
    },[]);

    const onChangePassword = useCallback((evt)=>{
        const {currentTarget:{value:passwordValue}}=evt;
        setPassword(passwordValue);
        if(password!=='')setPasswordMessage('');
    },[]);

    const onSubmitFunc = useCallback((evt)=>{
        evt.preventDefault();
        if(loginLoading)return false;
        if(email===''){
            setEmailMessage("이메일을 입력해 주세요!");
            return false;
        }
        if(password===''){
            setPasswordMessage("비밀번호를 입력해 주세요!");
            return false;
        }
        if(!emailRegEx.test(email)){
            setEmailMessage("이메일 형식에 맞게 입력해 주세요!");
            return false;
        }
        mutate({email,password});

    },[
        email,password,loginLoading
    ])

    return (
        <EntireContainer>
            <EntireWrapper>
                <div className="page-component">
                    <SignUpEmailAuthBox>
                        <form onSubmit={onSubmitFunc} className="form">
                            <div className="form-wrapper">
                                <div className="title-box">
                                    <h2>회원 로그인</h2>
                                </div>
                                <div className="input-wrapper">
                                    <h3>
                                        <label htmlFor="email">이메일</label>
                                        <p className="error-message-component">{emailMessage}</p>
                                    </h3>
                                    <div className="input-box">
                                        <input onChange={onChangeEmail} value={email} id="email" type="text" />
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <h3>
                                        <label htmlFor="password">비밀번호</label>
                                        <p className="error-message-component">{passwordMessage}</p>
                                    </h3>
                                    <div className="input-box">
                                        <input onChange={onChangePassword} id="password" type="password" />
                                    </div>
                                </div>
                                <div className="button-box">
                                    <button className="button">
                                        로그인
                                    </button>
                                </div>
                            </div>
                        </form>

                    </SignUpEmailAuthBox>
                </div>
            </EntireWrapper>
        </EntireContainer>
    )
}

export default LogInAOC(LogIn);


