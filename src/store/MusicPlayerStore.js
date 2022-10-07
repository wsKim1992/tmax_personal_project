import {makeObservable,observable,computed,action} from "mobx";

class MusicPlayerStoreClass{
    audioObj=null;
    musicPlayingNow=null;
    isPlaying=false;
    audioContext=null;
    analyser=null;
    sourceElement=null;
    myMusicList=null;
    isShuffle=false;
    isRepeat=false;
    constructor(){
        makeObservable(this,{
            audioObj:observable,
            audioContext:observable,
            musicPlayingNow:observable,
            isPlaying:observable,
            analyser:observable,
            myMusicList:observable,
            sourceElement:observable,
            isShuffle:observable,
            isRepeat:observable,
            setAudioSrc:action.bound,
            setMyMusicList:action.bound,
            setIsPlaying:action.bound,
            setNextOrPrevious:action.bound,
            setShuffle:action.bound
        })
    }

    setIsPlaying(flag){
       this.isPlaying=flag;
    }

    setShuffle(flag){
        this.isShuffle=flag;
    }

    setAudioSrc(musicInfo){
        if(musicInfo){
            this.musicPlayingNow=musicInfo;
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
            this.musicPlayingNow=null;
        }
    }

    setNextOrPrevious(direction,isNatural=true){
        const {index}=this.musicPlayingNow;
        let nextIndex=-1;
        let endFlag = false;
        console.log(isNatural);
        if(direction==='prev'){
            if(index===0){
                nextIndex=this.myMusicList.length-1
            }else{
                nextIndex=index-1;
            }
        }else if(direction==='next'){
            if(index>=this.myMusicList.length-1&&isNatural&&!this.isRepeat){
                endFlag=true;
            }else if(index>=this.myMusicList.length-1&&(!isNatural||this.isRepeat)){
                nextIndex=0;
            }else{
                nextIndex=index+1;
            }
        }
        endFlag?
            this.setAudioSrc(null)
            :this.setAudioSrc({...this.myMusicList[nextIndex],index:nextIndex});
    }

    setMyMusicList(musicList){
        this.myMusicList = [...musicList];
    }


}

let MusicPlayerStore = new MusicPlayerStoreClass();

export default MusicPlayerStore;