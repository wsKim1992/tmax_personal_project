import React,{memo} from "react";
import styled from "styled-components";
import sampleAlbumCoverImage from '../../../static/image/sample/album_cover.jpg';

const PlayListComponentBox = styled.div`
    width:100%;height:100%;
    box-sizing:border-box;
    padding:10px;
    .playListComponent{
        width:100%;height:100%;
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

const PlayListComponent = memo(()=>{

    return (
        <PlayListComponentBox>
            <div className="playListComponent">
                <ul className="ul">
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>
                    <li className="li">
                        <p className="album-cover-thumbnail-box">
                            <img src={sampleAlbumCoverImage} alt="album-cover-thumbnail"/>
                        </p>
                        <div className="music-text-info-box">
                            <p className="music-title">
                                Speed
                            </p>
                            <p className="music-other-info">
                                Jim Yosef
                            </p>
                        </div>
                        <div className="playtime-duration-box">
                            <p className="playtime-duration">
                                3:05
                            </p>
                        </div>
                    </li>   
                </ul>
            </div>
        </PlayListComponentBox>
    )
})

export default PlayListComponent;