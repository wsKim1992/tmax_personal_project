import { makeObservable, observable, computed, action ,flow,toJS} from "mobx";

class UploadStoreClass{
    musicListToBeUpload=[];
    myMusicList=[];
    isUploading=false;

    constructor(){
        makeObservable(this,{
            musicListToBeUpload:observable,
            myMusicList:observable,
            isUploading:observable,
            getMusicListToBeUpload:computed,
            updateMusiclistToBeUpload:action.bound,
            deleteMusiclistToBeUpload:action.bound,
            deleteSingleMusicToBeUploaded:action.bound
        })
    }
    
    get getMusicListToBeUpload(){
        return this.musicListToBeUpload;
    }

    updateMusiclistToBeUpload(addedMusicList){
        if(toJS(this.musicListToBeUpload).length<=0){
            this.musicListToBeUpload = [...addedMusicList];
        }else{
            this.musicListToBeUpload = [...toJS(this.musicListToBeUpload),...addedMusicList];
        }
    }

    deleteMusiclistToBeUpload(){
        this.musicListToBeUpload=[];
    }

    deleteSingleMusicToBeUploaded(key){
        console.log(key);
        this.musicListToBeUpload=this.musicListToBeUpload.filter(v=>v.key!==key);
    }
}

let UploadStore = new UploadStoreClass();

export default UploadStore;