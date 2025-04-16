import styled from "styled-components";

export const HeaderPageNotFound = styled.header`
    display: flex;
    flex-direction: column;
    text-align:center;
    height:10vh;
    width:100vw;
    background-color: #ADD8E6;
`;

export const MainPageNotFound = styled.main`
    display:flex;
    flex-direction: row;
    height:90vh;
    width:100vw;
    background-color: #ADD8E6;
`;

export const Img = styled.img`
    width: 110%;
    height: 60%;
`;

export const Titulo = styled.h1`
    font-size: 4em;
    Color: red;
`;

export const ContainerImg = styled.article`
    
    display:flex;
    align-content: flex-end;
    width: 40%;
    align-content: end;
    flex-wrap: wrap;
    justify-content:end;
`;

export const ContainerMensagem = styled.article`
    display: flex;
    width: 60%;
    justify-content: center;
    padding: 10%;
    padding-top: 25%
    box-sizing: border-box;

`;

export const Mensagem = styled.p`
    font-size: 2em;
    font-weight: 700;
    font-style: italic;
    border-radius: 5px;
    background-color: #DDDDDD;
    height: fit-content;
    padding: 1em;
`;