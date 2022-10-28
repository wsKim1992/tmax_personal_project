import React, { useEffect, useCallback, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../../store';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP, SIGNUP_AUTH_NUMBER } from '../../constant/PagePath';
import LoadingComponent from '../LoadingComponent';
import {SignUpEmailAuthBox} from './component/SignUpLayout';

const SignUpEmailAuth = observer(() => {
    const {
        authUsername, authemailCallAuthAPI, authEmail,
        initEmailErrorMessage,
        requestSendEmailAPI,
        initRequestSendEmailAPI,
        changeAuthState,
        callingEmailAPISuccess,
        email:AuthEmailState,
        callingEmailAPIMessage,
        callingEmailAPI, callingEmailAPIError,
        emailAuthState, emailErrorMessage
    } = useStores().AuthStore;
    const [email, setEmail] = useState(AuthEmailState);
    const [username, setUsername] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const emailInputRef = useRef(null);
    const usernameInputRef = useRef(null);
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

    const navigate = useNavigate();
    useEffect(()=>{
        changeAuthState(0);
    },[]);
    useEffect(() => {
        if (emailErrorMessage) {
            setEmailMessage(emailErrorMessage);
            emailInputRef.current.focus();
            initEmailErrorMessage();
        }
    }, [emailErrorMessage])

    const onChangeInput = useCallback((evt) => {
        const { currentTarget: { value } } = evt;
        if (evt.currentTarget.id === "email") {
            setEmail(value);
            let regex = new RegExp(emailRegEx);
            if (!regex.test(value)) {
                authEmail(false);
                setEmailMessage("이메일 형식에 맞춰 주세요!");
            } else {
                setEmailMessage("");
            }
        } else if (evt.currentTarget.id === "username") {
            setUsername(value);
            let usernameRegex = new RegExp(/^[a-z0-9_-]{7,14}$/);
            if (usernameRegex.test(value)) {
                authUsername(true);
                setUsernameMessage("");
            } else {
                authUsername(false);
                setUsernameMessage("닉네임은 영문과 숫자의 조합이여야 하며, 7글자 이상 14글자 이하여야만 합니다.!");
            }
        }
    }, []);

    const onSubmit = useCallback((evt) => {
        evt.preventDefault();
        if (email) {
            let regex = new RegExp(emailRegEx);
            if (!regex.test(email)) {
                emailInputRef.current.value = '';
                emailInputRef.current.focus();
                return false;
            }
        } else {
            setEmailMessage("이메일을 입력해 주세요!");
            emailInputRef.current.focus();
            return false;
        }
        if (username) {
            let usernameRegex = new RegExp(/^[a-z0-9_-]{7,14}$/);
            if (!usernameRegex.test(username)) {
                setUsernameMessage("닉네임은 영문과 숫자의 조합이여야 하며, 7글자 이상 14글자 이하여야만 합니다.");
                usernameInputRef.current.focus();
                usernameInputRef.current.value = "";
                return false;
            }
        } else {
            usernameInputRef.current.value = "";
            usernameInputRef.current.focus();
            setUsernameMessage("닉네임을 입력해 주세요!");
            return false;
        }

        switch (emailAuthState) {
            case 0: {
                return false;
            }
            case 1: {
                setEmailMessage("이메일 인증을 해주세요!");
                emailInputRef.current.focus();
                return false;
            }
            case 2: {
                setUsernameMessage("닉네임을 입력해주세요!");
                usernameInputRef.current.focus();
                usernameInputRef.current.value = "";
                return false;
            }
            case 3: {
                //authemailCallAuthAPI({email,username});
                requestSendEmailAPI({ email, username })
                return true;
            }
            default: {
                return false;
            }
        }
    }, [
        email,username,emailAuthState,
        usernameInputRef.current,
        emailInputRef.current
    ]);

    useEffect(() => {
        if (callingEmailAPI) {
            console.log(callingEmailAPI)
        } else {
            if (callingEmailAPIError) {
                window.alert(callingEmailAPIMessage)
                initRequestSendEmailAPI();
            } else if (callingEmailAPISuccess) {
                window.alert(callingEmailAPIMessage);
                navigate(`/${SIGN_UP}/${SIGNUP_AUTH_NUMBER}`, { replace: true });
                changeAuthState(1);
                initRequestSendEmailAPI();
            }
        }
    }, [
        callingEmailAPI,
        callingEmailAPIError,
        callingEmailAPISuccess,
        callingEmailAPIMessage
    ]);

    const onClickEmailCheck = useCallback((evt) => {
        evt.preventDefault();
        console.log(email);
        let regex = new RegExp(emailRegEx);
        if (regex.test(email)) {
            authemailCallAuthAPI({ email })
        } else {
            setEmailMessage("이메일 형식에 맞게 입력해주세요!")
        }
    }, [email]);

    return (
        <SignUpEmailAuthBox>
            {
                callingEmailAPI ? (
                    <LoadingComponent />
                ) : (
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-wrapper">
                            <div className="title-box">
                                <h2>회원가입 : 이메일 & 닉네임 설정</h2>
                            </div>
                            <div className="input-wrapper">
                                <h3>
                                    <label htmlFor="email">Email</label>
                                    <p className="error-message-component">{emailMessage}</p>
                                </h3>
                                <p className="input-box input-email">
                                    <input ref={emailInputRef} value={email} onChange={onChangeInput} id="email" type="text" placeholder="이메일을 입력해 주세요" />
                                    <button className="button" onClick={onClickEmailCheck} >
                                        중복체크
                                    </button>
                                </p>
                            </div>
                            <div className="input-wrapper">
                                <h3>
                                    <label htmlFor="username">닉네임</label>
                                    <p className="error-message-component">{usernameMessage}</p>
                                </h3>
                                <p className="input-box">
                                    <input ref={usernameInputRef} value={username} onChange={onChangeInput} id="username" type="text" placeholder="닉네임을 입력해 주세요!" />
                                </p>
                            </div>
                            <div className="button-box">
                                <button className="button">
                                    인증 메일 전송
                                </button>
                            </div>
                        </div>
                    </form>
                )

            }
        </SignUpEmailAuthBox>
    )
})

export default SignUpEmailAuth;