import {makeObservable,observable,computed,action} from "mobx";

class MusicPlayerStoreClass{
    audioObj=null;
    musicPlayingNow=null;
    audioContext=null;
    analyser=null;
    sourceElement=null;
    myMusicList=null;

    constructor(){
        makeObservable(this,{
            audioObj:observable,
            audioContext:observable,
            musicPlayingNow:observable,
            analyser:observable,
            myMusicList:observable,
            sourceElement:observable,
            setAudioSrc:action.bound,
            setMyMusicList:action.bound,
            setMusicPlaying:action.bound,
        })
    }

    setAudioSrc(musicInfo){
        if(musicInfo){
            const {src}=musicInfo;
            this.audioObj = new Audio(src);
            /* this.audioContext = new AudioContext();
            this.analyser = this.audioContext.createAnalyser();
            this.sourceElement=this.audioContext.createMediaElementSource(this.audioObj);
            this.sourceElement.connect(this.analyser); */
        }else{
            /* this.sourceElement.disconnect(this.analyser);
            this.sourceElement= null;
            this.analyser=null;
            this.audioContext=null; */
            this.audioObj=null;
            this.albumImage=null;
        }
    }

    setMyMusicList(musicList){
        this.myMusicList = [...musicList];
    }

    setMusicPlaying(id){
        const selectedMusic = this.myMusicList.find(v=>v.id===id);
        console.log(selectedMusic);
        this.setAudioSrc({...selectedMusic[0]});
    }

}

let MusicPlayerStore = new MusicPlayerStoreClass();

export default MusicPlayerStore;