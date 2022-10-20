import React,{memo,useRef,useEffect,useState, useCallback} from 'react';
import styled from 'styled-components';
import {gsap} from 'gsap';
import BackgroundImage1 from '../../static/image/TitlePageimage/4.jpg';
import BackgroundImage2 from '../../static/image/TitlePageimage/3.jpg';
import BackgroundImage3 from '../../static/image/TitlePageimage/5.jpg';

import MobileHeader from '../MobileHeader';
import FirstImageBox from './FirstImageBox';
import TextComponent from './TextComponent';

const EntireContainer = styled.div`
    width:100%;height:100%;
`;

const EntireWrapper = styled.div`
    width:100%;height:100%;
    background-color:${props=>props.theme.bodyBgColor};
    position:relative;
`;


/* const TitleComponent = styled.div`
    position:absolute;
    top:25.5%;left:15.5%;
    z-index:3;
    transform-style:preserve-3d;
    perspective:300px;
    >span{
        display:inline-block;
        font-size:75.5px;
        color:#000;
        scale:0;
        opacity:0;
        color:#fff;
        transform:translateZ(120px);
    }
`;

const SubTitleComponent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform-style:preserve-3d;
    perspective:300px;
    width:355.5px;
    white-space:pre-wrap;
    transform:translate(-50%, -50%);
    letter-spacing: 3.5px;
    >span{
        display:inline-block;
        font-size:35.5px;
        color:#000;
        scale:0;
        opacity:0;
        color:#fff;
    }
`; */

const FirstPageComponent = memo(()=>{
    const imageBoxRef = useRef(null);
    const mainTitleRef = useRef(null);
    const subTitleRef = useRef(null);
    const imageAnimationDuration = 3.5;
    const [index,setIndex]=useState(0);
    const bgImgArr = [BackgroundImage1,BackgroundImage2,BackgroundImage3];

    useEffect(()=>{
        if(index>bgImgArr.length-1){
            setIndex(0);
        }
    },[index])

    useEffect(()=>{
        if(imageBoxRef.current){
            const fadeInBackgroundAnimation = gsap.to(
                imageBoxRef.current,
                {
                    opacity:1,
                    repeat:-1,
                    repeatDelay:imageAnimationDuration+1,
                    duration:imageAnimationDuration,
                    onRepeat:()=>{
                        setIndex(prev=>prev+1);
                    }
                })
            return ()=>{
                fadeInBackgroundAnimation.kill();
            }
        }
    },[]);


    useEffect(()=>{
        if(mainTitleRef.current){
            const singleLiteral = mainTitleRef.current.querySelectorAll('span');
            const textAcitonArr = Array.from(singleLiteral).map((v,i)=>(
                gsap.to(v,{
                    delay:imageAnimationDuration,
                    opacity:1,
                    scale:1,
                    duration:Math.random()*i,
                    z:0,
                })
            ))
            return ()=>{
                textAcitonArr.forEach((v)=>{
                    v.kill();
                })
            }
        }
    },[])

    useEffect(()=>{
        if(subTitleRef.current){
            const singleLiteral = subTitleRef.current.querySelectorAll('span');
            const textActionArr = Array.prototype.map.call(singleLiteral,(v,i)=>
                gsap.to(v,{
                    delay:imageAnimationDuration,
                    duration:Math.random()*i,
                    opacity:1,
                    scale:1
                })
            )
            return ()=>{
                textActionArr.forEach((v)=>{
                    v.kill();
                })
            }
        }
    },[])

    return (
        <EntireContainer>
            <EntireWrapper>
                <MobileHeader/>
                <FirstImageBox imgSrc={bgImgArr[index]} ref={imageBoxRef}/>
                <TextComponent classname={'title-text'} text={['My' , 'Music' , 'Store']}  ref={mainTitleRef}/>
                <TextComponent classname={'title-text sub-title'} text={['Enjoy\n', 'Your\n', 'Music\n', 'In\n',' Browser!\n']}  ref={subTitleRef}/>
            </EntireWrapper>
        </EntireContainer>
    )
}) 

export default FirstPageComponent;
