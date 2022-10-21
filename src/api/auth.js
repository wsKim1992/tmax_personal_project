import {settingAPIForAuth} from '../api_format/auth';
export const checkIfEmailExistsAPI = async(data)=>{
    try{
        return await settingAPIForAuth.post('/checkEmailExists',data);
    }catch(err){
        console.error(err);
        throw new Error(err.message);
    }
}