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
    @media screen and (max-width:770px){
        .title-text{
            position:absolute;
            top:25.5%;left:50%;
            transform:translateX(-50%);
            display:flex;
            justify-content: center;
            width: 100%;
            div{
                span{
                    display:inline-block;
                    font-size:58.5px;
                }    
            }
            div+div{
                margin-left:15.5px;
            }
            
            &.sub-title{
                div{
                    span{
                        font-size:30px;
                    }
                }
                
            }
        }
    }
    @media screen and (max-width:680px){
        .title-text{
            position:absolute;
            top:25.5%;left:50%;
            transform:translateX(-50%);
            display:flex;
            justify-content: center;
            width: 100%;
            div{
                span{
                    display:inline-block;
                    font-size:48.5px;
                }    
            }
            div+div{
                margin-left:15.5px;
            }
            
            &.sub-title{
                div{
                    span{
                        font-size:23.5px;
                    }
                }
                
            }
        }
    }
    @media screen and (max-width:560px){
        .title-text{
            position:absolute;
            top:35.5%;
            display:flex;
            div{
                span{
                    display:inline-block;
                    font-size:38.5px;
                }    
            }
            div+div{
                margin-left:15.5px;
            }
            
            &.sub-title{
                div{
                    span{
                        font-size:15.5px;
                    }
                }
                
            }
        }
    }
    @media screen and (max-width:450px){
        .title-text{
            position:absolute;
            top:35.5%;
            display:flex;
            div{
                margin-left:15.5px;
                margin-bottom: 5.5px;
                span{
                    display:inline-block;
                    font-size:38.5px;
                }    
            }
            
            &.sub-title{
                flex-direction:column;

                div{
                    span{
                        font-size:15.5px;
                    }
                }
                
            }
        }
    }
`;