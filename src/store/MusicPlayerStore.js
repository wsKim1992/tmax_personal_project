import {makeObservable,observable,computed,action} from "mobx";

class MusicPlayerStoreClass{
    audioObj=null;
    musicPlayingNow=null;
    isPlaying=false;
    audioContext=null;
    audioAnalyzer=null;
    sourceElement=null;
    myMusicList=null;
    isShuffle=false;
    isRepeat=false;
    showMyPlayList=true;

    constructor(){
        makeObservable(this,{
            audioObj:observable,
            audioContext:observable,
            audioAnalyzer:observable,
            musicPlayingNow:observable,
            isPlaying:observable,
            myMusicList:observable,
            sourceElement:observable,
            isShuffle:observable,
            isRepeat:observable,
            setAudioSrc:action.bound,
            setMyMusicList:action.bound,
            setIsPlaying:action.bound,
            setNextOrPrevious:action.bound,
            setShuffle:action.bound,
            setIsRepeat:action.bound,
            setShowMyPlayList:action.bound,
            showMyPlayList:observable
        })
    }

    setShowMyPlayList(flag){
        this.showMyPlayList=!this.showMyPlayList;
    }

    setIsRepeat(){
        this.isRepeat=!this.isRepeat;
    }

    setShuffle(){
        this.isShuffle=!this.isShuffle;
    }

    setIsPlaying(flag){
       this.isPlaying=flag;
    }

    setAudioSrc(musicInfo){
        if(musicInfo){
            this.musicPlayingNow=musicInfo;
            const {url}=musicInfo;
            this.audioObj = new Audio(`/assets/music/${url}`);
            !this.audioContext&&(this.audioContext = new AudioContext());
            !this.audioAnalyzer&&(this.audioAnalyzer = this.audioContext.createAnalyser());
            !this.audioAnalyzer&&(this.audioAnalyzer.fftSize = 2048);
            const audioSource = this.audioContext.createMediaElementSource(this.audioObj);
            audioSource.connect(this.audioAnalyzer);
            this.audioAnalyzer.connect(this.audioContext.destination);
            
        }else{
            this.audioObj&&this.audioObj.pause();
            this.audioContext&&this.audioContext.close();
            this.audioObj=null;
            this.audioAnalyzer=null;
            this.audioContext = null;
            this.musicPlayingNow=null;
        }
    }

    setNextOrPrevious(direction,isNatural=true){
        const {index}=this.musicPlayingNow;
        let nextIndex=-1;
        let endFlag = false;
        if(!this.isShuffle){
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
        }else if(this.isShuffle){
            const {length} = this.myMusicList;
            const nextNum = Math.floor(Math.random()*length);
            console.log(nextNum);
            this.setAudioSrc({...this.myMusicList[nextNum],index:nextNum});
        }
    }

    setMyMusicList(musicList){
        this.myMusicList = [...musicList];
    }


}

let MusicPlayerStore = new MusicPlayerStoreClass();

export default MusicPlayerStore;