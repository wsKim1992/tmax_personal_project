import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay, faPause, faBackwardFast,
    faForwardFast, faVolumeHigh,
    faVolumeLow, faVolumeMute,
    faRepeat, faShuffle, faListUl
} from '@fortawesome/free-solid-svg-icons';
import sampleAlbumCoverImage from '../../../static/image/sample/album_cover.jpg';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { observer } from "mobx-react-lite";
import MusicPlayerStore from '../../../store/MusicPlayerStore';

const AudioControllerBox = styled.div`
    width:100%;height:100%;
    display:flex;flex-direction:row;
    align-items:center;
    user-select:none;
    justify-content:space-between;
    position:relative;
    .mobile-other-func-box{
        display:none;
    }
    .showPlaytime-component-mobile{
        display:none;
    }
    .showPlaytime-component{
        width:100%;
        height:5px;
        position:absolute;
        top:-5%;
        left:0%;
        background-color:#454545;
        transition:0.65s top,height;
        &:hover{
            top:-8.5px;
            height:8.5px;
        }
        .time-lapsed{
            position:absolute;
            top:0;left:0;
            z-index:2;
            background-color:${props => props.theme.emphasize};
            width:0%;height:100%;
        }
        .buffered{
            position:absolute;
            top:0;left:0;
            z-index:2.5;
            width:0%;height:100%;
            background-color:#fff;
        }
        cursor:pointer;
    }
    .playbutton-box{
        height:75.5px;width:auto;
        display: flex;
        .playbutton-button-list{
            height:100%;width:auto;
            display:flex;
            flex-direction:row;
            align-items:center;
            .playbutton-button{
                width:55.5px;height:55.5px;
                font-size:var(--body-icon);
                color:#fff;
                margin-left:12.5px;
                line-height: 55.5px;
                text-align: center;
                cursor:pointer;
                &:hover{
                    color:${props => props.theme.emphasize};
                }
                &.only-mobile{
                    display:none;
                }
            }
        }
        .playtime-duration-box{
            width:auto;height:100%;
            display: flex;
            align-items: center;
            .playtime-duration{
                user-select:none;
                height:55.5px;
                font-size:var(--body-text);
                color:#fff;
                margin:0 12.5px;
                line-height:55.5px;
            }
        }
    }
    .music-info-box{
        width:auto;height:100%;
        display:flex;
        .music-thumbnail{
            width:75.5px;height:75.5px;
            display:flex;
            align-items:center;
            justify-content:center;
            >img{
                display:block;
                width:55.5px;height:55.5px;
                object-fit:cover;
            }
        }
        .music-text-info{
            width:auto;height:75.5px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content: center;
            max-width:310px;
            overflow:hidden;
            >p{
                width:auto;
                padding:5.5px;
                font-size:var(--body-text);
                white-space:nowrap;
                text-overflow:ellipsis;
                &.music-title{
                    color:#fff;
                }
                &.music-other-info{
                    color:#fff;
                }
            }
        }
    }
    .manipulation-box{
        width:auto;height:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        .manipulation-button{
            height:55.5px;
            width:55.5px;
            text-align:center;
            line-height:55.5px;
            font-size:var(--body-icon);
            color:#fff;
            cursor:pointer;
            &:hover{
                color:${props => props.theme.emphasize};
            }
            &.on{
                color:${props => props.theme.emphasize};
            }
            position:relative;
            .volume-controller-box{
                position:absolute;
                top:-265%;left:50%;
                background-color: #fff;
                border-radius: 8.5px;
                padding: 10px;
                height: 130px;
                box-sizing: border-box;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transform:translateX(-50%);
            }
        }
    }
    @media screen and (max-width:770px){
        flex-direction: column;
        justify-content:center;
        .showPlaytime-component-mobile{
            width:89.5%;height:25.5px;
            margin:0 auto;
        }
        .showPlaytime-component{
            top:0%;
        }
        .mobile-other-func-box{
            display:block;
            width:100%;
            height:35px;
            .other-func-btn{
                width:100%;height:100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .show-list-box-button-box{
                    width:35px;height:35px;
                    border-radius:4.5px;
                    overflow:hidden;
                    .show-list-box-button{
                        width:100%;height:100%;
                        font-size:var(--body-icon);
                        line-height:35px;
                        text-align:center;
                        color:#fff;
                    }
                }
                .volumn-controller-box{
                    display:flex;
                    width:calc(100% - 105px);height:100%;
                    .volumn-button{
                        width:35px;height:35px;
                        border-radius:4.5px;
                        overflow:hidden;
                        font-size:var(--body-icon);
                        line-height:35px;
                        text-align:center;
                        color:#fff;
                    }
                    .volumn-controller-box{
                        width:65%;height:100%;
                        margin-left:3.5px;
                        display:flex;
                        align-items:center;
                        >span{
                            width:100%;
                            padding:0;
                        }
                    }
                }
            }
        }
        .playbutton-box{
            height:75.5px;width:100%;
            display: flex;
            .playbutton-button-list{
                height:100%;width:100%;
                display:flex;
                flex-direction:row;
                align-items:center;
                .playbutton-button{
                    width:55.5px;height:55.5px;
                    font-size:var(--body-icon);
                    color:#fff;
                    margin-left:12.5px;
                    line-height: 55.5px;
                    text-align: center;
                    cursor:pointer;
                    width: 100%;
                    justify-content: center;
                    &:hover{
                        color:${props => props.theme.emphasize};
                    }
                    &.only-mobile{
                        display:block;
                    }
                }
            }
        }
        .music-info-box{
            display:none;
        }
        .manipulation-box{
            display:none;
        }
    }
`;

