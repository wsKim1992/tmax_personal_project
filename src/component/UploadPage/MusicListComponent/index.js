import React, { memo,useCallback,useEffect,useRef } from 'react';
import styled from 'styled-components';
import SingleMusicComponent from './SingleMusicComponent';
import GetMusicList from '../../../react-query/getMusicList';

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
        width:100%;height:auto;
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
    
    const {
        MusicListData,
        loadingMusicListData,
        fetchingMusicListData,
        isMusicListError,
        musicListError,
        fetchNextPage,
        hasNextPage
    }=GetMusicList();

    const EntireWrapperRef = useRef(null);

    const scrollEventFunction=useCallback((event)=>{
        const style = document.defaultView.getComputedStyle(EntireWrapperRef.current)
        const {scrollTop,scrollHeight} = EntireWrapperRef.current;
        console.log(`has Next Page : ${hasNextPage}`);
        if(Math.ceil(scrollTop+parseFloat(style.height))>=scrollHeight&&hasNextPage){
            fetchNextPage();
        }
    },[hasNextPage])
    
    useEffect(()=>{
        EntireWrapperRef.current.addEventListener("scroll",scrollEventFunction);
    },[hasNextPage]);

    useEffect(()=>{
        fetchNextPage();
    },[])


    return (
        <MusicListWrapper ref={EntireWrapperRef}>
            <div className="musicList-box">
                {
                    (
                        !loadingMusicListData
                        &&!fetchingMusicListData
                        &&!isMusicListError
                        &&MusicListData?.pages
                    )
                        &&
                        MusicListData.pages.map((page,i)=>(
                            page.result.map((v,subIdx)=>
                                <SingleMusicComponent key={`${v.musicId}`} data={v}/>
                            )
                        )
                    )
                }
            </div>
        </MusicListWrapper>
    )
})

export default MusicListComponent;