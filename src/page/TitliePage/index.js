import React,{memo} from 'react';
import styled from 'styled-components';
import FirstPageComponent from '../../component/TitlePage/FirstPageComponent';

const EntireContainer =  styled.div`
    width:100%;height:100%;
`;

const EntireWrapper = styled.div`
    width:100%;height:100%;
    box-sizing:border-box;
    overflow:auto;
    &::-webkit-scrollbar{
        width:2.5px;
    }
    &::-webkit-scrollbar-track{
        width:2.5px;
        background-color:#000;
        border-radius:4.5px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius:4.5px;
        background:#454545;
        box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    }
`;

const TitlePage = memo(()=>{
    return(
        <EntireContainer>
            <EntireWrapper>
                <FirstPageComponent/>
            </EntireWrapper>
        </EntireContainer>
    )
})

export default TitlePage;
