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
    width: 10vw;
    justify-content: end;
    align-items: center;
    :hover{
        background-color: rgba(192,192,192,0.5);
    }
`;

export const ContainerFiltroData = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between; 
  align-items: center;
  gap: 10px; 
  margin-top: 10px; 
`;


export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const Select = styled.select`
  height: auto; /* Ajusta a altura automaticamente */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px
  font-size: 1em;
  color: #555;
  width: 100%; /* Ocupa a largura total */

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
  }
`;


const estilizarIconeFiltro = (IconeBase) => styled(IconeBase)`
    display: flex;
    height: 80%;
    width: 20%;
    border-width: 0;
    border-radius: 10px;
    background: transparent;
    justify-content: center;
    align-items: center;
    pointer-events: auto; 
    padding: 3px;
    box-sizing: border-box;
    margin:0 2px;
    border: 1px solid gray;
`;

export const RefreshIconeFiltro = estilizarIconeFiltro(RiRefreshFill);
export const FilterIconeFiltro = estilizarIconeFiltro(FaFilter);
export const FilterDollarIconeFiltro = estilizarIconeFiltro(FaFilterCircleDollar);
