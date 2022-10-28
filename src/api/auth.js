import {settingAPIForAuth} from '../api_format/auth';
export const checkIfEmailExistsAPI = async(data)=>{
    try{
        return await settingAPIForAuth.post('/checkEmailExists',data);
    }catch(err){
        console.error(err);
        throw new Error(err.message);
    }
}

export const sendEmailAPI = async(data)=>{
    try{
        const {flag,message}= await settingAPIForAuth.post('/sendEmail',data);
        if(flag){
            return {flag,message};
        }else{
            throw new Error({message});
        }
    }catch(err){
        console.error(err?.message);
        throw new Error(err.message);
    }
}

export const compareCodeAPI = async(data)=>{
    
    const {flag,message} = await settingAPIForAuth.post('/compareCode',data);
    console.log(`message from server : ${message}`);
    if(!flag){
        throw new Error(message);
    }
    return {flag,message};
}

export const signUpUserAPI = async (data)=>{
    console.log(data);
    const {flag,message} = await settingAPIForAuth.post('/signUpUser',data);
    if(!flag){
        throw new Error(message);
    }
    return {flag,message};
}