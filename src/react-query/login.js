import { useMutation,useQueryClient} from 'react-query';
import { logInAPI } from '../api/auth';
import {COOKIE_USER_KEY, USER_KEY} from './keys';
import { useCookies } from "react-cookie";

const LogInQuery = ()=>{
    const queryClient = useQueryClient();
    const now = new Date();
    let expireTime = new Date();
    expireTime.setMinutes(now.getMinutes()+5);
    const [,setCookie,] = useCookies([COOKIE_USER_KEY]);
    const {data:respData,isLoading,mutate,isSuccess,isError,error} = useMutation(
        (data)=>logInAPI(data),
        {
            onSuccess:(data)=>{
                setCookie(COOKIE_USER_KEY,data.token,{
                    path:"/",
                    expires:expireTime
                })
                //queryClient.setQueryData([USER_KEY],{...data.userInfo});
                queryClient.invalidateQueries([USER_KEY]);
            },
        }
    )

    return {respData,isLoading,mutate,isError,isSuccess,error};
}

export default LogInQuery;