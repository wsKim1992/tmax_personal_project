import React, { useEffect,useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SIGNUP_EMAIL_AUTH, SIGNUP_AUTH_NUMBER, SIGNUP_TYPE_PASSWORD } from '../../constant/PagePath';
import SignUpEmailAuth from '../../component/SignUp/SignUpEmailAuth';
import SignAuthNumber from '../../component/SignUp/SignAuthNumber';
import SignUpTypePassword from '../../component/SignUp/SignUpTypePassword';
import AuthHOC from '../../component/SignUp/hoc/AuthHOC';

const EntireContainer = styled.div`
    width:100%;height:100%;
`;

const EntireWrapper = styled.div`
    width:100%;height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    .page-component{
        width:60vh;height:60vh;
        box-shadow:0px 0px 4.5px rgba(45,45,45,0.65);
        border-radius:12.5px;
        background-color:#fff;
        font-size:14.5px;

    }
    
    @media screen and ( max-width : 2200px ) or ( orientation : landscape ){
        .page-component{

        }
    }
`;

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
