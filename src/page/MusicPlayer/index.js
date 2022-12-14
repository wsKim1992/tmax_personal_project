import React, { useEffect,useRef,useCallback } from 'react';
import styled from 'styled-components';
import AudioController from '../../component/MusicPlayer/AudioController';
import AlbumCover from '../../component/MusicPlayer/AlbumCover';
import PlayListComponent from '../../component/MusicPlayer/PlayListComponent';
import { observer } from 'mobx-react-lite';
import MusicPlayerStore from '../../store/MusicPlayerStore';
/* import SampleMusic from '../../static/sample_music/Jim Yosef - Speed.mp3';
import SampleAlbumCover from '../../static/image/sample/album_cover.jpg'; */
import LogInAOC from '../../component/LogIn/hoc/LogInAOC';
import GetMusicList from '../../react-query/getMusicList';

const MusicPlayerContainer = styled.div`
    width:100%;height:100%;
`;

const MusicPlayerWrapper = styled.div`
    width:100%;height:100%;
    
    .audio-controller-container{
        width:100%;height:95.5px;
        background-color:${props => props.theme.headerBgColor};
    }
    .main-contents-container{
        width:100%;
        height: calc(100% - 95.5px);
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        justify-content:space-evenly;
        .album-cover-container{
            width:668px; height:668px;
            .album-cover-wrapper{
                width:100%;height:100%;
            }
        }
        .playlist-container{
            width:18.5vw;height:calc(100% - 95.5px);
            overflow:auto;
            &::-webkit-scrollbar-track{
                width:10px;
            }
            &::-webkit-scrollbar {
                width: 10px;
            }
            &::-webkit-scrollbar-track {
                background-color: #000;
                border-radius:4.5px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius:4.5px;
                background:#454545;
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            }
        }
    }
    
    @media screen and (max-width:1200px){
        .main-contents-container{
            .album-cover-container{
                width:478.8px;height:478.8px;
            }
            .playlist-container{
                width:28.5vw;height:calc(100% - 95.5px);
                overflow:auto;
            }
        }
        .audio-controller-container{
            width:100%;height:95.5px;
        }
    }

    @media screen and (max-width:770px){
        position:relative;
        .main-contents-container{
            height:74vh;
            .album-cover-container{
                width:100%;height:100%;
            }
            .playlist-container{
                position:absolute;
                top:10%;right:10px;
                width:255px;
                background: #000;
                z-index: 3;
                height:auto;
                max-height: 350px;
            }
        }
        .audio-controller-container{
            height:calc(100% - 74vh);
            background-color:${props => props.theme.headerBgColor};
            .audio-controller-wrapper{
                height:100%;
            }
        }
    }
`;



const MusicPlayer = observer(() => {
    const {setAudioSrc} = MusicPlayerStore;
    const playlistContainerRef = useRef(null);
    const {
        MusicListData,
        fetchNextPage
    } = GetMusicList();

    useEffect(()=>{
        setAudioSrc(null);
    },[])

    const scrollEventFunction=useCallback((event)=>{
        const style = document.defaultView.getComputedStyle(playlistContainerRef.current)
        const {scrollTop,scrollHeight} = playlistContainerRef.current;
        if(Math.ceil(scrollTop+parseFloat(style.height))>=scrollHeight){
            console.log('fetchNextQuery');
            fetchNextPage();
        }
    },[])

    useEffect(()=>{
        fetchNextPage();
        playlistContainerRef.current.addEventListener('scroll',scrollEventFunction);
    },[]);

    return (
        <MusicPlayerContainer>
            <MusicPlayerWrapper>
                <div className='main-contents-container'>
                    <div className='album-cover-container'>
                        <div className='album-cover-wrapper'>
                            <AlbumCover />
                        </div>
                    </div>
                    <div ref={playlistContainerRef} className='playlist-container'>
                        <div className='playlist-wrapper'>
                            <PlayListComponent />
                        </div>
                    </div>
                </div>
                <div className='audio-controller-container'>
                    <div className='audio-controller-wrapper'>
                        <AudioController />
                    </div>
                </div>
            </MusicPlayerWrapper>
        </MusicPlayerContainer>

    )
})

export default LogInAOC(MusicPlayer);