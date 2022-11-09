import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { SIGN_UP, SIGNUP_EMAIL_AUTH, SIGNUP_AUTH_NUMBER, SIGNUP_TYPE_PASSWORD } from '../../../constant/PagePath';
import useStores from '../../../store';
import GetUserData from '../../../react-query/getUserData';
import { useCookies } from 'react-cookie';
import {COOKIE_USER_KEY} from '../../../react-query/keys';

const AuthHOC = (RequestedComponent) => {
    function RenderFunction() {
        const {
            callingEmailAPI, callingEmailAPIMessage,
            callingEmailAPIError, email, authState
        } = useStores().AuthStore;
        const { pathname } = useLocation();
        const {UserData} = GetUserData();
        const [cookies,,] = useCookies([COOKIE_USER_KEY]);

        const RenderedComponent = useMemo(() => {
            if(UserData&&cookies.UserData){
                return <Navigate to={-1} replace={true}/>
            }
            switch (pathname) {
                case `/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`: {
                    return <RequestedComponent />
                }
                case `/${SIGN_UP}/${SIGNUP_AUTH_NUMBER}`: {
                    if (!email) {
                        return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true} />
                    } else if (callingEmailAPIError) {
                        return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true} />
                    } else {
                        if(authState>=1){
                            return <RequestedComponent />
                        }else{
                            return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true}/>
                        }
                    }
                }
                case `/${SIGN_UP}/${SIGNUP_TYPE_PASSWORD}`:{
                    if(authState<2){
                        if(authState===1){return <Navigate to={`/${SIGN_UP}/${SIGNUP_AUTH_NUMBER}`} replace={true}/>}
                        else if(authState===0){return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true}/>}
                    }else{
                        if(!email){
                            return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true}/>
                        }else{
                            return <RequestedComponent />;
                        }
                    }
                }
                default: {
                    return <Navigate to={`/${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`} replace={true} />
                }
            }
        }, [
            callingEmailAPI,
            callingEmailAPIError,
            callingEmailAPIMessage,
            email, pathname,
            UserData,cookies.UserData
        ])

        return RenderedComponent;
    }
    return RenderFunction;

}

export default AuthHOC;