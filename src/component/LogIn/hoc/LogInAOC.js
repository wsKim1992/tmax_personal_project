import React,{useEffect,useState} from 'react';
import GetUserData from '../../../react-query/getUserData';
import { useLocation,useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { COOKIE_USER_KEY, USER_KEY } from '../../../react-query/keys';
import LoadingComponent from '../../LoadingComponent';
import {LOG_IN} from '../../../constant/PagePath';
//import LogOutQuery from '../../../react-query/logout';

const LogInAOC = (ChildComponent)=>{
    function RenderComponentFunc(){
        const [AOCState,setAOCState] = useState(0);
        //const [nextPagePathname,setNextPagePathname] = useState('');
        const {
            UserData,loadingUserData,
            fetchingUserData,
            isError,
            error
        } = GetUserData();
        const [cookies,,] = useCookies([COOKIE_USER_KEY]);
        const {pathname} = useLocation();
        const navigate = useNavigate();
        //const {mutate:logOutMutate} = LogOutQuery();

        useEffect(()=>{
            const loadingFlag = loadingUserData || fetchingUserData;
            if(!loadingFlag){
                if(isError){
                    if(pathname===`/${LOG_IN}`){
                        window.alert(error.message);
                    }
                    pathname===`/${LOG_IN}`?setAOCState(2):setAOCState(1);
                }else{
                    if(UserData&&cookies.UserData){
                        pathname===`/${LOG_IN}`?setAOCState(1):setAOCState(2);
                    }else {
                        pathname===`/${LOG_IN}`?setAOCState(2):setAOCState(1);
                    }
                }
            }
        },[
            UserData,loadingUserData,
            fetchingUserData,
            isError,error,
            pathname
        ]);

        useEffect(()=>{
            if(AOCState===1){
                pathname!==`/${LOG_IN}`&&window.alert("로그인을 해주세요!");
                pathname!==`/${LOG_IN}`?navigate(`/${LOG_IN}`,{replace:true}):navigate(-1,{replace:true});
            }
        },[AOCState]);

        return (
            AOCState!==2?
                <LoadingComponent/>
                :<ChildComponent/>
        )

    }
    return RenderComponentFunc;
}

export default LogInAOC;