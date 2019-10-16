import styled from "styled-components";

export const CustomSidebar = styled.div`
    margin: 8px;
    padding: 0px;
    boxShadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }    
`;

export const CustomCard = styled.div`
    min-width: calc(100% / 8);
    min-height: 20px;
    display: flex;
    flex-direction: column;
    margin: 8px;
    padding: 8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }
`;

export const CustomH4 = styled.h4`
    min-height: 20px;
    margin: auto;
`;