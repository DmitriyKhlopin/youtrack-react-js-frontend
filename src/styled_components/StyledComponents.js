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
    text-decoration: none;
`;

export const CustomA = styled.a`
    color: white;
    text-decoration: none;
`;

export const ContainerWithSidebar = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: row; 
    flex-wrap: no-wrap;
    width: 100%;
    justify-content: center;
`;

export const FlexContent = styled.div`
    display: flex;
    padding: 0px;
    margin: 0px;
    flex-flow: row wrap;
    justify-content: start;
    height:auto;
`;


export const HoverButton = styled.button`
    width: calc(100% - 16px);
    height: 48px
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 8px 8px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }        
`;

export const HoverButtonSmall = styled.button`
    height: 48px;
    border: none;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    border-color: rgba(0,0,0,0);
    outline: 0;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }        
`;

export const DataContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flexStart;
    align-items: stretch;
    margin-top: 16px;
`;

