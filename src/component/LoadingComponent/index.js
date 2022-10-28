import React,{memo} from 'react';
import styled from 'styled-components';
import LoadingImage from '../../static/image/loading/loading.gif';

const EntireLoadingContainer = styled.div`
    position:fixed;
    top:0;left:0;
    width:100%;height:100%;
`;

const EntireLoadingWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:100%;height:100%;
    background-color:rgba(0,0,0,0.35);
    .loadingImageBox{
        display:block;
        width:12.5vw;height:12.5vw;
        border-radius:8.5px;
        overflow:hidden;
        background-color:linear-gradient( 45deg,
            ${props=>props.theme.bodyBgColor},
            ${props=>props.theme.headerBgColor}
        );
        >img{
            display:block;
            width:100%;height:75%;
        }
    }
`;

const LoadingComponent = memo(()=>{
    return (
        <EntireLoadingContainer>
            <EntireLoadingWrapper>
                <img src={LoadingImage} alt="loading"/>
            </EntireLoadingWrapper>
        </EntireLoadingContainer>
    )
})

export default LoadingComponent;