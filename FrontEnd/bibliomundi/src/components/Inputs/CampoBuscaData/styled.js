import styled from "styled-components";

export const PageFiltro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
`;


export const Titulo = styled.label`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 2px; /* Adiciona um pequeno espaço abaixo do título */
`;

export const Campo = styled.input`
  box-sizing: border-box;
  font-size: 1.2em;
  border-radius: 5px;
  height: 40px; /* Aumenta a altura do campo */
  width: 100%; /* Cada campo ocupa a largura disponível dentro do seu container pai */
  padding: 8px 10px; /* Adiciona um preenchimento interno para melhor aparência */
  border: 1px solid #ccc; /* Adiciona uma borda mais visível (opcional) */

  /* Remove as setas padrão em alguns navegadores para inputs do tipo date */
  &::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
    display: block;
    background: transparent;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;