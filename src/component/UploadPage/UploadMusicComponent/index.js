import React, { useEffect } from 'react';
import styled from 'styled-components';
import UploadMusicList from './UploadMusicList';
import {observer} from 'mobx-react-lite';
import UploadStore from '../../../store/UploadStore';
import UploadMusicInput from './UploadMusicInput';

const UploadMusicBox = styled.div`
    width:42.5vw;height:42.5vw;
    margin:0 auto;
    background-image:linear-gradient(311deg,
        #A2A5AF,
        ${props => props.theme.headerBgColor}
    );
    border-radius:12.5px;
    .input-container{
        width:100%;height:48.5%;
        &.on{
            height:38.5%;
        }
        .input-wrapper{
            width:100%;height:100%;
            display:flex;
            align-items:center;
            .input-box{
                margin:0 auto;
                width:38.5vw;height:65.5%;
                border-radius:10.5px;
                border:3.5px dashed #fff;
                display:flex;
                flex-direction:row;
                justify-content:space-between;
                align-item:center;
                &.dragged-over{
                    border:3.5px dashed ${props => props.theme.emphasize};
                }
                .input-drag-box{
                    width:18.5vw;height:100%;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;    
                    input[type="file"]{
                        display:none;
                    }
                    >p{
                        width:100%;height:auto;
                        color:#fff;text-align:center;
                        &.file-drag-text{
                            font-size:var(--body-large-text);
                        }
                        &.available-file-type-text{
                            margin-top:19.5px;
                            font-size:var(--body-text);
                        }
                    }
                }
                .label-box{
                    width:14vw;height:100%;
                    display:flex;
                    align-items:center;
                    .label{
                        display:block;
                        cursor:pointer;
                        height:28.5px;
                        line-height: 16.5px;
                        width:auto;
                        color:#000;
                        padding:5.5px 12.5px;
                        box-sizing:border-box;
                        border-radius:4.5px;
                        font-size:var(--body-text);
                        background:#fff;
                        margin:0 auto;
                        &:hover{
                            color:#fff;
                            background-color:${props => props.theme.emphasize};
                        }
                        >span{
                            margin-left:5.5px;
                        }
                    }
                }
            }
        }
    }
    .music-info-container{
        width:100%;height:48.5%;
        &.on{
            height:58.5%;
        }
        .music-info-wrapper{
            width:100%;height:100%;
            .music-info-box{
                width:38.5vw;height:75.5%;
                border-radius:10.5px;
                margin:0 auto;
                &.on{
                    height:100%;
                }
                .added-playlist-container{
                    width:100%;height:100%;
                    .added-playlist-wrapper{
                        width:100%;height:100%;
                        padding:10.5px;
                        box-sizing:border-box;
                        overflow:auto;
                        border-radius:10.5px;
                        background-color:#000;
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
                            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                        }
                    }
                }
                .before-uplaod{
                    width:100%;height:100%;
                    .upload-icon{
                        width:100%;height:auto;
                        font-size:var(--body-icon);
                        text-align:center;
                    }
                    .text-area{
                        margin-top:15.5px;
                        width:100%;height:auto;
                        .main-text{
                            width:100%;height:auto;
                            color:#fff;
                            font-size:var(--body-large-text);
                            text-align:center;
                            margin-bottom:15.5px;
                        }   
                        .sub-text{
                            width:100%;height:auto;
                            color:#202323;
                            font-size:var(--body-middle-text);
                            text-align:center;
                        }
                    }
                }
            }
            
        }
    }
    @media screen and (max-width:1405px){
        width: 52.5vw;height: 52.5vw;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        width:48.5vw;
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:48.5vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:940px){
        width: 85.5vw;height: 90%;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        width:58.5vw;
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:58.5vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:770px){
        width: 85.5vw;height: 90%;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width:78.5vw;
                        .input-drag-box{
                            width:25.5vw;
                        }
                        .label-box{
                            width:19.5vw;
                        }
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:78.5vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:650px){
        width: 95.5vw;
        .music-info-container{
            width:100%;height:62.5%;
            &.on{
                height:62.5%;
            }
            .music-info-wrapper{
                width:100%;height:100%;
                .music-info-box{
                    width:87.5vw;
                }
            }
        }
        .input-container{
            width:100%;height:48.5%;
            &.on{
                height:28.5%;
            }
            .input-wrapper{
                width:100%;height:100%;
                display:flex;
                align-items:center;
                .input-box{
                    width:87.5vw;
                }
            }
        }
    }
    @media screen and (max-width:650px){
        width: 95.5vw;
        .music-info-container{
            width:100%;height:62.5%;
            &.on{
                height:62.5%;
            }
            .music-info-wrapper{
                width:100%;height:100%;
                .music-info-box{
                    width:87.5vw;
                }
            }
        }
        .input-container{
            width:100%;height:48.5%;
            &.on{
                height:28.5%;
            }
            .input-wrapper{
                width:100%;height:100%;
                display:flex;
                align-items:center;
                .input-box{
                    width:87.5vw;
                    .input-drag-box{
                        width:85.5vw;
                    }
                    .label-box{
                        width:85.5vw;
                    }
                }
            }
        }
    }
    
`;





const UploadMusicComponent = observer(() => {
    //const [musicFileArr, setMusicFileArr] = useState(null);
    const {deleteMusiclistToBeUpload} = UploadStore;
    useEffect(()=>{
        return ()=>{
            deleteMusiclistToBeUpload();
        }
    },[])
    return (
        <UploadMusicBox>
            <UploadMusicInput/>
            <UploadMusicList/>
        </UploadMusicBox>
    )
})

export default UploadMusicComponent;