import styled from "styled-components";
import { FaFilter,FaFilterCircleDollar } from "react-icons/fa6";
import { RiRefreshFill } from "react-icons/ri";

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: 80vh;
    margin: 10px auto;
`;

export const  Article = styled.article``;

export const ContainerFiltro = styled.section`
    display: flex;
    height:8vh;
    flex-direction: row;
    justify-content: end;
    align-items: center;
`;

export const ContainerResultado = styled.section`
    height: 70vh;
`;

export const AgrupamentoFiltro = styled.div`
    display: flex;
    flex-direction: row;
    height: 50%;
    width: 6vw;
    justify-content: end;
    align-items: center;
    :hover{
        background-color: rgba(192,192,192,0.5);
    }
`;

const estilizarIconeFiltro = (IconeBase) => styled(IconeBase)`
    display: flex;
    height: 80%;
    width: 15%;
    border-width: 0;
    border-radius: 10px;
    background: transparent;
    justify-content: center;
    align-items: center;
    pointer-events: auto; 
    padding: 0 5px;
    margin:0 2px;
`;

export const RefreshIconeFiltro = estilizarIconeFiltro(RiRefreshFill);
export const FilterIconeFiltro = estilizarIconeFiltro(FaFilter);
export const FilterDollarIconeFiltro = estilizarIconeFiltro(FaFilterCircleDollar);

export const BotaoCadastro = styled.button`
    width: auto;
    height: 2.2em;
    border-radius: 10px;
    border: 1px solid;
    background-color: green;
    color: white;

    box-sizing: border-box;
    padding: 1px 10px;
`;

export const ButtoAcao = styled.button`
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid black;
`;

export const ContainerFiltroData = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between; 
  align-items: center;
  gap: 10px; 
  margin-top: 10px; 
`;