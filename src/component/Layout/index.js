import React,{useEffect} from 'react';
import styled from 'styled-components';
import Header from '../Header';
import GetUserData from '../../react-query/getUserData';
const EntireLayOutContainer = styled.div`
    width:100%;height:100%;
    min-height:${window.innerHeight}px;
    background-image:linear-gradient(
        45deg,
        ${props=>props.theme.bodyBgColor},
        ${props=>props.theme.headerBgColor}
    );
`;

const EntireLayoutWrapper = styled.div`
    width:95%;height:calc(100vh - 65.5px);
    margin:0 auto;
    @media screen and (max-width:770px){
        width:100%;height:100vh;    
        overflow: hidden;
    }
`;

const Layout = ({children})=>{
    const {UserData} = GetUserData();

    return (
        <EntireLayOutContainer>
            <Header/>
            <EntireLayoutWrapper>
                {children}
            </EntireLayoutWrapper>
            
        </EntireLayOutContainer>
    )
}

export default Layout;