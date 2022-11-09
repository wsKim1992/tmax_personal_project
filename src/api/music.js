import {UploadFileAxiosObj,MusicAxiosObj} from '../api_format/music';

export const uploadFileAPI = async(formData,url)=>{
    try{
        return await UploadFileAxiosObj.post(`/${url}`,formData);
    }catch(err){
        console.error(err);
        throw new Error(JSON.stringify(
            {errorStatus:err.errorStatus,message:err.message}
        ));
    }
}

export const uploadMusicDB = async(data)=>{
    try{
        return await MusicAxiosObj.post(`/upload_music_db`,data);
    }catch(err){
        console.error(err);
        throw new Error(JSON.stringify(
            {errorStatus:err.errorStatus,message:err.message}
        ));
    }
}

export const getMusicListAPI = async(data)=>{
    try{
        //limit,pageNum
        return await MusicAxiosObj.get('/getMusicList',data);
    }catch(err){
        console.error(err);
        throw new Error(JSON.stringify(
            {...err}
        ))
    }
}