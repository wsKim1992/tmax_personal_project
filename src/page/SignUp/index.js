import React, { useEffect,memo } from 'react';
import { Routes, Route,BrowserRouter, useNavigate, useLocation,useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { SIGN_UP,SIGNUP_EMAIL_AUTH, SIGNUP_AUTH_NUMBER, SINGUP_TYPE_PASSWORD } from '../../constant/PagePath';
import SignUpEmailAuth from '../../component/SignUp/SignUpEmailAuth';
import SignAuthNumber from '../../component/SignUp/SignAuthNumber';

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

const EmailAuthPage = observer(() => {
    return (
        <div className="SignUp-Entire-Container">
            SignUp Page
        </div>
    )
})

function SignUpRouteFunc(){
    const signUpRoute = useRoutes([
        {path:`${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`,element:<SignUpEmailAuth/>},
    ]);
    return signUpRoute
}



const SignUp = observer(() => {
    const { pathname } = useLocation();

    return (
        <EntireContainer>
            <EntireWrapper>
                <div className="page-component">
                    <Routes>
                        <Route path={`/${SIGNUP_EMAIL_AUTH}`} element={<SignUpEmailAuth/>}/>
                        <Route path={`/${SIGNUP_AUTH_NUMBER}`} element={<SignAuthNumber/>}/>
                    </Routes>
                </div>
                
            </EntireWrapper>
        </EntireContainer>
    )
})

export default SignUp;
