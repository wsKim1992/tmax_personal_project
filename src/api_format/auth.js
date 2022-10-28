import axios from 'axios';

export const settingAPIForAuth = (()=>{
    const axiosInstance = axios.create({withCredentials:true,baseURL:'http://localhost:3001/auth'})
    axiosInstance.defaults.headers["Content-Type"]=`application/json`;
    axiosInstance.defaults.timeout = 9900;
    axiosInstance.interceptors.response.use(
        function(response){
            console.log(response);
            return response.data;
        },
        function(error){
            if(error?.response?.status){
                const {status,data} = error.response;
                if(400<=status&&status<500){
                    return Promise.reject({message:data.message?data.message:'데이터 전송 오류'});
                }else if(500<=status){
                    return Promise.reject({message:data.message?data.message:"서버 점검중..."});
                }
            }else{
                const errData = {message:"내부 오류!"};
                return Promise.reject(errData);
            }
        }
    )
    return axiosInstance;
})()