const AudioController = observer(() => {
    const [toggleVolumeController, setToggleVolumeController] = useState(false);
    const {
        isShuffle, audioObj, isRepeat,
        musicPlayingNow, isPlaying,showMyPlayList,
        setIsPlaying, setShuffle,
        setNextOrPrevious, setIsRepeat,
        setShowMyPlayList
    } = MusicPlayerStore;
    const [duration, setDuration] = useState(`00 : 00`);
    const [timeNow, setTimeNow] = useState(`00 : 00`);
    const [volume, setVolume] = useState(30);
    const durationControllerRef = useRef(null);
    const progressContollerRef = useRef(null);
    const bufferedComponentRef = useRef(null);

    const onPlay = useCallback(() => {
        if (audioObj) {
            setIsPlaying(true);
        }
    }, [audioObj])

    const onPauseAudio = useCallback(() => {
        if (audioObj) {
            setIsPlaying(false);
        }
    }, [audioObj]);

    const onCanPlay = useCallback((evt) => {
        if (audioObj) {
            isPlaying && audioObj.play();
        }
    }, [audioObj, isPlaying])

    const onLoadMetaData = useCallback(() => {
        if (audioObj) {
            const { duration } = audioObj;
            let sec = parseInt(duration % 60);
            let min = parseInt(duration / 60);
            setDuration(`${min < 10 ? `0${min}` : `${min}`} : ${sec < 10 ? `0${sec}` : `${sec}`}`);
        }
    }, [audioObj]);

    const onLoadedData = useCallback(() => {
        if (audioObj && !isPlaying) {
            setIsPlaying(true);
            audioObj.play();
        }
    }, [audioObj]);

    const onAudioEnd = useCallback(() => {
        if (audioObj) {
            setNextOrPrevious('next');
            setIsPlaying(false);
            setTimeNow(`00 : 00`);
        }
    }, [audioObj]);

    const onTimeUPdate = useCallback(() => {
        if (audioObj) {
            const { currentTime, duration } = audioObj;
            let sec = parseInt(currentTime % 60);
            let min = parseInt(currentTime / 60);
            setTimeNow(`${min < 10 ? `0${min}` : `${min}`} : ${sec < 10 ? `0${sec}` : `${sec}`}`);
            if (durationControllerRef.current && progressContollerRef.current) {
                const ratio = parseFloat(Math.floor((currentTime / duration) * 100) / 100);
                const style = document.defaultView.getComputedStyle(durationControllerRef.current);
                const { width: durationWidth } = style;
                progressContollerRef.current.style.width
                    = isNaN(ratio) ?
                        `${0.0}%`
                        : `${(Math.floor(parseFloat(durationWidth) * ratio * 100) / 100)}px`
            }
        }
    }, [audioObj]);

    useEffect(() => {
        if (audioObj) {
            switch (audioObj.readyState) {
                case 0: {
                    break;
                }
                case 1: {
                    break;
                }
                default: {
                    const { length } = audioObj.buffered;
                    const { duration } = audioObj;
                    const ratio = Math.floor(parseFloat(audioObj.buffered.end(length - 1) / duration) * 100) / 100;
                    bufferedComponentRef.current.style.width = `${ratio * 100}%`
                    break;
                }
            }
        }
    }, [
        audioObj, bufferedComponentRef.current,
        audioObj?.readyState, audioObj?.buffered
    ]);

    const onChangeVolumeOnComponent = useCallback((evt, value) => {
        if (audioObj) {
            setVolume(value);
            audioObj.volume = parseFloat(Math.floor((value / 100) * 100) / 100);
        }
    }, [audioObj]);

    useEffect(() => {
        if (audioObj) {
            audioObj.addEventListener("play", onPlay);
            audioObj.addEventListener("pause", onPauseAudio);
            audioObj.addEventListener("loadedmetadata", onLoadMetaData);
            audioObj.addEventListener("loadeddata", onLoadedData);
            audioObj.addEventListener("canplay", onCanPlay);
            audioObj.addEventListener("ended", onAudioEnd);
            audioObj.addEventListener("timeupdate", onTimeUPdate);
            audioObj.volume = parseFloat(Math.floor((volume / 100) * 100) / 100);
            audioObj.load();
            return () => {
                audioObj.removeEventListener("play", onPlay);
                audioObj.removeEventListener("pause", onPauseAudio);
                audioObj.removeEventListener("loadedmetadata", onLoadMetaData);
                audioObj.removeEventListener("loadeddata", onLoadedData);
                audioObj.removeEventListener("canplay", onCanPlay);
                audioObj.removeEventListener("ended", onAudioEnd);
                audioObj.removeEventListener("timeupdate", onTimeUPdate);
                audioObj.pause();
                setDuration('00 : 00');
                //setAudioSrc(null);
                setIsPlaying(false);
            }
        }
    }, [audioObj]);

    const onClickVolumeIcon = useCallback((evt) => {
        evt.stopPropagation();
        setToggleVolumeController(prev => !prev);
    }, []);

    const onClickPlayButton = useCallback((evt) => {
        if (audioObj) {
            if (isPlaying && !audioObj.paused) {
                audioObj.pause();
            } else if (!isPlaying && audioObj.paused) {
                audioObj.play();
            }/* else if(!isPlaying&&audioObj.ended){
                audioObj.load();
                setIsPlaying(true);
            } */
        }
    }, [audioObj, isPlaying]);

    const onClickDurationComponent = useCallback((evt) => {
        if (audioObj) {
            console.log(audioObj.buffered);
            const { currentTarget } = evt;
            const { nativeEvent: { offsetX } } = evt;
            const durationBarStyle = document.defaultView.getComputedStyle(currentTarget);
            const { width: durationWidth } = durationBarStyle;
            const { duration } = audioObj;
            const ratio = parseFloat(offsetX / parseFloat(durationWidth));
            audioObj.currentTime = Math.floor(100 * (duration * ratio)) / 100;
        }
    }, [audioObj]);

    const onClickNextOrPrevious = useCallback((evt) => {
        const { currentTarget: { dataset: { func } } } = evt;
        setNextOrPrevious(func, false);
    }, []);

    return (
        <AudioControllerBox>
            <div onClick={onClickDurationComponent} className="showPlaytime-component" ref={durationControllerRef}>
                <div className="time-lapsed" ref={progressContollerRef}>
                </div>
                <div className="buffered" ref={bufferedComponentRef}>
                </div>
            </div>
            <div className="mobile-other-func-box">
                <div className="other-func-btn" data-func="volume">
                    <div className="volumn-controller-box">
                        <p className="volumn-button">
                            {
                                volume > 50 ? <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeHigh} /> :
                                    (
                                        volume <= 0 ? <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeMute} /> :
                                            <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeLow} />
                                    )
                            }
                        </p>
                        <p className="volumn-controller-box">
                            <Slider
                                value={volume}
                                valueLabelDisplay="auto"
                                onChange={onChangeVolumeOnComponent}
                            />
                        </p>
                    </div>
                    <div className="show-list-box-button-box">
                        <p className="show-list-box-button" onClick={()=>setShowMyPlayList()}>
                            <FontAwesomeIcon icon={faListUl} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="playbutton-box">
                <div className="playbutton-button-list">
                    <p className="playbutton-button only-mobile" data-func="shuffle">
                        <FontAwesomeIcon icon={faShuffle} />
                    </p>
                    <p className="playbutton-button" onClick={onClickNextOrPrevious} data-func="prev">
                        <FontAwesomeIcon icon={faBackwardFast} />
                    </p>
                    <p onClick={onClickPlayButton} className="playbutton-button" data-func="toggle-play">
                        {
                            isPlaying ?
                                <FontAwesomeIcon icon={faPause} /> :
                                <FontAwesomeIcon icon={faPlay} />
                        }
                    </p>
                    <p className="playbutton-button" onClick={onClickNextOrPrevious} data-func="next">
                        <FontAwesomeIcon icon={faForwardFast} />
                    </p>
                    <p className="playbutton-button only-mobile" data-func="repeat">
                        <FontAwesomeIcon icon={faRepeat} />
                    </p>
                </div>
                <div className="playtime-duration-box">
                    <p className="playtime-duration">
                        {musicPlayingNow && `${timeNow} / ${duration}`}
                    </p>
                </div>
            </div>
            <div className="music-info-box">
                <p className="music-thumbnail">
                    {
                        musicPlayingNow &&
                        <img src={`/assets/albumImage/${musicPlayingNow.albumCoverUrl}`} alt="album-cover-page" />
                    }
                </p>
                <div className="music-text-info">
                    <p className="music-title">
                        {musicPlayingNow && musicPlayingNow.title}
                    </p>
                    <p className="music-other-info">
                        {musicPlayingNow && musicPlayingNow.artist}
                    </p>
                </div>
            </div>
            <div className="manipulation-box">
                <div className="manipulation-button" data-func="volume">
                    {
                        volume > 50 ? <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeHigh} /> :
                            (
                                volume <= 0 ? <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeMute} /> :
                                    <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeLow} />
                            )
                    }
                    {
                        toggleVolumeController &&
                        (
                            <Box className="volume-controller-box" sx={{ height: 300 }}>
                                <Slider
                                    value={volume}
                                    sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                    orientation="vertical"
                                    valueLabelDisplay="auto"
                                    onChange={onChangeVolumeOnComponent}
                                />
                            </Box>
                        )
                    }
                </div>
                <div onClick={() => setIsRepeat()} className={isRepeat ? `manipulation-button on` : `manipulation-button`} data-func="repeat">
                    <FontAwesomeIcon icon={faRepeat} />
                </div>
                <div onClick={() => setShuffle()} className={isShuffle ? `manipulation-button on` : `manipulation-button`} data-func="random-repeat">
                    <FontAwesomeIcon icon={faShuffle} />
                </div>
            </div>
        </AudioControllerBox>
    )
})

export default AudioController;
