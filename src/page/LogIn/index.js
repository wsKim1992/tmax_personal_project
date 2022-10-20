import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { SIGN_UP,SIGNUP_EMAIL_AUTH, SIGNUP_AUTH_NUMBER, SINGUP_TYPE_PASSWORD } from '../../constant/PagePath';

const EmailAuthPage = () => {
    return (
        <div className="SignUp-Entire-Container">
            SignUp Page

        </div>
    )
}

const LogIn = observer(() => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <>
            <Routes>
                <Route exact path={`${SIGN_UP}${SIGNUP_EMAIL_AUTH}`} element={<EmailAuthPage/>} />
            </Routes>
        </>
    )
})

export default LogIn;
