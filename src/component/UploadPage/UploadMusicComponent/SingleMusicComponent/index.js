import React,{memo,useRef,useCallback,useState,useEffect} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRotate,faPlay,faStop,faPlus,faMinus,faVolumeLow} from '@fortawesome/free-solid-svg-icons';
import musicCoverSample from '../../../../static/image/logo.jpg';
import { GenreList } from "../../../../constant/MusicGenre";
//import sampleMusic from "../../../../static/sample_music/Jim Yosef - Speed.mp3";
import Slider from '@mui/material/Slider';
import { observer } from 'mobx-react-lite';
import UploadStore from '../../../../store/UploadStore';

const UploadedMusicBox = styled.div`
    width:100%;
    height:285px;
    border-radius:10.5px;
    background-color:#A2A5AF;
    margin-bottom:10px;
    .mp3-player-box{
        width:100%;height:85.5px;
        .mp3-player{
            width:90%;height:calc(100% - 20.5px);
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            margin:0 auto;
            .start-button-box{
                width:38.5px;height:38.5px;
                line-height:38.5px;
                .play-button{
                    cursor:pointer;
                    width:100%;height:100%;
                    border-radius:5.5px;
                    background-color:#454545;
                    font-size:var(--body-form-text);  
                    color:#fff;  
                    text-align:center;
                    &:hover{
                        background:#fff;
                        color:#000;
                    }
                }
            }
            .add-delete-button-box{
                width:auto;height:38.5px;
                border-radius:5.5px;
                display:flex;
                .volume-controller-box{
                    width:auto;height:100%;
                    margin-right:10px;
                    display:flex;
                    flex-direction:row;
                    &.open{
                        .volume-controller-icon{
                            color:${props=>props.theme.emphasize};
                        }    
                        .volume-controller{
                            width:125.5px;
                            >span{
                                display:block;
                            }
                        }
                    }
                    .volume-controller-icon{
                        width:38.5px;height:38.5px;
                        border-radius:4.5px;
                        line-height:38.5px;
                        background-color:#454545;
                        font-size:var(--body-form-text);
                        color:#fff;
                        text-align:center;
                        &:hover{
                            background:#fff;
                            color:#000;
                        }
                    }
                    .volume-controller{
                        width:0px;
                        border-radius:12.5px;
                        background-color:${props=>props.theme.bodyBgColor};
                        transition:.75s width;
                        margin-left:10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        >span{
                            display:none;width: 75%;;
                            padding:0;
                            .MuiSlider-thumb{
                                width:15.5px;
                                height:15.5px;
                            }
                        }
                    }
                }
                .add-button{
                    cursor:pointer;
                    width:38.5px;height:100%;
                    line-height:38.5px;
                    border-radius:5.5px;
                    background-color:#454545;
                    font-size:var(--body-form-text);
                    color:#fff;
                    text-align:center;
                    &:hover{
                        background:#fff;
                        color:#000;
                    }
                }
                .delete-button{
                    cursor:pointer;
                    margin-left:10px;
                    width:38.5px;height:100%;
                    line-height:38.5px;
                    border-radius:5.5px;
                    background-color:#454545;
                    font-size:var(--body-form-text); 
                    color:#fff;
                    text-align:center;
                    &:hover{
                        background:#fff;
                        color:#000;
                    }
                }
            }
        }
        .show-duration-box{
            height:20.5px;width:90%;
            margin:0 auto;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .show-duration{
                width: 100%;
                height: 4.5px;
                cursor:pointer;
                background: #fff;
                position:relative;
                .show-buffer-bar{
                    width:0%;height:100%;
                    position:absolute;
                    top:0;left:0;
                    background:#454545;
                    z-index:1.5;
                }
                .show-progress-bar{
                    width:0%;height:100%;
                    position:absolute;
                    top:0;left:0;
                    z-index:2;
                    background-color:${props=>props.theme.emphasize};
                }
            }
        }
    }
    .music-upload-form-box{
        width:100%;height:calc(100% - 85.5px);
        padding:5.5px;
        box-sizing:border-box;
        .music-upload-form{
            width:100%;height:100%;
            form{
                width:100%;height:100%;
                display:flex;
                flex-direction:row;
                align-items:center;
                justify-content:space-between;
                .upload-image-form-box{
                    width:180px;height:180px;
                    overflow:hidden;
                    border-radius:10.5px;
                    cursor:pointer;
                    input[type="file"]{
                        display:none;
                    }
                    label{
                        display:block;
                        width:100%;height:100%;
                        >img{
                            display: block;
                            height: 100%;
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .upload-text-info-box{
                    display:flex;
                    flex-direction:row;
                    flex-wrap:wrap;
                    width:calc(100% - 185px);height:100%;
                    >div{
                        display:flex;flex-direction:row;
                        align-items:center;
                        justify-content:flex-start;
                        height:29.8%;
                        
                        input{
                            display:block;
                            width:95.5%;height:72.5%;
                            box-sizing:border-box;
                            padding:5.5px;
                            border-radius:10.5px;
                            border:none;
                            font-size:var(--body-form-text);
                            background:${props=>props.theme.bodyBgColor};
                            color:#fff;
                            &:focus{
                                background:#fff;
                                color:${props=>props.theme.bodyBgColor};
                            }
                        }
                        >select{
                            display:block;
                            width:100%;height:72.5%;
                            padding:5px; 
                            box-sizing:border-box;
                            border-radius: 10.5px;
                            border: none;
                            background:${props=>props.theme.bodyBgColor};
                            color:#fff;
                            >option{
                                display:block;
                                width:100%;height:100%;
                                font-size:var(--body-form-text);
                                background:${props=>props.theme.bodyBgColor};
                                color:#454545;
                            }
                        }
                        &.upload-text-half{
                            width:50%;
                        }
                        &.upload-text-full{
                            width:100%;
                        }
                        &.right{
                            justify-content:flex-end;
                        }
                    }
                    
                }
            }
        }
    }
    @media screen and (max-width:940px){
        height:185px;
        .mp3-player-box{
            height:65.5px;
            .mp3-player{
                height:calc(100% - 13px);
                .start-button-box{
                    width: 28.5px;
                    height: 28.5px;
                    line-height: 28.5px;
                }
                .add-delete-button-box{
                    height:auto;
                    .volume-controller-box{
                        .volume-controller-icon{
                            width: 28.5px;
                            height: 28.5px;
                            line-height: 28.5px;
                        }
                        .volume-controller{
                            height: 28.5px;
                        }
                    }
                    .add-button{
                        width: 28.5px;
                        height: 28.5px;
                        line-height: 28.5px;
                    }
                    .delete-button{
                        width: 28.5px;
                        height: 28.5px;
                        line-height: 28.5px;
                    }
                }
            }
            .show-duration-box{
                height: 12.5px;
            }
        }
        .music-upload-form-box{
            height:calc(100% - 65.5px);
            .music-upload-form{
                width: 95%;margin: 0 auto;
                form{
                    justify-content: space-around;
                    .upload-image-form-box{
                        width:110px;height:110px;
                    }
                    .upload-text-info-box{
                        >div{
                            input{
                                border-radius:4.5px;
                                font-size:var(--tablet-body-text);
                            }
                            >select{
                                border-radius:4.5px;
                                font-size:var(--tablet-body-text);
                                >option{
                                    font-size:var(--tablet-body-text);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width:510px){
        .music-upload-form-box{
            .music-upload-form{
                form{
                    width:100%;height:100%;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    justify-content:space-between;
                    .upload-image-form-box{
                        width:100px;height:100px;
                    }
                    .upload-text-info-box{
                        width:calc(100% - 125px);
                    }
                }
            }
        }
        
    }
`;

