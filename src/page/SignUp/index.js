import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { SIGNUP_EMAIL_AUTH, SIGNUP_AUTH_NUMBER, SIGNUP_TYPE_PASSWORD } from '../../constant/PagePath';
import SignUpEmailAuth from '../../component/SignUp/SignUpEmailAuth';
import SignAuthNumber from '../../component/SignUp/SignAuthNumber';
import SignUpTypePassword from '../../component/SignUp/SignUpTypePassword';
import AuthHOC from '../../component/SignUp/hoc/AuthHOC';
import {EntireContainer,EntireWrapper} from '../../component/SignUp/component/SignUpFrame';

const SignUp = () => {
    return (
        <EntireContainer>
            <EntireWrapper>
                <div className="page-component">
                    <Routes>
                        <Route exact path={`/${SIGNUP_AUTH_NUMBER}`} element={<SignAuthNumber/>} />
                        <Route exact path={`/${SIGNUP_EMAIL_AUTH}`} element={<SignUpEmailAuth />} />
                        <Route exact path={`/${SIGNUP_TYPE_PASSWORD}`} element={<SignUpTypePassword/>}/>
                    </Routes>
                </div>
            </EntireWrapper>
        </EntireContainer>
    )
}

export default AuthHOC(SignUp);
