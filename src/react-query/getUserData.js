import {useQuery,useQueryClient} from 'react-query';
import {checkSessionAPI} from '../api/auth';
import { useCookies } from 'react-cookie';
import { USER_KEY,COOKIE_USER_KEY } from './keys';
/* import React from 'react'; */

const GetUserData = ()=>{
    const queryClient = useQueryClient();
    const [cookies,,removeCookie]=useCookies([COOKIE_USER_KEY]);
    /* const [enableQuery,setEnableQuery] = React.useState(false); */
    const {
        data:UserData,
        isLoading:loadingUserData, 
        isFetching:fetchingUserData,
        isError,error
    } = useQuery(
        [USER_KEY],
        ()=>checkSessionAPI(cookies.UserData),
        {
            refetchOnMount:true,
            refetchOnReconnect:true,
            refetchIntervalInBackground:false,
            refetchOnWindowFocus:true,
            retryDelay:0,
            cacheTime:1000*60*60*24,
            staleTime:1000*60*10,
            initialData:JSON.parse(localStorage.getItem('UserData'))!==null?JSON.parse(localStorage.getItem('UserData')):null,
            keepPreviousData:true,
            enabled:(cookies.UserData!==undefined && cookies.UserData!==null),
            onSuccess:(data)=>{
                localStorage.setItem('UserData',JSON.stringify(data));
                queryClient.setQueryData([USER_KEY],data);
            },
            onError:(err)=>{
                queryClient.setQueryData([USER_KEY],null);
                removeCookie([COOKIE_USER_KEY],{path:'/'});
            }
        }
    );
    return {
        UserData,loadingUserData,
        fetchingUserData,
        isError,
        error
    }
}

export default GetUserData;