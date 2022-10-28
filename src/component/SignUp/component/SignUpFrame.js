import styled from "styled-components";

export const EntireContainer = styled.div`
    width:100%;height:100%;
`;

export const EntireWrapper = styled.div`
    width:100%;height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    .page-component{
        width:60vh;height:60vh;
        box-shadow:0px 0px 4.5px rgba(45,45,45,0.65);
        border-radius:12.5px;
        background-color:#fff;
        font-size:14.5px;

    }
    
    @media screen and ( max-width : 2200px ) or ( orientation : landscape ){
        .page-component{

        }
    }
`;