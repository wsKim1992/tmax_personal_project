import {useMutation,useQueryClient} from 'react-query';
import { logOutAPI } from '../api/auth';
import { USER_KEY,COOKIE_USER_KEY,MUSICLIST } from './keys';
import { useCookies } from 'react-cookie';

const LogOutQuery = ()=>{
    const queryClient = useQueryClient();
    const [,_,removeCookie] = useCookies([COOKIE_USER_KEY]);
    const {respData,mutate,isLoading,isSuccess,isError,error} = useMutation(
        ()=>logOutAPI(),
        {
            onSuccess:(respData)=>{
                removeCookie([COOKIE_USER_KEY],{path:'/'});
                queryClient.invalidateQueries([USER_KEY]);
                queryClient.removeQueries([MUSICLIST]);
                localStorage.removeItem('UserData');
            },
            onError:(err)=>{
                console.log(err);
                queryClient.invalidateQueries([USER_KEY]);
            }
        }
    )
    return {respData,mutate,isLoading,isSuccess,isError,error};
}

export default LogOutQuery;

