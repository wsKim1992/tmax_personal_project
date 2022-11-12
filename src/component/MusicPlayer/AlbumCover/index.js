import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react-lite';
//import sampleAlbumCoverImage from '../../../static/image/sample/album_cover.jpg';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
 */
import MusicPlayerStore from '../../../store/MusicPlayerStore';
import MobileHeader from '../../MobileHeader';
import Canvas from './Canvas';

const CDRotation = keyframes`
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
`;

const AlbumCoverBox = styled.div`
    width:100%;height:100%;
    position:relative;
    .music-info-box{
        width:100%;height:100%;
        position:relative;
        .music-box{
            width:100%;height:100%;
            background-image:url(${props=>props.albumImage});
            background-size:cover;
            -webkit-filter:blur(5px);
            -moz-filter:blur(5px);
            -o-filter:blur(5px);
            filter:blur(5px);
        }
        .cd-component-container{
            position:absolute;
            top:0;left:0; 
            width:100%;height:100%;
            z-index:2;
            .cd-component-wrapper{
                margin: 5% auto;
                width:63.3%;
                .cd-component-padding{
                    position:relative;
                    padding-top:100%;
                    overflow:hidden;
                    .cd-componenet{
                        box-shadow: 0px 0px 1.5px #000;
                        position:absolute;
                        top:0;left:0;right:0;bottom:0;
                        width:100%;height:100%;
                        background:#fff;
                        border-radius:100%;
                        overflow:hidden;
                        >img{
                            display:block;
                            width:100%;height:100%;
                            object-fit:cover;
                        }
                        &:after{
                            content:'';
                            width:15.5%;height:15.5%;
                            border-radius:100%;
                            position:absolute;
                            top:50%;left:50%;
                            transform:translate(-50%, -50%);
                            background-color:${props => props.theme.bodyBgColor};
                        }
                        animation-name: ${props=>props.isPlay?CDRotation:''};
                        animation-duration: 1.6s;
                        animation-iteration-count: infinite;
                        animation-timing-function:linear;
                        .canvas-wrapper{
                            position:absolute;
                            top:0%;left:0;
                            width:100%;height:100%;
                        }
                    }
                }
            }
        }
        .music-info-wrapper{
            width:100%; height:auto;
            .music-title-text{
                width:100%; height:auto;
                text-align:center;
                white-space:pre-wrap;
                color:#fff;
                font-size:var(--body-music-info);
                text-shadow: 0px 0px 5.5px #000;
            }
            .music-info-text{
                width:100%; height:auto;
                text-align:center;
                white-space:pre-wrap;
                color:#fff;
                font-size:var(--body-music-info);
                text-shadow: 0px 0px 5.5px #000;
                margin-top:15.5px;
            }
        }
    }

    @media screen and (max-width:770px){
        .music-info-box{
            width:100%;height:100%;
            position:relative;
            .cd-component-container{
                position:absolute;
                top:0;left:0; 
                width:100%;height:100%;
                z-index:2;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
            }
        }
    }
`;

const AlbumCover = observer(() => {
    const {musicPlayingNow,audioObj,setIsPlaying,isPlaying} = MusicPlayerStore;

    useEffect(()=>{
        if(audioObj){
            audioObj.paused?setIsPlaying(false):setIsPlaying(true);
        }
    },[audioObj,audioObj?.paused]);

    /* useEffect(()=>{
        console.log(isPlay);
    },[isPlaying]) */

    return (
        <AlbumCoverBox 
            albumImage={
                musicPlayingNow?
                `/assets/albumImage/${musicPlayingNow.albumCoverUrl}`:
                'linear-gradient(215deg,rgba(0,0,0,0),#1D1D1D)'
            } 
            isPlay={isPlaying} 
        >
            <Canvas/>
            <div className="music-info-box">
                <div className='music-box'>
                </div>
                <div className='cd-component-container'>
                    <MobileHeader/>
                    <div className='cd-component-wrapper'>
                        <div className='cd-component-padding'>
                        {
                             musicPlayingNow&&
                            (
                                
                                <div className='cd-componenet'>
                                    {
                                        <img src={`/assets/albumImage/${musicPlayingNow.albumCoverUrl}`} alt="album-cover" />
                                    }
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div className='music-info-wrapper'>
                        <div className='music-title-text'>
                            {
                                musicPlayingNow&&
                                musicPlayingNow.title
                            }
                        </div>
                        <div className='music-info-text'>
                            {
                                musicPlayingNow&&
                                musicPlayingNow.artist
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AlbumCoverBox>
    )
})

export default AlbumCover;
