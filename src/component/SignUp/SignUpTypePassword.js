import React,{useEffect,useCallback,useRef,useState} from 'react';
import styled from 'styled-components';
import useStores from '../../store';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {SignUpEmailAuthBox} from './component/SignUpLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {TITLE_PAGE} from '../../constant/PagePath';

const SignUpTypePasswordBox = styled(SignUpEmailAuthBox)`
`;

const SignUpTypePassword = observer(()=>{
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordMessage,setPasswordMessage]=useState('');
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);
    const navigate = useNavigate();
    const {
        email,username,callingSignUpAPI,
        callingSignUpAPIMessage,
        callingSignUpAPIError,
        callingSignUpAPISuccess,
        requestSignUpAPI,
        initRequestSignUpAPI
    } = useStores().AuthStore;

    useEffect(()=>{
        if(!callingSignUpAPI){
            if(callingSignUpAPISuccess){
                window.alert(callingSignUpAPIMessage);
                navigate(`/${TITLE_PAGE}`);
                initRequestSignUpAPI(true);
            }else if(callingSignUpAPIError){
                setPasswordMessage(callingSignUpAPIMessage);
                initRequestSignUpAPI(false);
            }
        }
    },[
        callingSignUpAPI,
        callingSignUpAPIMessage,
        callingSignUpAPIError,
        callingSignUpAPISuccess
    ]);

    const onSubmitFunc = useCallback((evt)=>{
        evt.preventDefault();
        const {value:passwordValue} = passwordRef.current;
        const {value:passwordCheckValue} = passwordCheckRef.current;
        const passwordRegEx =  /^[A-Za-z0-9]{6,12}$/;
        if(passwordRegEx.test(passwordValue)){
            setPasswordMessage('비밀번호 형식 : 숫자와 문자 포함 형태의 6~12자리 이내');
            return false;
        }
        if(passwordValue!==passwordCheckValue){
            setPasswordMessage('비밀번호가 일치하지 않습니다!');
            return false;
        }
        requestSignUpAPI({email,username,password:passwordValue})
        return true;
    },[]);

    const onClickShowPassowrdText = useCallback((evt)=>{
        evt.preventDefault();
        const {type:passwordInputType} = passwordRef.current;
        const {type:passwordCheckInputType} = passwordCheckRef.current;
        if(passwordInputType==='password'&& passwordCheckInputType==='password'){
            passwordRef.current.type='text';
            passwordCheckRef.current.type = 'text';
        }else{
            passwordRef.current.type='password';
            passwordCheckRef.current.type = 'password';
        }
    },[]);

    useEffect(()=>{
        if(password!==passwordCheck){
            setPasswordMessage('비밀번호가 일치하지 않습니다!');
        }else{
            setPasswordMessage('');
        }
    },[
        password,
        passwordCheck
    ])

    return(
        <SignUpTypePasswordBox>
            <form className="form" onSubmit={onSubmitFunc}>
                <div className="form-wrapper">
                    <div className="title-box">
                        <h2>회원가입 : 비밀번호 입력</h2>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="password">Password</label>
                            <p className="error-message-component">{passwordMessage}</p>
                        </h3>
                        <p className="input-box input-email">
                            <input 
                                onChange={(e)=>setPassword(e.currentTarget.value)} 
                                value={password} ref={passwordRef} 
                                type="password" 
                                placeholder='비밀번호를 입력해주세요!'
                            />
                            <button
                                type="button" 
                                onClick={onClickShowPassowrdText} 
                                className="button"
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="password-check">비밀번호 체크</label>
                            <p className="error-message-component"></p>
                        </h3>
                        <p className="input-box">
                            <input
                                onChange={(e)=>setPasswordCheck(e.currentTarget.value)} 
                                value={passwordCheck} ref={passwordCheckRef} 
                                type="password" 
                                placeholder='비밀번호를 재입력 해주세요'
                            />
                        </p>
                    </div>
                    <div className="button-box">
                        <button className="button">
                            회원가입 완료!
                        </button>
                    </div>
                </div>
            </form>
        </SignUpTypePasswordBox>
    )
})

export default SignUpTypePassword;
