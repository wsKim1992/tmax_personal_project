import styled from "styled-components";

export const SignUpEmailAuthBox = styled.div`
    width:100%;height:100%;
    padding:15px;
    box-sizing:border-box;
    .form{
        width:100%;height:100%;
        .form-wrapper{
            width:100%;height:100%;
            display:flex;
            flex-direction:column;
            justify-content:space-evenly;
            align-items:center;
            .title-box{
                height:auto;
                padding:5px 0;
                >h2{
                    font-size:25.5px;
                }
            }
            .button-box{
                width:100%;
                height:auto;
                margin-top:10px;
                display:flex;
                flex-direction:row;
                justify-content:center;
                >.button{
                    cursor:pointer;
                    font-size: 11.5px;
                    padding: 12.5px 6.5px;
                    color: #fff;
                    background: #FF4D5C;
                    border-radius: 4.5px;
                    &:hover{
                        background:${props => props.theme.bodyBgColor};
                    }
                }
            }
            .input-wrapper{
                width:95.5%;height:81.5px;
                border-radius:5.5px;
                >h3{
                    height:auto;
                    line-height:25.5px;
                    width:100%;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    justify-content:space-between;
                    font-weight:bold;
                    font-size:var(--header-menu);
                    >label{
                        font-weight:bold;
                    }
                    >.error-message-component{
                        font-weight:400;
                        font-size:12.5px;
                        max-width: 350.5px;
                        color:${props => props.theme.emphasize};
                    }
                }
                .input-box{
                    height:calc(100% - 25.5px);
                    display:block;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    justify-content:flex-start;
                    input{
                        display:block;
                        width:100%;
                        height:100%;
                        border-radius:4.5px;
                        font-size:var(--header-menu);
                        padding: 0;
                        margin: 0;
                        border: none;
                        box-shadow:0px 0px 4.5px #454545;
                    }
                    .button{
                        display:block;
                        cursor:pointer;
                        height:95.5%;
                        font-size: 11.5px;
                        width:18.5%;
                        color: #fff;
                        background: #FF4D5C;
                        border-radius: 4.5px;
                        &:hover{
                            background:${props => props.theme.bodyBgColor};
                        }
                    }
                    input:focus{
                        box-shadow:0px 0px 4.5px ${props => props.theme.emphasize};
                    }
                    &.input-email{
                        justify-content:space-between;
                        input{
                            width:75.5%;
                        }
                    }
                }
            }
        }
    }
`;