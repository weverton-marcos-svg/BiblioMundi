import styled from 'styled-components'

export const PageHeader = styled.header`
    display:flex;
    flex-direction: row;
    height: 10vh;
    width: 90vw;
    align-items: center;
    margin-left:auto;
    margin-right:auto;
    margin-top: 1vh;
    border: 1px solid black;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 5px;
`;

export const NavHeader = styled.nav`
    display: flex;
    flex:1;
    align-items: center;
    padding: 0;
    max-height: 85%;
    min-height: 55%;
    border: 1px solid;
    border-radius: 10px;
    // box-sizing: border-box;
    // padding: 5px;
`;

export const ListaOpcao = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: transparent;
    align-items: center;
    margin: 0;
    box-sizing: border-box;
    padding: 0px;
`;

export const Opcao = styled.li`
    position: relative;
    height:fit-content;
    list-style-type: none;
    font-size:1rem;
    width: 100%;
    height: fit-content;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transição suave */
    background-color:transparent;
    text-align: center;
    color: ${props => props.habilitado ? "black" : "gray"};
    pointer-events: ${props => props.habilitado ? "auto" : "none"};
    font-weight:700;

    &:hover{ ${props => props.habilitado ? `
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); 
        border-radius: 10px;
        transform: translateY(-5px); /* Move o item para cima */
        padding: 2px; ` : ""}
    }
`;

export const ContainerImagem = styled.div`
    display: flex;
    height: 100%;
    flex:1;
`;

export const ImgLogo = styled.img`
    width: 20%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
`;

export const ContainerUser = styled.div`
    display: flex;
    height: 100%;
    justify-content: end;
    flex-direction: row;
    flex:1;
    box-sizing: border-box;
    padding: 0.3em;
`;

export const NameUser = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-top:auto;
    margin-bottom:auto;
`;

export const ImgUser = styled.img`
    height: 100%;
    width:13%;
    border: 1px solid black;
    border-radius: 50%;
    margin-left:15px;
`;

export const Main = styled.main`
    display:flex;
    flex-direction: column;
    height:80vh;
    width:100%;
    align-items: center;
    justify-content: center;
`;

// Example for a new styled component for the sub-menu
export const SubMenu = styled.ul`
  position: absolute;
  top: 100%; 
  width: 180%;
  background-color: white; 
  border: 1px solid #ccc;
  list-style: none;
  padding: 5px 10px;
  margin: 1px 0;
  z-index: 2;
  min-width: 150px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); 
`;

export const SubMenuItem = styled.li`
  padding: 6px 0px;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    background-color: #f1f1f1;
    border-radius: 25px;
    font-weight: 700;
  }
`;