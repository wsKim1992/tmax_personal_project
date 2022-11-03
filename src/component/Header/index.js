import React, { memo, useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from 'styled-components'
import logoImage2 from '../../static/image/logo2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { MUSIC_PLAYER, UPLOAD_PAGE, TITLE_PAGE, SIGN_UP, SIGNUP_EMAIL_AUTH, LOG_IN } from '../../constant/PagePath';
import LogOutQuery from "../../react-query/logout";
import GetUserData from "../../react-query/getUserData";

const HeaderContainer = styled.div`
    width:100%;height:65.5px;
    background-color:${props => props.theme.headerBgColor};
    @media screen and (max-width:770px){
        display:none;
    }
`;

const HeaderWrapper = styled.div`
    width:95%;height:100%;
    margin:0 auto;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-evenly;
    .Logo-container{
        width:165.5px;
        height:45.5px;
        .Logo-wrapper{
            overflow:hidden;
            width:100%;height:100%;
            .Logo-image{
                float:left;
                height: 100%;
                border-radius: 4.5px;
                width: 45.5px;
                background-image:url(${logoImage2});
                background-repeat:no-repeat;
                background-size:contain;   
            }
            .Logo-text{
                float:left;
                width:calc(100% - 45.5px);
                color:#fff;
                font-size:var(--header-main);
            }
        }
    }
    .menu-container{
        width:auto;height:100%;
        .menu-wrapper{
            width:auto;height:100%;
            .menu{
                display:flex;
                flex-direction:row;
                align-items:center;
                height:100%;
                .menu-li{
                    user-select:none;
                    position:relative;
                    width:auto;height:100%;
                    padding:5px 15.5px;
                    box-sizing:border-box;
                    display:flex;
                    align-items: center;
                    a{
                        display:block;
                        display:flex;
                        align-items:center;
                        width:100%;height:100%;
                        >span{
                            font-size:var(--header-menu);
                            color:${props => props.theme.headerMenuFontColor};
                        }
                    }
                    
                    cursor:pointer;
                    transition:.5s border-bottom;
                    &:hover{
                        a{
                            >span{
                                color:${props => props.theme.emphasize};
                            }
                        }
                        border-bottom:1.5px solid ${props => props.theme.emphasize};
                    }
                    &.on{
                        a{
                            >span{
                                color:${props => props.theme.emphasize};
                            }
                        }
                        border-bottom:1.5px solid ${props => props.theme.emphasize};
                    }
                }
            }
        }
        &.auth-menu-container{
            .menu-wrapper{
                .menu{
                    .menu-li{
                        margin:0 3.5px;
                        padding:0;
                        a{
                            height: auto;
                            width: auto;
                            box-sizing: border-box;
                            border-radius: 4.5px;
                            background: #FF4D5C;
                            padding: 10px 15.5px;
                            span{
                                font-size:12.5px;
                            }
                        }   
                        &:hover{
                            a{
                                background: ${props => props.theme.headerMenuFontColor};
                                >span{
                                    color:${props => props.theme.emphasize};
                                }
                            }
                            border-bottom:none;
                        }
                    }
                    
                }
            }
        }
    }
    .search-container{
        width:210px;height:100%;
        .search-wrapper{
            width:100%;height:100%;
            .search-box{
                width:100%;
                height:100%;
                display:flex;
                flex-direction:row;
                align-items:center;

                input[type="text"]{
                    width: 335px;
                    height: 31.5px;
                    box-sizing:border-box;
                    padding:3.5px;
                    font-size:var(--header-search);
                    border-radius:12.5px;
                    transition:0.7s opacity, visibility;
                    opacity: 0;
                    visibility: hidden;
                }
                .search-text{
                    height:45.5px;
                    width:45.5px;
                    text-align: center;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                }
                &.on{
                    input[type="text"]{
                        opacity: 1.0;
                        visibility: visible;
                    }
                    .search-text{
                        color:${props => props.theme.emphasize};
                    }
                }
            }
        }
    }
    @media screen and (max-width:770px){
        justify-content:space-between;
        .Logo-container{
            width:auto;
            height:5.5vh;
            .Logo-wrapper{
                .Logo-image{
                    width: 5.5vh;
                    background-image:url(${logoImage2});
                    background-repeat:no-repeat;
                    background-size:contain;   
                }
                .Logo-text{
                    margin-left:10.5px;
                    line-height:5.5vh;
                    width:auto;
                    font-size:var(--tablet-header-main);
                }
            }
        }
        .menu-container{
            display:none;
        }
        .search-container{
            width:210px;height:100%;
            .search-wrapper{
                width:100%;height:100%;
                .search-box{
                    width:100%;
                    height:100%;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
    
                    input[type="text"]{
                        width: 335px;
                        height: 31.5px;
                        box-sizing:border-box;
                        padding:3.5px;
                        font-size:var(--header-search);
                        border-radius:12.5px;
                        transition:0.7s opacity, visibility;
                        opacity: 0;
                        visibility: hidden;
                    }
                    .search-text{
                        height:45.5px;
                        width:45.5px;
                        text-align: center;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor:pointer;
                    }
                    &.on{
                        input[type="text"]{
                            opacity: 1.0;
                            visibility: visible;
                        }
                        .search-text{
                            color:${props => props.theme.emphasize};
                        }
                    }
                }
            }
        }   
    }
`;


const Header = memo(() => {
    const searchInputRef = useRef(null);
    const [showSearchInput, setShouwSearchInput] = useState(false);

    const onClickSearchButton = useCallback(() => {
        setShouwSearchInput(prev => !prev);
    }, [])
    const {
        respData, mutate: logOutMutate,
        isLoading: logOutLoading, isSuccess,
        isError, error
    } = LogOutQuery();

    const {
        UserData
    } = GetUserData();

    const navigate = useNavigate();

    useEffect(() => {
        if (!logOutLoading) {
            if (isSuccess) {
                window.alert("로그아웃 성공 메인 페이지로 이동합니다.");
                navigate(`/${TITLE_PAGE}`);
            } else if (isError) {
                window.alert(error.message);
            }
        }
    }, [
        logOutLoading, isSuccess,
        isError, error
    ])

    const onClickLogOut = useCallback(() => {
        if (logOutLoading) return false;
        logOutMutate();
    }, [logOutLoading])

    return (
        <HeaderContainer>
            <HeaderWrapper showSearchInput={showSearchInput}>
                <div className="Logo-container">
                    <div className="Logo-wrapper">
                        <p className="Logo-image"></p>
                        <p className="Logo-text">
                            MUSIC
                        </p>
                    </div>
                </div>
                <div className="menu-container">
                    <div className="menu-wrapper">
                        <ul className="menu">
                            <li className="menu-li">
                                <Link to={TITLE_PAGE}>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="menu-li">
                                <Link to={MUSIC_PLAYER}>
                                    <span>Music Player</span>
                                </Link>
                            </li>
                            <li className="menu-li">
                                <Link to={UPLOAD_PAGE}>
                                    <span>Upload</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="menu-container auth-menu-container">
                    <div className="menu-wrapper">
                        <ul className="menu">
                            {UserData ? (
                                <>
                                    <li className="menu-li">
                                        <a href="#" onClick={onClickLogOut}>
                                            <span>Log Out</span>
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="menu-li">
                                        <Link to={`${LOG_IN}`}>
                                            <span>Log In</span>
                                        </Link>
                                    </li>
                                    <li className="menu-li">
                                        <Link to={`${SIGN_UP}/${SIGNUP_EMAIL_AUTH}`}>
                                            <span>Sign Up</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                {/* <div className="search-container">
                    <div className="search-wrapper">
                        <div className={`${showSearchInput ? 'search-box on' : 'search-box'}`}>
                            <input ref={searchInputRef} type="text" placeholder="찾으실 곡의 이름을 입력 해주세요" />
                            <p className="search-text" onClick={onClickSearchButton}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </p>
                        </div>
                    </div>
                    <div className="">

                    </div>
                </div> */}
            </HeaderWrapper>
        </HeaderContainer>
    )
})

export default Header;