import styled from 'styled-components'

export const PageHeader = styled.header`
    display:flex;
    flex-direction: row;
    height: 10vh;
    width: 100vw;
    justify-content: center;
    margin: 0;
    padding:0;
    box-sizing: border-box;
    padding-top: 5px;
`;

export const NavHeader = styled.nav`
    display: flex;
    width:30%;
    justify-content:center;
    border-bottom: 1px solid black;
    border-bottom-left-radius: 1em;
    border-top-left-radius: 1em;
    border-top: 1px solid;
    border-left: 1px solid;
    
`;

export const ListaOpcao = styled.ul`
    display: flex;
    flex-direction: row;
    border: 1px solid;
    padding: 0.6em;
    width: 75%;
    justify-content: center;
    background-color: #FFFFFE;
    border-radius: 0.5em;
    box-sizing: border-box;
`;
export const Opcao = styled.li`
    list-style-type: none;
    font-size:1em;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transição suave */
    box-sizing: border-box;
    padding:5px;
    background-color: #FFFFFE;
    font-weight: 700;
    color: ${props => props.habilitado ? "black" : "gray"};
    font-weight:700;
    &:hover{ ${props => props.habilitado ? `
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
        transform: translateY(-5px); /* Move o item para cima */
        padding: 2px; ` : ""}
    }
`;

export const ContainerImagem = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
`;

export const ImgLogo = styled.img`
    width: 20%;
    height: 100%;
`;

export const ContainerUser = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:end;
    width:30%;
    box-sizing: border-box;
    padding: 0.3em;
    border-bottom: 1px solid black;
    border-bottom-right-radius: 1em;
    border-top-right-radius: 1em;
    border-top: 1px solid;
    border-right: 1px solid;
`;

export const ImgUser = styled.img`
    border: 1px solid black;
    border-radius: 50%;
    margin-left:3em;
`;

export const Main = styled.main`
    display:flex;
    height:80vh;
    width:90vw;
    flex-direction:column;
    align-items:center;
    text-align:center;
    border:1px solid black;
    border-radius:10px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 1vh;
    margin-bottom: 1vh;
`;
