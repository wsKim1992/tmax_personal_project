import styled from "styled-components"
export const ImageBox = styled.div`
    width:100%;height:100%;
    .image-box{
        opacity:0;
        width:100%;height:100%;
    }
`

export const TitleComponent = styled.div`
    .title-text{
        position:absolute;
        top:25.5%;left:15.5%;
        z-index:3;
        transform-style:preserve-3d;
        perspective:300px;
        letter-spacing: 4.5px;
        display:flex;
        div{
            span{
                display:inline-block;
                font-size:75.5px;
                color:#000;
                scale:0;
                opacity:0;
                color:#fff;
                transform:translateZ(120px);
            }    
        }
        div+div{
            margin-left:15.5px;
        }
        
        &.sub-title{
            top: 50%;
            left: 50%;
            letter-spacing: 8.5px;
            transform:translate(-50%, -50%);
            div{
                span{
                    font-size:35.5px;
                    color:#000;
                    scale:0;
                    opacity:0;
                    color:#fff;
                    transform:none;
                }
            }
            
        }
    }
    
`;