import React, { memo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import UploadMusicComponent from '../../component/UploadPage/UploadMusicComponent';
import MusicListComponent from '../../component/UploadPage/MusicListComponent';
import MobileHeader from '../../component/MobileHeader';

const EntireContainer = styled.div`
    width:100%;height:100%;
`;

const UploadMusicWrapper = styled.div`
    width:85.5%;height:100%;
    margin:0 auto;
    display:flex;flex-direction:row;
    align-items:center;
    justify-content:space-evenly;
    .upload-music-container{
        width:55.5vw;;height:100%;
        display:flex;
        align-items:center;
        .mobile-header-container{
            display:none;
        }
    }
    .music-list-container{
        width:20vw;height:100%;
    }
    @media screen and (max-width:1405px){
        width:90.5%;
        .upload-music-container{
            width:65.5vw;
        }
    }
    @media screen and (max-width:940px){
        width:98.5%;
        .upload-music-container{
            height:100%;
            width:70.5vw;
        }
        .music-list-container{
            width:27.5vw;height:100%;
        }
    }
    @media screen and (max-width:770px){
        width:100%;
        position:relative;
        .upload-music-container{
            width:95.5vw;
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            .mobile-header-container{
                display:block;
                width:100%;height:7.5%;
                .mobile-header-wrapper{
                    width:85vw;height:100%;
                    margin:0 auto;
                    position:relative;
                }
            }
        }
        .music-list-container{
            position:absolute;
            height: 30vh;
            top: 8%;
            border-radius: 10.5px;
            right: 10px;
            background-color:#000;
        }
    }
    @media screen and (max-width:650px){
        .music-list-container{
            width:35.5vw;
            padding:2.5px;
        }
    }

    @media screen and (max-width:520px){
        .music-list-container{
            display:none;
            width:92.5vw;height:25.5vh;
            padding:1.5px;
        }
    }
`;



const UploadPage = memo(() => {

    return (
        <EntireContainer>
            <UploadMusicWrapper>
                <div className='upload-music-container'>
                    <div className='mobile-header-container'>
                        <div className="mobile-header-wrapper">
                            <MobileHeader />
                        </div>
                    </div>
                    <UploadMusicComponent />
                </div>
                <div className='music-list-container'>
                    <MusicListComponent />
                </div>
            </UploadMusicWrapper>
        </EntireContainer>
    )
})

export default UploadPage;