import axios from 'axios';

export const MusicAxiosObj = (()=>{
    const axiosInstance = axios.create({withCredentials:true,baseURL:'http://localhost:3001/music'});
    axiosInstance.defaults.headers["Content-Type"]='application/json';
    axiosInstance.defaults.timeout = 9900;
    axiosInstance.interceptors.response.use(
        function(response){
            return Promise.resolve(response.data);
        },
        function(error){
            if(error?.response?.status){
                const {status,data}=error.response;
                if(400<=status&&status<500){
                    switch(status){
                        case 401:{
                            return Promise.reject({errorStatus:0,message:data.message?data.message:'로그인을 해주세요'});
                        }
                        case 403:{
                            return Promise.reject({errorStatus:1,message:data.message?data.message:'제한된 접근!'});
                        }
                        default:{
                            return Promise.reject({errorStatus:2,message:data.message?data.message:'데이터 전송 오류'});
                        }
                    }
                }else if(500<=status){
                    return Promise.reject({errorStatus:2,message:data.message?data.message:"서버 점검중..."});
                }
            }else{
                const errData = {message:"내부오류!"};
                return Promise.reject(errData);
            }
        }
    )
    return axiosInstance;
})();

export const UploadFileAxiosObj = (()=>{
    const axiosInstance = axios.create({withCredentials:true,baseURL:'http://localhost:3001/music'});
    axiosInstance.defaults.headers["Content-Type"]='multipart/form-data';
    axiosInstance.defaults.timeout=9900;
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response.data;
        },
        (error)=>{
            console.log(error);
            if(error?.response?.status){
                const {status,data}=error.response;
                console.log(data);
                if(400<=status&&status<500){
                    switch(status){
                        case 401:{
                            return Promise.reject({errorStatus:0,message:data.message?data.message:'로그인을 해주세요'});
                        }
                        case 403:{
                            return Promise.reject({errorStatus:1,message:data.message?data.message:'제한된 접근!'});
                        }
                        default:{
                            return Promise.reject({errorStatus:2,message:data.message?data.message:'데이터 전송 오류'});
                        }
                    }
                }else if(500<=status){
                    return Promise.reject({message:data.message?data.message:"서버 점검중..."});
                }
            }else{
                const errData = {message:"내부오류!"};
                return Promise.reject(errData);
            }
        }
    )
    return axiosInstance;
})();