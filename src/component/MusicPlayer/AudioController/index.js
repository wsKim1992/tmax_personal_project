import React, { memo, useState, useCallback } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause, faBackwardFast,
    faForwardFast, faVolumeHigh,
    faVolumeLow, faVolumeMute,
    faRepeat, faShuffle,faListUl
} from '@fortawesome/free-solid-svg-icons';
import sampleAlbumCoverImage from '../../../static/image/sample/album_cover.jpg';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const AudioControllerBox = styled.div`
    width:100%;height:100%;
    display:flex;flex-direction:row;
    align-items:center;
    user-select:none;
    justify-content:space-between;
    position:relative;
    .mobile-other-func-box{
        display:none;
    }
    .showPlaytime-component-mobile{
        display:none;
    }
    .showPlaytime-component{
        width:100%;
        height:5px;
        position:absolute;
        top:-5%;
        left:0%;
        background-color:#454545;
        transition:0.65s top,height;
        &:hover{
            top:-8.5px;
            height:8.5px;
        }
        .time-lapsed{
            background-color:${props => props.theme.emphasize};
            width:30%;height:100%;
        }
    }
    .playbutton-box{
        height:75.5px;width:auto;
        display: flex;
        .playbutton-button-list{
            height:100%;width:auto;
            display:flex;
            flex-direction:row;
            align-items:center;
            .playbutton-button{
                width:55.5px;height:55.5px;
                font-size:var(--body-icon);
                color:#fff;
                margin-left:12.5px;
                line-height: 55.5px;
                text-align: center;
                cursor:pointer;
                &:hover{
                    color:${props => props.theme.emphasize};
                }
                &.only-mobile{
                    display:none;
                }
            }
        }
        .playtime-duration-box{
            width:auto;height:100%;
            display: flex;
            align-items: center;
            .playtime-duration{
                user-select:none;
                height:55.5px;
                font-size:var(--body-text);
                color:#fff;
                margin:0 12.5px;
                line-height:55.5px;
            }
        }
    }
    .music-info-box{
        width:auto;height:100%;
        display:flex;
        .music-thumbnail{
            width:75.5px;height:75.5px;
            display:flex;
            align-items:center;
            justify-content:center;
            >img{
                display:block;
                width:55.5px;height:55.5px;
                object-fit:cover;
            }
        }
        .music-text-info{
            width:auto;height:75.5px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content: center;
            max-width:310px;
            overflow:hidden;
            >p{
                width:auto;
                padding:5.5px;
                font-size:var(--body-text);
                white-space:nowrap;
                text-overflow:ellipsis;
                &.music-title{
                    color:#fff;
                }
                &.music-other-info{
                    color:#fff;
                }
            }
        }
    }
    .manipulation-box{
        width:auto;height:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        .manipulation-button{
            height:55.5px;
            width:55.5px;
            text-align:center;
            line-height:55.5px;
            font-size:var(--body-icon);
            color:#fff;
            cursor:pointer;
            &:hover{
                color:${props => props.theme.emphasize};
            }
            position:relative;
            .volume-controller-box{
                position:absolute;
                top:-250%;left:50%;
                background-color: #fff;
                border-radius: 8.5px;
                padding: 10px;
                height: 130px;
                box-sizing: border-box;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transform:translateX(-50%);
            }
        }
    }
    @media screen and (max-width:770px){
        flex-direction: column;
        justify-content:center;
        .showPlaytime-component-mobile{
            width:89.5%;height:25.5px;
            margin:0 auto;
        }
        .showPlaytime-component{
            top:0%;
        }
        .mobile-other-func-box{
            display:block;
            width:100%;
            height:35px;
            .other-func-btn{
                width:100%;height:100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .show-list-box-button-box{
                    width:35px;height:35px;
                    border-radius:4.5px;
                    overflow:hidden;
                    .show-list-box-button{
                        width:100%;height:100%;
                        font-size:var(--body-icon);
                        line-height:35px;
                        text-align:center;
                        color:#fff;
                    }
                }
                .volumn-controller-box{
                    display:flex;
                    width:calc(100% - 105px);height:100%;
                    .volumn-button{
                        width:35px;height:35px;
                        border-radius:4.5px;
                        overflow:hidden;
                        font-size:var(--body-icon);
                        line-height:35px;
                        text-align:center;
                        color:#fff;
                    }
                    .volumn-controller-box{
                        width:65%;height:100%;
                        margin-left:3.5px;
                        display:flex;
                        align-items:center;
                        >span{
                            width:100%;
                            padding:0;
                        }
                    }
                }
            }
        }
        .playbutton-box{
            height:75.5px;width:100%;
            display: flex;
            .playbutton-button-list{
                height:100%;width:100%;
                display:flex;
                flex-direction:row;
                align-items:center;
                .playbutton-button{
                    width:55.5px;height:55.5px;
                    font-size:var(--body-icon);
                    color:#fff;
                    margin-left:12.5px;
                    line-height: 55.5px;
                    text-align: center;
                    cursor:pointer;
                    width: 100%;
                    justify-content: center;
                    &:hover{
                        color:${props => props.theme.emphasize};
                    }
                    &.only-mobile{
                        display:block;
                    }
                }
            }
        }
        .music-info-box{
            display:none;
        }
        .manipulation-box{
            display:none;
        }
    }
`;

