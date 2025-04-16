import styled from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa'; 


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaçamento entre os campos do formulário */
  padding: 35px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-width: 70%;
  
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  color: #555;

  &:focus {
    outline: none;
    border-color: #007bff; /* Cor de destaque ao receber foco */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra suave ao receber foco */
  }
`;

export const Main = styled.main`
  display:flex;
  width: 100%;
  justify-content:center;

`;

export const Article = styled.article`
  display:flex;
  flex-direction:column;
  width:90%;
  height:90vh;
  align-items: center;
`;

export const ButtonCadastro = styled.button`
    height:3.5vh;
    width:15vw;
    color:white;
    font-size: 1em;
    background-color:green;
    border-radius: 15px;
    padding: 5px;
`;

export const ButtonCancelar= styled.button`
    height:3.5vh;
    width:15vw;
    font-size: 1em;
    color:white;
    background-color:rgba(255, 0, 0, 0.6);
    border-radius: 15px;
    padding: 5px;
`;

export const Span = styled.span`
  font-size:0.6em;
  font-weight: Bold;
  color:gray;
`;

export const Select = styled.select`
  height:4vh;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  color: #555;

  &:focus {
    outline: none;
    border-color: #007bff; /* Cor de destaque ao receber foco */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra suave ao receber foco */
  }
`;

export const ContainerButao = styled.div`
  display:flex;
  justify-content: space-between;
`;

export const InputFieldDate = styled.input`
  padding: 0.7rem;
  padding-right: 2.5rem; /* Espaço para o seu ícone */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

export const CalendarIcon = styled(FaCalendarAlt)`
  position: absolute;
  top: 50%;
  right: 0.7rem;
  transform: translateY(-50%);
  color: #aaa;
  cursor: pointer; /* Indica que o ícone é clicável */
`;

export const InputContainerData = styled.div`
  position: relative;
  width: 100%;
`;
