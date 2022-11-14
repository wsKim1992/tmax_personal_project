import React,{useEffect,useCallback,useState} from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import MusicPlayerStore from "../../../store/MusicPlayerStore";
import SampleMusic1 from '../../../static/sample_music/Jim Yosef - Speed.mp3';
import SampleMusic2 from '../../../static/sample_music/Immediate Music - Electric Romeo.mp3';
import sampleAlbumCoverImage1 from '../../../static/image/sample/album_cover.jpg';
import sampleAlbumCoverImage2 from '../../../static/image/sample/album_cover_2.jpg';
import {findElement} from '../../../util/utilFunc';
import GetMusicList from '../../../react-query/getMusicList';

const PlayListComponentBox = styled.div`
    width:100%;height:100%;
    box-sizing:border-box;
    padding:10px;
    .playListComponent{
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
        .ul{
            width:100%;height:100%;
            .li{
                position:relative;
                width:100%;height:55.5px;
                display:flex;
                flex-direction:row;
                align-items:center;
                justify-content: space-evenly;
                padding-bottom: 5.5px;
                &:hover{
                    background-color:${props=>props.theme.emphasize};
                }
                &.on{
                    background-color:${props=>props.theme.emphasize};
                }
                &:after{
                    content:'';
                    position:absolute; 
                    bottom:0;left:50%;
                    width:100%;height:0.5px;
                    background:#454545;
                    transform:translate(-50%, -50%);
                }
                .album-cover-thumbnail-box{
                    width:48.5px;height:48.5px;
                    border-radius:3.5px;
                    >img{
                        display:block;
                        width:100%;height:100%;
                        object-fit:cover;
                    }
                }
                .music-text-info-box{
                    width:calc(100% - 105px);
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-evenly;
                    >p{
                        height:auto;
                        font-size:var(--body-text);
                        &.music-title{
                            color:#fff;
                        }
                        &.music-other-info{
                            color:#8D99AA;
                        }
                    }
                }
                .playtime-duration-box{
                    width:auto;height:100%;
                    .playtime-duration{
                        line-height:55.5px;
                        font-size:var(--body-text);
                        color:#fff;
                    }
                }
            }
        }
    }
`;

const hardCodedData = [
    {
        url:SampleMusic1,
        albumCoverUrl:sampleAlbumCoverImage1,
        title:'Speed',
        artist:'Jim Yosef',
        musicId:`${Date.now()}_1`,
        genre:'electronic'
    },
    {
        url:SampleMusic2,
        albumCoverUrl:sampleAlbumCoverImage2,
        title:'Electric Romeo',
        artist:'Europa',
        musicId:`${Date.now()}_2`,
        genre:'electronic'
    }
]

const PlayListComponent = observer(()=>{
    
    const {myMusicList,setMyMusicList,setAudioSrc,
        setShowMyPlayList,musicPlayingNow,showMyPlayList
    } = MusicPlayerStore;
    
    const {
        MusicListData,
        loadingMusicListData,
        fetchingMusicListData,
        isMusicListError,
        musicListError,
        isMusicListSuccess,
        fetchNextPage,
    } = GetMusicList();

    useEffect(()=>{
        fetchNextPage();
    },[])

    useEffect(()=>{
        const isLoading = fetchingMusicListData||loadingMusicListData;
        if(!isLoading){
            if(isMusicListError){
                console.error(musicListError);
                window.alert(musicListError)
            }else if(isMusicListSuccess&&MusicListData.pages){
                const arr = MusicListData.pages.map((page,i)=>(
                    page.result.map((v,subIdx)=>v)))[0];
                    console.log(arr);
                setMyMusicList(arr);
            }
        }
    },[
        MusicListData,
        loadingMusicListData,
        fetchingMusicListData,
        isMusicListError,
        isMusicListSuccess,
        musicListError
    ])

    const onClickUl = useCallback((evt)=>{
        if(myMusicList){
            const {target} = evt;
            const element = findElement(target,'li','ul');
            if(element){
                const {dataset:{index,key}}=element; 
                console.log(key);
                const musicInfo = myMusicList.find(v=>v.musicId===Number(key));
                console.log(musicInfo.url);
                setAudioSrc({...musicInfo,index:parseInt(index)});
            }
        }
    },[myMusicList]);

    return (
        showMyPlayList&&
        <PlayListComponentBox>
            <div className="playListComponent">
                <ul className="ul" onClick={onClickUl}>
                    {
                        (
                            !loadingMusicListData
                            &&!fetchingMusicListData
                            &&!isMusicListError
                            &&MusicListData?.pages
                        )&&
                        myMusicList&&
                        myMusicList.map((v,i)=>(
                            <li data-index={i} data-key={v.musicId} key={v.musicId} className={`${i===musicPlayingNow?.index?'li on':'li'}`}>
                                <p className="album-cover-thumbnail-box">
                                    <img src={`/assets/albumImage/${v.albumCoverUrl}`} alt="album-cover-thumbnail"/>
                                </p>
                                <div className="music-text-info-box">
                                    <p className="music-title">
                                        {v.title}
                                    </p>
                                    <p className="music-other-info">
                                        {v.artist}
                                    </p>
                                </div>
                                <div className="playtime-duration-box">
                                    <p className="playtime-duration">
                                        {v.genre}
                                    </p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </PlayListComponentBox>
    )
})

export default PlayListComponent;