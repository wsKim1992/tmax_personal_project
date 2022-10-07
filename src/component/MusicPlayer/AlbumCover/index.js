import React, { memo, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import sampleAlbumCoverImage from '../../../static/image/sample/album_cover.jpg';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
 */
import MobileHeader from '../../MobileHeader';

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
    .music-info-box{
        width:100%;height:100%;
        position:relative;
        .music-box{
            width:100%;height:100%;
            background-image:url(${sampleAlbumCoverImage});
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
                        animation-name: ${CDRotation};
                        animation-duration: 1.6s;
                        animation-iteration-count: infinite;
                        animation-timing-function:linear;
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

const AlbumCover = memo(() => {
    /* const [showMenuBar,setShowMenuBar] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    const onClickMenuBar = useCallback((evt)=>{
        setShowMenuBar(prev=>!prev);
    },[]);

    const onClickShowSearchBox = useCallback((evt) => {
        setShowSearchBox(prev => !prev);
    }, []); */

    return (
        <AlbumCoverBox >
            <div className="music-info-box">
                <div className='music-box'>
                </div>
                <div className='cd-component-container'>
                    <MobileHeader/>
                    {/* <div className={`${showMenuBar?'header-for-mobile show-memu':'header-for-mobile'}`}>
                        <div className="menubar-box" onClick={onClickMenuBar}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                        <div className="search-box">
                            <p className={`${!showSearchBox ? 'search-input-box' : 'search-input-box show'}`}>
                                <input id="search-input" type="text" placeholder='검색어를 입력해 주세요' />
                            </p>
                            <p className="search-button" onClick={onClickShowSearchBox}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </p>
                        </div>
                        <div className="menubar-container">
                            <div className='menubar-wrapper'>
                                <p className='menubar-menu'>
                                    Home
                                </p>
                                <p className='menubar-menu'>
                                    Music Player
                                </p>
                                <p className='menubar-menu'>
                                    Upload
                                </p>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className='cd-component-wrapper'>
                        <div className='cd-component-padding'>
                            <div className='cd-componenet'>
                                <img src={sampleAlbumCoverImage} alt="album-cover" />
                            </div>
                        </div>
                    </div>
                    <div className='music-info-wrapper'>
                        <div className='music-title-text'>
                            Speed
                        </div>
                        <div className='music-info-text'>
                            Jim Yosef
                        </div>
                    </div>
                </div>
            </div>
        </AlbumCoverBox>
    )
})

export default AlbumCover;
