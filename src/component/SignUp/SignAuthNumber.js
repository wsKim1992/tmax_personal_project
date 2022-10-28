import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { SignUpEmailAuthBox } from './component/SignUpLayout';
import { useNavigate } from 'react-router-dom';
import useStores from '../../store';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SIGN_UP, SIGNUP_EMAIL_AUTH, SIGNUP_TYPE_PASSWORD } from '../../constant/PagePath';

const SignAuthNumberBox = styled(SignUpEmailAuthBox)`
    .form{
        .form-wrapper{
            position:relative;
            .back-button{
                position:absolute;
                top:6.6px;left:6.6px;
                width:35.5px;height:35.5px;
                border-radius:5.5px;
                background-color:#f5f3f2;
                box-shadow:0px 0px 5.5px #454545;
                font-size:15.5px;
                display:flex;
                flex-direction:row;
                align-items:center;
                justify-content:center;
                &:hover{
                    background-color:${props => props.theme.emphasize};
                    color:#f5f3f2;
                    box-shadow:none;
                }
            }
            .auth-code-time-left-box{
                width:95.5%;height:81.5px;
                .auth-code-time-left{
                    width:100%;height:100%;
                    line-height:25.5px;
                    text-align:center;
                    font-size:var(--header-menu);
                }
            }
            .input-wrapper{
                .input-box{
                    &.input-email{
                        .button{
                            font-size:11.5px;
                        }
                    }
                }
            }
            .button-box{
                .button{
                    padding:12.5px 25.5px;
                    font-size:11.5px;
                }
            }
        }
    }
`;


const SignAuthNumber = observer(() => {
    const [stateMessage, setStateMessage] = useState('이메일로 전송한 인증 코드를 입력해 주세요!');
    const [min, setMin] = useState('00');
    const [sec, setSec] = useState('00');
    const [code, setCode] = useState('');
    const timerRef = useRef(null);
    const navigate = useNavigate();
    const {
        callingCompareCodeAPI,
        callingCompareCodeAPIMessage,
        callingCompareCodeAPIError,
        callingCompareCodeAPISuccess,
        callingEmailAPISuccess,
        callingEmailAPIMessage,
        callingEmailAPIError,
        callingEmailAPI,
        changeAuthState,
        requsetCompareCodeAPI,
        initRequestCompareCodeAPI,
        requestSendEmailAPI,
        initRequestSendEmailAPI,
    } = useStores().AuthStore;
    const { email } = useStores().AuthStore;
    const intervalTime = 60000 * 1;
    const timeLimit = new Date(Date.now() + intervalTime);

    const initTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setMin('00');
            setSec('00');
        }
    }, [timerRef.current]);

    const onClickResendEmailBtn = useCallback((evt) => {
        if (callingEmailAPI) { return false; }
        initTimer();
        requestSendEmailAPI({ email });
    }, [callingEmailAPI]);

    useEffect(()=>{
        if(!callingEmailAPI){
            if(callingEmailAPISuccess){
                timerRef.current = setInterval(() => {
                    const timeNow = Date.now();
                    const elapsedTime = new Date(timeLimit - timeNow);
                    if (elapsedTime < 0) {
                        initTimer();
                        window.alert("세션 시간이 종료되어 이메일 & 아이디 입력 화면으로 이동합니다.");
                        navigate(`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`);
                    } else {
                        setMin(() => {
                            const minute = elapsedTime.getMinutes();
                            return minute / 10 < 1 ? `0${minute}` : `${minute}`;
                        });
                        setSec(() => {
                            const second = elapsedTime.getSeconds();
                            return second / 10 < 1 ? `0${second}` : `${second}`;
                        });
                    }
                },1000);
                initRequestSendEmailAPI();
                changeAuthState(2);
                window.alert(callingEmailAPIMessage);
            }else if(callingEmailAPIError){
                initRequestSendEmailAPI();
                window.alert(callingEmailAPIMessage);
            }
        }
    },[
        callingEmailAPISuccess,
        callingEmailAPIMessage,
        callingEmailAPIError,
        callingEmailAPI
    ]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            const timeNow = Date.now();
            const elapsedTime = new Date(timeLimit - timeNow);
            if (elapsedTime < 0) {
                initTimer();
                window.alert("세션 시간이 종료되어 이메일 & 아이디 입력 화면으로 이동합니다.");
                navigate(`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`);
            } else {
                setMin(() => {
                    const minute = elapsedTime.getMinutes();
                    return minute / 10 < 1 ? `0${minute}` : `${minute}`;
                });
                setSec(() => {
                    const second = elapsedTime.getSeconds();
                    return second / 10 < 1 ? `0${second}` : `${second}`;
                });
            }
        }, 1000);

        return () => {
            initTimer();
        }
    }, [])

    const onClickBackButtn = useCallback((evt) => {
        navigate(`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`);
    }, []);

    useEffect(() => {
        if (!callingCompareCodeAPI) {
            if (callingCompareCodeAPISuccess) {
                console.log(callingCompareCodeAPIMessage);
                changeAuthState(2);
                initRequestCompareCodeAPI();
                navigate(`/${SIGN_UP}/${SIGNUP_TYPE_PASSWORD}`);
            } else if (callingCompareCodeAPIError) {
                window.alert(callingCompareCodeAPIMessage);
                initRequestCompareCodeAPI();
            }
        }
    }, [
        callingCompareCodeAPISuccess,
        callingCompareCodeAPIMessage,
        callingCompareCodeAPI,
        callingCompareCodeAPIError
    ]);

    const onClickCallingCompareCodeAPIBtn = useCallback((evt) => {
        evt.preventDefault();
        if (callingCompareCodeAPI) { return false; }
        requsetCompareCodeAPI({ code });
    }, [callingCompareCodeAPI, code]);

    const onChangeCodeValue = useCallback((evt) => {
        const { currentTarget } = evt;
        const { value } = currentTarget;
        setCode(value);
    }, []);

    return (
        <SignAuthNumberBox>
            <form className="form" onSubmit={onClickCallingCompareCodeAPIBtn}>
                <div className="form-wrapper">
                    <p onClick={onClickBackButtn} className="back-button">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </p>
                    <div className="title-box">
                        <h2>회원가입 : 인증 코드 입력</h2>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="code"> 코드 입력</label>
                            <p className="error-message-component">{stateMessage}</p>
                        </h3>
                        <div className="input-box input-email">
                            <input id="code" type="text" onChange={onChangeCodeValue} />
                            <button type="button" onClick={onClickResendEmailBtn} className="button" >
                                코드 다시 받기
                            </button>
                        </div>
                    </div>
                    <div className="auth-code-time-left-box">
                        <p className="auth-code-time-left">
                            {`${min} 분 ${sec} 초 남음...`}
                        </p>
                    </div>
                    <div className="button-box">
                        <button type="submit" className="button">
                            코드 전송
                        </button>
                    </div>
                </div>
            </form>
        </SignAuthNumberBox>
    )
})

export default SignAuthNumber;


