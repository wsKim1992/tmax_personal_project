import React, { memo } from 'react';
import styled from 'styled-components';
import SingleMusicComponent from './SingleMusicComponent';

const MusicListWrapper = styled.div`
    width:100%;height:100%;
    &::-webkit-scrollbar{
        width:10px;
    }
    &::-webkit-scrollbar-track{
        width:10px;
        background-color:#000;
        border-radius:4.5px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius:4.5px;
        background:#454545;
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    overflow:auto;
    .musicList-box{
        width:100%;height:100%;
        padding:10px;
        box-sizing:border-box;
        border-radius: 10.5px;
    }
    @media screen and (max-width:650px){
        .musicList-box{
            padding: 0px;
        }
    }
`;

const MusicListComponent = memo(() => {


    return (
        <MusicListWrapper>
            <div className="musicList-box">
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
                <SingleMusicComponent />
            </div>
        </MusicListWrapper>
    )
})

export default MusicListComponent;