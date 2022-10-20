import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faList } from '@fortawesome/free-solid-svg-icons';
import {MUSIC_PLAYER,UPLOAD_PAGE,TITLE_PAGE} from '../../constant/PagePath';

const MobileHeaderBox = styled.div`
    display:none;
    @media screen and (max-width:770px){
        display:block;
        width:100%;height:auto;
        .header-for-mobile{
            position:absolute;
            top:25px;left:0%;
            z-index:3;
            width:100%;height:28.5px;
            background:transparent;
            display:flex;flex-direction:row;
            align-items:center;
            justify-content:${props=>props.pathname===`/${UPLOAD_PAGE}`?'space-between':'space-evenly'};
            &.show-memu{
                .menubar-container{
                    display:block;
                }
            }
            .menubar-container{
                display:none;
                position:absolute;
                top:105%;left:${props=>props.pathname===`/${UPLOAD_PAGE}`?'0.5%':'5.5%'};;
                z-index:2;
                background-color:#000;
                width:155.5px;height:auto;
                padding:5.5px;
                box-sizing:border-box;
                border-radius:4.5px;
                .menubar-wrapper{
                    width:100%;height:auto;
                    .menubar-menu{
                        margin:10.5px 0;
                        text-align:center;
                        width:100%;height:25px;
                        line-height:25px;
                        border-radius:4.5px;
                        padding:2.5px;
                        box-sizing:border-box;
                        background:${props => props.theme.headerBgColor};
                        &:hover{
                            background-image:linear-gradient(45deg,#ff4d5c,#1F2125);
                        }
                        &.on{
                            background-image:linear-gradient(45deg,#ff4d5c,#1F2125);
                        }
                        a{
                            display:block;
                            width:100%;height:100%;
                            color:#fff;
                            font-size:var(--tablet-body-text);
                        }
                    }
                }
            }
            
            .menubar-box{
                width:25.5px;height:25.5px;
                line-height:25.5px;
                border-radius:4.5px;
                background-image:linear-gradient(311deg,#636461,#1F2125);
                box-shadow:0px 0px 4.5px #454545;
                font-size:var(--tablet-body-icon);
                color:#fff;
                text-align:center;
                &:hover{
                    background-image:linear-gradient(45deg,#636461,#1F2125);
                    color:${props => props.theme.emphasize};
                }
                position:relative;
                
            }
            .search-box{
                width:calc(100% - 155.5px);height:25.5px;
                display:flex;flex-direction:row;
                align-items:center;
                justify-content:space-between;
                .search-input-box{
                    width:calc(100% - 35.5px);height:100%;
                    >input[type="text"]{
                        display:block;
                        width:0%;height:100%;
                        padding:0px;box-sizing:border-box;
                        font-size:var(--tablet-header-search);
                        color:#454545;
                        border-radius:12.5px;
                        transition : .5s width;
                        border:none;
                    }
                    &.show{
                        >input[type="text"]{
                            width:100%;
                            padding:5.5px;
                        }
                    }                            
                }
                .search-button{
                    width:25.5px;height:25.5px;
                    line-height:25.5px;
                    border-radius:4.5px;
                    background-image:linear-gradient(311deg,#636461,#1F2125);
                    box-shadow:0px 0px 4.5px #454545;
                    font-size:var(--tablet-body-icon);
                    color:#fff;
                    text-align:center;
                    &:hover{
                        background-image:linear-gradient(45deg,#636461,#1F2125);
                        color:${props => props.theme.emphasize};
                    }
                }
            }
        }
    }
`;

const MobileHeader = memo(() => {
    const [showMenuBar,setShowMenuBar] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const {pathname} = useLocation();

    const onClickMenuBar = useCallback((evt)=>{
        setShowMenuBar(prev=>!prev);
    },[]);

    const onClickShowSearchBox = useCallback((evt) => {
        setShowSearchBox(prev => !prev);
    }, []);

    return (
        <MobileHeaderBox pathname={pathname}>
            <div className={`${showMenuBar ? 'header-for-mobile show-memu' : 'header-for-mobile'}`}>
                <div className="menubar-box" onClick={onClickMenuBar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {
                    (pathname===`/${MUSIC_PLAYER}`||
                    pathname===`/${TITLE_PAGE}`)
                    &&
                    (
                        <div className="search-box">
                            <p className={`${!showSearchBox ? 'search-input-box' : 'search-input-box show'}`}>
                                <input id="search-input" type="text" placeholder='검색어를 입력해 주세요' />
                            </p>
                                <p className="search-button" onClick={onClickShowSearchBox}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </p>
                        </div>
                    )
                }
                {
                    pathname===`/${UPLOAD_PAGE}`
                    &&
                    (
                        <div className='menubar-box'>
                            <FontAwesomeIcon icon={faList}/>
                        </div>   
                    )
                }
                <div className="menubar-container">
                    <div className='menubar-wrapper'>
                        <p className={pathname===`/${TITLE_PAGE}`?'menubar-menu on':'menubar-menu'}>
                            <Link to={`/${TITLE_PAGE}`}>
                                Home
                            </Link>
                        </p>
                        <p className={pathname===`/${MUSIC_PLAYER}`?'menubar-menu on':'menubar-menu'}>
                            <Link to={`/${MUSIC_PLAYER}`}>
                                Music Player
                            </Link>
                        </p>
                        <p className={pathname===`/${UPLOAD_PAGE}`?'menubar-menu on':'menubar-menu'}>
                            <Link to={`/${UPLOAD_PAGE}`}>
                                Upload
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </MobileHeaderBox>
    )
})

export default MobileHeader;