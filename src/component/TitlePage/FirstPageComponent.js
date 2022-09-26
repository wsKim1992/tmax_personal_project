import React,{memo,useRef,useEffect} from 'react';
import styled from 'styled-components';
import {gsap} from 'gsap';
import BackgroundImage1 from '../../static/image/TitlePageimage/4.jpg';

const EntireContainer = styled.div`
    width:100%;height:100%;
`;

const EntireWrapper = styled.div`
    width:100%;height:100%;
    background-color:${props=>props.theme.bodyBgColor};
    perspective:1200px;
    position:relative;
    .image-box{
        transform-style:preserve-3d;
        width:100%;height:100%;
        background-image:
                linear-gradient(215deg,rgba(0,0,0,0),${props=>props.theme.bodyBgColor}),
                url(${BackgroundImage1});
        opacity:0;
    }
    .main-title{
        position:absolute;
        top:20%;left:35.5%;
        z-index:2;
        transform-style:preserve-3d;
        perspective:550px;
        >span{
            font-size:55.5px;
            color:#000;
            transform:translate3d(0, 0, 100px);
            transition:0.5s all;
        }
    }
`;

const FirstPageComponent = memo(()=>{
    const imageBoxRef = useRef(null);
    const mainTitleRef = useRef(null);
    const imageAnimationDuration = 3.5;
    useEffect(()=>{
        if(imageBoxRef.current){
            const fadeInBackgroundAnimation = gsap.to(
                imageBoxRef.current,{
                    duration:imageAnimationDuration,
                    opacity:1,
                })
            return ()=>{
                fadeInBackgroundAnimation.kill();
            }
        }
    },[imageBoxRef.current]);

    useEffect(()=>{
        if(mainTitleRef.current){
            const singleLiteral = mainTitleRef.current.querySelectorAll('span');
            const textAcitonArr = Array.from(singleLiteral).map((v,i)=>(
                gsap.to(v,{
                    delay:imageAnimationDuration,
                    duration:Math.random()*3.5,
                    z:0,
                })
            ))
            return ()=>{
                textAcitonArr.forEach((v)=>{
                    v.kill();
                })
            }
        }
    },[mainTitleRef.current])

    return (
        <EntireContainer>
            <EntireWrapper>
                <div ref={mainTitleRef} className='main-title'>
                    <span>M</span>
                    <span>y</span>
                    &nbsp; &nbsp; &nbsp; 
                    <span>M</span>
                    <span>U</span>
                    <span>S</span>
                    <span>I</span>
                    <span>C</span>
                    &nbsp; &nbsp; &nbsp; 
                    <span>S</span>
                    <span>t</span>
                    <span>o</span>
                    <span>r</span>
                    <span>e</span>
                </div>
                <div ref={imageBoxRef} className="image-box">
                </div>
            </EntireWrapper>
        </EntireContainer>
    )
}) 

export default FirstPageComponent;