const convertIntoBase64 = (url)=>{
    return new Promise((resolve,reject)=>{
        const tempImg = new Image();
        tempImg.src = url;
        tempImg.onload = ()=>{
            try{
                let canvas = document.createElement('canvas');
                canvas.width = 180;canvas.height=180;
                canvas.getContext('2d').drawImage(tempImg,0,0,canvas.width,canvas.height);
                resolve(canvas.toDataURL('image/png'));
            }catch(err){
                throw new Error("이미지 업로드 오류!");
            }
        }
    })
}

const convertIntoFile = (bs64)=>{
    const [_,dataType,base64Data] = bs64.split(/[:;]+/);
    const realData = base64Data.split('base64,');
    const realDataIntoByte = window.atob(realData[1]);
    const byteArr = Array.from({length:realDataIntoByte.length},()=>0);
    let n = realDataIntoByte.length;
    for(let i =0 ;i<n; i++){
        byteArr.push(realDataIntoByte.charCodeAt(i));
    }
    return new Blob([new Uint8Array(byteArr)],{'type':dataType});
}

const SingleMusicComponent = observer(({idx,musicInfo})=>{
    const [Genre,setGenre] = useState(GenreList.POP);
    const [playing,setPlaying] = useState(false);
    const [mute,setMute] = useState(false);
    const [duration,setDuration] = useState(false);
    const [volume,setVolume] = useState(30);
    const [minute,setMinute] = useState(0);
    const [second,setSecond] = useState(0);
    const [audioBuffer,setAudioBuffer] = useState(null);
    const [albumCover,setAlbumCover] = useState(musicCoverSample);
    const [title,setTitle] = useState('');
    const [singer,setSinger] = useState('');
    const [albumName,setAlbumName] = useState('');
    const [showVolumeController,setShowVolumeController]=useState(false);
    const audioRef = useRef(null);
    const durationControllerRef = useRef(null);
    const progressContollerRef = useRef(null);
    const bufferedComponentRef = useRef(null);
    const {deleteSingleMusicToBeUploaded}=UploadStore;

    const onPlayAudio = useCallback((evt)=>{
        if(audioRef.current){
            setPlaying(true);
        }
    },[audioRef.current]); 
    
    const onPauseAudio = useCallback((evt)=>{
        if(audioRef.current){
            setPlaying(false);
        }
    },[audioRef.current]);

    const onAudioEnd = useCallback((evt)=>{
        if(audioRef.current){
            setPlaying(false);
            setAudioBuffer(null);
            setMute(false);
            setDuration(null);
            setVolume(30);
            setMinute(0);
            setSecond(0);
        }
    },[audioRef.current]);

    const onTimeUpdate = useCallback(()=>{
        if(audioRef.current){
            if(!audioRef.current.end){
                const {
                    currentTime:currentRunTime,
                    duration:musicDuration
                }= audioRef.current;
                setSecond(parseInt(currentRunTime%60));
                setMinute(parseInt(currentRunTime/60));
                if(durationControllerRef.current&&progressContollerRef.current){
                    const ratio = parseFloat(currentRunTime/musicDuration);
                    const style = document.defaultView.getComputedStyle(durationControllerRef.current);
                    const {width:durationConWidth} = style;
                    progressContollerRef.current.style.width 
                        = isNaN(ratio)?
                        `${0.0}%`
                        :`${(Math.floor(parseFloat(durationConWidth)*ratio*100)/100)}px`;
                }
            }
        }
    },[audioRef.current,durationControllerRef.current,progressContollerRef.current]);
    
    const onCanPlay = useCallback(()=>{
        if(audioRef.current){
            playing&&audioRef.current.play();
        }
    },[audioRef.current,playing]);

    const onLoadMetaData = useCallback(()=>{
        if(audioRef.current){
            const sec = parseInt(audioRef.current.duration%60);
            const min = parseInt(audioRef.current.duration/60)
            setDuration(`${min} : ${sec}`);
        }
    },[audioRef.current]);

    const onSeeked = useCallback(()=>{
        if(audioRef.current&&bufferedComponentRef.current){
            console.log(audioRef.current.readyState);
            if(audioRef.current.readyState>1){
                const {length} = audioRef.current.buffered;
                /* console.log(`start ${0} : ${audioRef.current.buffered.start(0)}`);
                console.log(`start ${0} : ${audioRef.current.buffered.end(0)}`);
                console.log(`length : ${length}`); */
                if(length<=1){
                    const {duration} = audioRef.current;
                    const ratio = Math.floor(parseFloat(audioRef.current.buffered.end(0)/duration)*100)/100;
                    bufferedComponentRef.current.style.width = `${ratio*100}%`;
                }
            }
        }
    },[audioRef.current,bufferedComponentRef.current,audioRef.current?.readyState])

    useEffect(()=>{
        audioRef.current = new Audio(musicInfo.url);
        audioRef.current.volume = parseFloat(Math.floor((volume/100)*100)/100);
        audioRef.current.addEventListener('play',onPlayAudio);
        audioRef.current.addEventListener('pause',onPauseAudio);
        audioRef.current.addEventListener('end',onAudioEnd);
        audioRef.current.addEventListener('timeupdate',onTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata',onLoadMetaData)
        audioRef.current.addEventListener('canplay',onCanPlay);
        audioRef.current.addEventListener('progress',onSeeked);
        audioRef.current.load();

        return ()=>{
            audioRef.current.pause();
            audioRef.current.removeEventListener('play',onPlayAudio);
            audioRef.current.removeEventListener('pause',onPauseAudio);
            audioRef.current.removeEventListener('end',onAudioEnd);
            audioRef.current.removeEventListener('timeupdate',onTimeUpdate);
            audioRef.current.removeEventListener('loadedmetadata',onLoadMetaData)
            audioRef.current.removeEventListener('canplay',onCanPlay);
            audioRef.current.removeEventListener('progress',onSeeked);
            setPlaying(false);
            setAudioBuffer(null);
            setMute(false);
            setDuration(null);
            setVolume(30);
            setMinute(0);
            setSecond(0);
            audioRef.current=null;
        }
    },[]);

    const onClickPlayButton = useCallback((evt)=>{
        console.log(audioRef.current.currentSrc);
        if(audioRef.current){
            if(playing&&!audioRef.current.paused){
                audioRef.current.pause();
            }else if(!playing&&audioRef.current.paused){
                audioRef.current.play();
            }else if(!playing&&audioRef.current.ended){
                audioRef.current.load();
                setPlaying(true);
            }
        }
    },[audioRef.current,playing])

    const onSubmitUploadMusicToServer = useCallback(async(evt)=>{
        try{
            if(title===''||singer===''||albumName===''){
                throw new Error('form의 내용을 모두 채워 주세요!');
            }else{
                let imageFile;
                if(albumCover!==musicCoverSample){
                    imageFile = convertIntoFile(albumCover);
                }else{
                    const bs64 = await convertIntoBase64(albumCover);
                    imageFile = convertIntoFile(bs64)
                }
                const formData = new FormData();
                formData.append("album-image-file",imageFile);
                formData.append("Genre",Genre);
                formData.append("singer",singer);
                formData.append("albumName",albumName);
            }
        }catch(err){
            window.alert(err.message);
        }
    },[
        Genre,title,singer,
        albumName,albumCover
    ]);

    const onChangeVolumeOnComponent = useCallback((evt,value)=>{
        if(audioRef.current){
            console.log(parseFloat(Math.floor((value/100)*100)/100));
            setVolume(value);
            audioRef.current.volume = parseFloat(Math.floor((value/100)*100)/100);
        }
    },[audioRef.current])
    
    const handleGenreChange = useCallback((evt)=>{
        setGenre(evt.target.value);
    },[]);

    const onClickDuration = useCallback((evt)=>{
        if(!durationControllerRef.current||!audioRef.current)return false;
        const {currentTarget} = evt;
        const {width} = document.defaultView.getComputedStyle(currentTarget);
        const thisWidth = parseFloat(width);
        const {nativeEvent:{offsetX}} = evt;
        if(offsetX<0){return false;}
        const ratio = parseFloat(offsetX/thisWidth);
        const {duration} = audioRef.current;
        audioRef.current.currentTime = parseFloat(Math.floor(duration*ratio*100)/100);

    },[audioRef.current,durationControllerRef.current]);

    const onClickShowVolumeController = useCallback((evt)=>{
        setShowVolumeController(prev=>!prev);
    },[]);

    const onChangeAlbumCoverImage = useCallback((evt)=>{
        const {target:{files}}=evt;
        const {type}=files[0];
        console.log(type);
        if(type.match('image/*')){
            let fileReader = new FileReader();
            fileReader.onload = (e)=>{
                setAlbumCover(e.target.result);
            }
            fileReader.readAsDataURL(files[0])
        }
    },[])

    const onClickDeleteFromList = useCallback((evt)=>{
        const {currentTarget:{dataset:{key}}}=evt;
        deleteSingleMusicToBeUploaded(key);
    },[]);

    return (
        <UploadedMusicBox>
            <div className="mp3-player-box">
                <div className="mp3-player">
                    <div className="start-button-box">
                        <p className="play-button" onClick={onClickPlayButton}>
                            {
                                !playing?
                                (<FontAwesomeIcon icon={faPlay}/>)
                                :(<FontAwesomeIcon icon={faStop}/>)
                            }
                        </p>
                    </div>
                    <div className="add-delete-button-box">
                        <div className={
                                    `${showVolumeController?"volume-controller-box open":"volume-controller-box"}`} >
                            <p className={`volume-controller-icon`} 
                                onClick={onClickShowVolumeController}>
                                <FontAwesomeIcon icon={faVolumeLow}/>
                            </p>
                            <p className="volume-controller">
                                <Slider
                                    value={volume}
                                    onChange={onChangeVolumeOnComponent}
                                />
                            </p>
                        </div>
                        <button onClick={onSubmitUploadMusicToServer} className="add-button">
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                        <p onClick={onClickDeleteFromList} className="delete-button" data-key={musicInfo.key}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </p>
                    </div>
                </div>
                <div className="show-duration-box">
                    <div className="show-duration" ref={durationControllerRef} onClick={onClickDuration}>
                        <p className="show-progress-bar" ref={progressContollerRef}></p>
                        <p className="show-buffer-bar" ref={bufferedComponentRef}></p>
                    </div>
                </div>
            </div>
            <div className="music-upload-form-box">
                <div className="music-upload-form">
                    <form>
                        <div className="upload-image-form-box">
                            <input onChange={onChangeAlbumCoverImage} id={`idx_${idx}`} accept="image/*" type="file"/>
                            <label htmlFor={`idx_${idx}`}>
                                <img src={albumCover?albumCover:musicCoverSample} alt="music-cover-img"/>
                            </label>
                        </div>
                        <div className="upload-text-info-box">
                            <div className="upload-text-half">
                                <input type="text" 
                                    onChange={(evt)=>setSinger(evt.currentTarget.value)} 
                                    value={singer} 
                                    placeholder="artist name"
                                />
                            </div>
                            <div className="upload-text-half right">
                                <input type="text" 
                                    onChange={(evt)=>setTitle(evt.target.value)}
                                    value={title}
                                    placeholder="name of song"/>
                            </div>
                            <div className="upload-text-full">
                                <select 
                                    className="select"
                                    value={Genre}
                                    onChange={handleGenreChange}
                                >
                                    {
                                        Object.keys(GenreList).map(v=>(
                                        <option key={v} value={GenreList[v]}>{GenreList[v]}</option>
                                    ))} 
                                </select>
                            </div>
                            <div className="upload-text-half">
                                <input type="text" readOnly value={`${musicInfo.size}`} placeholder="artist name"/>
                            </div>
                            <div className="upload-text-half right">
                                <input
                                    value={albumName}
                                    onChange={(evt)=>setAlbumName(evt.target.value)}
                                    type="text" 
                                    placeholder="앨범명을 입력해 주세요" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </UploadedMusicBox>
    )
})

export default SingleMusicComponent;