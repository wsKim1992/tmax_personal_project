import {QueryClient} from 'react-query';

const errorFunc = (error)=>{
    console.error(error);
    if(error?.response){
        window.alert(error.response.data.message);
    }else{
        window.alert(error.message);
    }
}

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:1000*60*3,
            cacheTime:1000*60*6,
            refetchOnMount:false,
            refetchOnWindowFocus:false,
            refetchOnReconnect:false,
            refetchInterval:1000*60*3,
            onError:errorFunc
        },
    }
})

export default queryClient;