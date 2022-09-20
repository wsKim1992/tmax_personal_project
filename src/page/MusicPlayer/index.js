import React from 'react';
import styled from 'styled-components';
import AudioController from '../../component/MusicPlayer/AudioController';
import AlbumCover from '../../component/MusicPlayer/AlbumCover';
import PlayListComponent from '../../component/MusicPlayer/PlayListComponent';

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
        
        .main-contents-container{
            height:74vh;
            .album-cover-container{
                width:100%;height:100%;
            }
            .playlist-container{
                display:none;
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



const MusicPlayer = () => {
    return (
        <MusicPlayerContainer>
            <MusicPlayerWrapper>
                <div className='main-contents-container'>
                    <div className='album-cover-container'>
                        <div className='album-cover-wrapper'>
                            <AlbumCover />
                        </div>
                    </div>
                    <div className='playlist-container'>
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
}

export default MusicPlayer;