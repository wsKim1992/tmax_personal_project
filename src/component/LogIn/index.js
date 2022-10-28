import React, { useEffect, useCallback } from 'react';
import { SignUpEmailAuthBox } from '../SignUp/component/SignUpLayout';

import { EntireContainer, EntireWrapper } from '../SignUp/component/SignUpFrame';

const LogIn = () => {


    return (
        <EntireContainer>
            <EntireWrapper>
                <div className="page-component">
                    <SignUpEmailAuthBox>
                        <form className="form">
                            <div className="form-wrapper">
                                <div className="title-box">
                                    <h2>회원 로그인</h2>
                                </div>
                                <div className="input-wrapper">
                                    <h3>
                                        <label htmlFor="email">이메일</label>
                                        <p className="error-message-component"></p>
                                    </h3>
                                    <div className="input-box">
                                        <input id="email" type="text" />
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <h3>
                                        <label htmlFor="password">비밀번호</label>
                                        <p className="error-message-component"></p>
                                    </h3>
                                    <div className="input-box">
                                        <input id="password" type="password" />
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

export default LogIn;


