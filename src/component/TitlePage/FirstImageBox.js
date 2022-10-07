import React,{memo,forwardRef, useEffect} from 'react';
import {ImageBox} from './utilComponent';
import styled from 'styled-components';

const ThisImageBox = styled(ImageBox)`
    position:absolute;
    top:0%;left:0%;
    z-index:2;
    .image-box{
        background-image:
        linear-gradient(215deg,rgba(0,0,0,0),${props=>props.theme.bodyBgColor}),
        url(${props=>props.imgSrc});
        background-repeat:no-repeat;
        background-size:cover;
    }
`;

const FirstImageBox = memo(forwardRef((props,ref)=>{
    const {imgSrc} = props;
    return (
        <ThisImageBox imgSrc={imgSrc}>
            <div className="image-box" ref={ref}>

            </div>
        </ThisImageBox>
    )
}))

export default FirstImageBox;