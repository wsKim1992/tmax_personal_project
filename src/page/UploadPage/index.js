import React,{memo} from 'react';
import styled from  'styled-components';
import UploadMusicComponent from '../../component/UploadPage/UploadMusicComponent';
import MusicListComponent from '../../component/UploadPage/MusicListComponent';

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
        }
        .music-list-container{
            position: absolute;
            background: #000;
            top: 0%;
            left: 100%;
        }
    }
`;

const UploadPage = memo(()=>{
    return (
        <EntireContainer>
            <UploadMusicWrapper>
                <div className='upload-music-container'>
                    <UploadMusicComponent/>
                </div>
                <div className='music-list-container'>
                    <MusicListComponent/>
                </div>
            </UploadMusicWrapper>
        </EntireContainer>
    )
})

export default UploadPage;