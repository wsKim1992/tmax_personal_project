import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { SignUpEmailAuthBox } from './SignUpEmailAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import useStores from '../../store';
import { observer } from 'mobx-react-lite';

const SignAuthNumberBox = styled(SignUpEmailAuthBox)`
    .form{
        .form-wrapper{
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
    const navigate = useNavigate();
    const { pathname, state: { email } } = useLocation();


    return (
        <SignAuthNumberBox>
            <form className="form">
                <div className="form-wrapper">
                    <div className="title-box">
                        <h2>회원가입 : 인증 코드 입력</h2>
                    </div>
                    <div className="input-wrapper">
                        <h3>
                            <label htmlFor="code"> 코드 입력</label>
                            <p className="error-message-component">{stateMessage}</p>
                        </h3>
                        <p className="input-box input-email">
                            <input id="code" type="text" />
                            <button className="button" >
                                코드 다시 받기
                            </button>
                        </p>
                    </div>
                    <div className="auth-code-time-left-box">
                        <p className="auth-code-time-left">
                            {`${min} 분 ${sec} 초 남음...`}
                        </p>
                    </div>
                    <div className="button-box">
                        <button className="button">
                            코드 전송
                        </button>
                    </div>
                </div>
            </form>
        </SignAuthNumberBox>
    )
})

export default SignAuthNumber;


