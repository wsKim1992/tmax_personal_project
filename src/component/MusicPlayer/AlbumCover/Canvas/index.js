import React,{useEffect,useRef,useCallback} from "react";
import { observer } from 'mobx-react-lite';
import styled from "styled-components"; 
import MusicPlayerStore from "../../../../store/MusicPlayerStore";

const CanvasWrapper = styled.div`
    width:100%;height:100%;
    position:absolute;
    top:0%;left:0%;
    z-index:2;
`;

function draw(dataArr){
    let x = 0;
    const ctx = this.getContext('2d');
    const barWidth = this.width/dataArr.length;
    ctx.clearRect(0,0,this.width,this.height);
    for(let i =0;i<dataArr.length;i++){
        let barHeight = dataArr[i];
        const red = (i*barHeight)/10;
        const green = i*4;
        const blue = barHeight/4-12;
        ctx.fillStyle = `rgba(${red},${green},${blue})`;
        ctx.fillRect(x,this.height-barHeight,barWidth,barHeight);
        x+=barWidth;
    }
}

const Canvas = observer(()=>{
    const {audioAnalyzer,isPlaying} = MusicPlayerStore;
    const canvasWrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const requestAnimationRef = useRef(null);

    const canvasInit = useCallback(()=>{
        if(canvasRef.current){
            canvasResizeFunc();
            canvasRef.current.getContext('2d').fillStyle = 'rgba(255,255,255,0.25)';
            canvasRef.current.getContext('2d').fillRect(0,0,canvasRef.current.width,canvasRef.current.height);
        }
    },[canvasRef.current,canvasWrapperRef.current]);

    const canvasResizeFunc = useCallback(()=>{
        if(canvasWrapperRef.current&&canvasRef.current){
            const style = document.defaultView.getComputedStyle(canvasWrapperRef.current);
            const {width,height} = style;
            canvasRef.current.width = parseFloat(width);
            canvasRef.current.height= parseFloat(height);
        }
    },[canvasWrapperRef.current,canvasRef.current]);

    const loopingFunction=useCallback(()=>{
        if(audioAnalyzer&&canvasRef.current){
            /* console.log(audioAnalyzer); */
            requestAnimationRef.current = window.requestAnimationFrame(loopingFunction);
            const {frequencyBinCount} = audioAnalyzer;
            let audioDataArray = new Uint8Array(frequencyBinCount);
            audioAnalyzer.getByteFrequencyData(audioDataArray);
            draw.call(canvasRef.current,audioDataArray);
        }   
    },[audioAnalyzer,canvasRef.current])

    useEffect(()=>{
        if(audioAnalyzer){
            isPlaying?loopingFunction():window.cancelAnimationFrame(requestAnimationRef.current);
        }
    },[isPlaying])

    useEffect(()=>{
        if(audioAnalyzer){
            canvasInit();
            window.addEventListener("resize",canvasResizeFunc);
            return ()=>{
                window.removeEventListener("resize",canvasResizeFunc);
                //canvasRef.current=null;
                canvasRef.current&&canvasRef.current.getContext('2d').clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
                if(requestAnimationRef.current){
                    window.cancelAnimationFrame(requestAnimationRef.current);
                    requestAnimationRef.current=null;
                }
            }
        }
    },[audioAnalyzer]);

    return (
        <CanvasWrapper ref={canvasWrapperRef} className="canvas-wrapper">
            <canvas ref={canvasRef}/>
        </CanvasWrapper>
    )
})

export default Canvas;