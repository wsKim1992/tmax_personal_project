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