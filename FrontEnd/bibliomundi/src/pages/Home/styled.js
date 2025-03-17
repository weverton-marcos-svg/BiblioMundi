import styled from 'styled-components'

export const PageHeader = styled.header`
    display:flex;
    flex-direction: row;
    height: 10vh;
    width: 100vw;
    justify-content: space-evenly;
    margin: 0;
    padding:0;
    border: 1px solid;
    box-sizing: border-box;
    padding-top: 5px;
`;

export const NavHeader = styled.nav`
    display: flex;
    width:33.33%;
    align-items:center;
`;

export const ListaOpcao = styled.ul`
    display: flex;
    flex-direction: row;
    border: 1px solid;
    padding: 0.6em;
    width: 75%;
    justify-content: space-evenly;
    background-color: #FFFFFE;
    border-radius: 0.5em;
    box-sizi
`;
export const Opcao = styled.li`
    list-style-type: none;
    font-size:1em;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transição suave */
    box-sizing: border-box;
    padding:5px;
    background-color: #FFFFFE;
    font-weight: normal;
    &:hover{
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
        transform: translateY(-5px); /* Move o item para cima */
        padding: 2px;
    }
`;

export const ContainerImagem = styled.div`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    width: 33.33%;
`;

export const ImgLogo = styled.img`
    border-left: 1px solid;
    border-right: 1px solid;
    box-sizing: content-box;
    border-radius: 25%;
    width: 20%;
    border-bottom: 1px solid white;
    height: 100%;
`;