const AudioController = memo(() => {
    const [toggleVolumeController, setToggleVolumeController] = useState(false);

    const onClickVolumeIcon = useCallback((evt) => {
        evt.stopPropagation();
        setToggleVolumeController(prev => !prev);
    }, []);

    return (
        <AudioControllerBox>
            <div className="showPlaytime-component">
                <div className="time-lapsed">
                </div>
            </div>
            <div className="mobile-other-func-box">
                <div className="other-func-btn" data-func="volume">
                    <div className="volumn-controller-box">
                        <p className="volumn-button">
                            <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeHigh} />
                        </p>
                        <p className="volumn-controller-box">
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                        </p>
                    </div>
                    <div className="show-list-box-button-box">
                        <p className="show-list-box-button">
                            <FontAwesomeIcon icon={faListUl} />
                        </p>
                    </div>
                </div>
            </div> 
            <div className="playbutton-box">
                <div className="playbutton-button-list">
                    <p className="playbutton-button only-mobile" data-func="shuffle">
                        <FontAwesomeIcon icon={faShuffle} />
                    </p>
                    <p className="playbutton-button" data-func="prev">
                        <FontAwesomeIcon icon={faBackwardFast} />
                    </p>
                    <p className="playbutton-button" data-func="toggle-play">
                        <FontAwesomeIcon icon={faPause} />
                    </p>
                    <p className="playbutton-button" data-func="next">
                        <FontAwesomeIcon icon={faForwardFast} />
                    </p>
                    <p className="playbutton-button only-mobile" data-func="repeat">
                        <FontAwesomeIcon icon={faRepeat} />
                    </p>
                </div>
                <div className="playtime-duration-box">
                    <p className="playtime-duration">
                        00:00/03:45
                    </p>
                </div>
            </div>
            <div className="music-info-box">
                <p className="music-thumbnail">
                    <img src={sampleAlbumCoverImage} alt="album-cover-page" />
                </p>
                <div className="music-text-info">
                    <p className="music-title">Speed</p>
                    <p className="music-other-info">
                        Jim-Yosef : 1st Album
                    </p>
                </div>
            </div>
            <div className="manipulation-box">
                <div className="manipulation-button" data-func="volume">
                    <FontAwesomeIcon onClick={onClickVolumeIcon} icon={faVolumeHigh} />
                    {
                        toggleVolumeController &&
                        (
                            <Box className="volume-controller-box" sx={{ height: 300 }}>
                                <Slider
                                    sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                    orientation="vertical"
                                    defaultValue={30}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        )
                    }

                </div>
                <div className="manipulation-button" data-func="repeat">
                    <FontAwesomeIcon icon={faRepeat} />
                </div>
                <div className="manipulation-button" data-func="random-repeat">
                    <FontAwesomeIcon icon={faShuffle} />
                </div>
            </div>
        </AudioControllerBox>
    )
})

export default AudioController;
