import React,{memo} from 'react';
import styled from 'styled-components';
import SampleAlbumCoverImage from '../../../../static/image/sample/album_cover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
const SingleMusicContainer = styled.div`
    width:90.5%;height:65.5px;
    box-sizing:border-box;
    padding:2.5px;
    margin:0 auto;
    .singleMusic-wrapper{
        width:100%;height:100%;
        display:flex;
        align-items:center;
        .singleMusic-box{
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            width: 100%;
            height:100%;
            .image-box{
                width:55.5px;height:55.5px;
                border-radius:4.5px;
                overflow:hidden;
                >img{
                    display:block;
                    width:100%;height:100%;
                    object-fit:cover;
                }
            }
            .text-box{
                display:flex;
                flex-direction:column;
                justify-content:space-around;
                width:auto;height:55.5px;
                >p{
                    padding:0 10.5px;
                    font-size:var(--body-text);
                    text-align:center;
                    line-height:23.5px;
                    &.title{
                        color:#fff;
                    }
                    &.author{
                        color:#454545;
                    }
                }
            }
            .delete-button-box{
                width:auto; height:100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .delete-button{
                    color:#fff;
                    cursor:pointer;
                    width:35.5px;height:35.5px;
                    border-radius:4.5px;
                    text-align:center;
                    line-height:35.5px;
                    font-size:var(--body-icon);
                }
            }
        }
    }
    &:hover{
        background:${props=>props.theme.emphasize};
    }
`;

const SingleMusicComponent = memo(()=>{
    return (
        <SingleMusicContainer >
            <div className="singleMusic-wrapper">
                <div className='singleMusic-box'>
                    <p className="image-box">
                        <img src={SampleAlbumCoverImage} alt="Album-Cover"/>
                    </p>
                    <div className="text-box">
                        <p className="title">
                            Eclipse
                        </p>
                        <p className="author">
                            Jim Yosef
                        </p>
                    </div>
                    <div className="delete-button-box">
                        <p className='delete-button'>
                            <FontAwesomeIcon icon={faTrash}/>
                        </p>
                    </div>
                </div>
            </div>
        </SingleMusicContainer>
    )
})

export default SingleMusicComponent;