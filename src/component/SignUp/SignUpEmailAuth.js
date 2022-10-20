import React,{useEffect,useCallback,useState,useRef} from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import useStores from '../../store';
import { flow } from 'mobx';

const SignUpEmailAuthBox = styled.div`
    width:100%;height:100%;
    padding:15px;
    box-sizing:border-box;
    .form{
        width:100%;height:100%;
        .form-wrapper{
            width:100%;height:100%;
            display:flex;
            flex-direction:column;
            justify-content:space-evenly;
            align-items:center;
            .title-box{
                height:auto;
                padding:5px 0;
                >h2{
                    font-size:25.5px;
                }
            }
            .button-box{
                width:100%;
                height:auto;
                margin-top:10px;
                display:flex;
                flex-direction:row;
                justify-content:center;
                >.button{
                    cursor:pointer;
                    font-size: var(--header-menu);
                    padding: 12.5px 6.5px;
                    color: #fff;
                    background: #FF4D5C;
                    border-radius: 4.5px;
                    &:hover{
                        background:${props=>props.theme.bodyBgColor};
                    }
                }
            }
            .input-wrapper{
                width:95.5%;height:81.5px;
                border-radius:5.5px;
                >h3{
                    height:25.5px;
                    font-weight:bold;
                    font-size:var(--header-menu);
                }
                .input-box{
                    height:calc(100% - 25.5px);
                    display:block;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    justify-content:flex-start;
                    input[type="text"]{
                        display:block;
                        width:100%;
                        height:100%;
                        border-radius:4.5px;
                        font-size:var(--header-menu);
                        padding: 0;
                        margin: 0;
                        border: none;
                        box-shadow:0px 0px 4.5px #454545;
                    }
                    .button{
                        display:block;
                        cursor:pointer;
                        height:95.5%;
                        font-size: var(--header-menu);
                        width:18.5%;
                        color: #fff;
                        background: #FF4D5C;
                        border-radius: 4.5px;
                        &:hover{
                            background:${props=>props.theme.bodyBgColor};
                        }
                    }
                    input[type="text"]:focus{
                        box-shadow:0px 0px 4.5px ${props=>props.theme.emphasize};
                    }
                    &.input-email{
                        justify-content:space-between;
                        input[type="text"]{
                            width:75.5%;
                        }
                    }
                }
            }
        }
    }
`;

const SignUpEmailAuth = observer(()=>{
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const emailInputRef = useRef(null);
    const usernameInputRef = useRef(null);
    const {
        authUsername,authemailCallAuthAPI,authEmail,
        emailAuthState,
        emailAuthLoadingflag
    } = useStores().AuthStore;

    const onChangeInput = useCallback((evt)=>{
        const {currentTarget:{value}} = evt;
        if(evt.currentTarget.id==="email"){
            setEmail(value);
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(!regex.test(value)){
                authEmail(false)
            }
        }else if(evt.currentTarget.id==="username"){
            setUsername(value);
            let usernameRegex = new RegExp(/^[a-z0-9_-]{7,14}$/);
            if(usernameRegex.test(value)){
                authUsername(true);
            }else{
                authUsername(false);
            }
        }
    },[]);

    const onSubmit = useCallback((evt)=>{
        evt.preventDefault();
        if(email){
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(!regex.test(email)){
                window.alert("이메일 형식에 맞춰 주세요!");
                emailInputRef.current.value='';
                emailInputRef.current.focus();
                return false;
            }
        }else{
            window.alert("이메일을 입력해 주세요!");
            emailInputRef.current.focus();
            return false;
        }
        if(username){
            let usernameRegex = new RegExp(/^[a-z0-9_-]{7,14}$/);
            if(!usernameRegex.test(username)){
                window.alert("닉네임은 영문과 숫자의 조합이여야 하며, 7글자 이상 14글자 이하여야만 합니다.");
                usernameInputRef.current.focus();
                usernameInputRef.current="";
                return false;
            }
        }else{
            usernameInputRef.current="";
            usernameInputRef.current.focus();
            window.alert("닉네임을 입력해 주세요!");
            return false;
        }
        switch(emailAuthState){
            case 0:{
                return false;
            }
            case 1:{
                window.alert("이메일 인증을 해주세요!");
                emailInputRef.current.value='';
                emailInputRef.current.focus();
                return false;
            }
            case 2:{
                window.alert("닉네임을 입력해주세요!");
                usernameInputRef.current.focus();
                usernameInputRef.current="";
                return false;
            }
            case 3:{
                authemailCallAuthAPI({email,username});
                return true;
            }
            default:{
                return false;
            }
        }
    },[email,username,emailAuthState]);


    return (
        <SignUpEmailAuthBox>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-wrapper">
                    <div className="title-box">
                        <h2>회원가입</h2>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="email">Email</label>
                        </h3>
                        <p className="input-box input-email">
                            <input ref={emailInputRef} value={email} onChange={onChangeInput} id="email" type="text" placeholder="이메일을 입력해 주세요"/>
                            <button className="button">
                                중복체크
                            </button>
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="username">닉네임</label>
                        </h3>
                        <p className="input-box">
                            <input ref={usernameInputRef} value={username} onChange={onChangeInput} id="username" type="text" placeholder="닉네임을 입력해 주세요!"/>
                        </p>
                    </div>
                    <div className="button-box">
                        <button className="button">
                            이메일 인증
                        </button>
                    </div>
                </div>
            </form>
        </SignUpEmailAuthBox>
    )
})

export default SignUpEmailAuth;