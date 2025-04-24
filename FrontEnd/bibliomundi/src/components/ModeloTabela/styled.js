import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
`;

export const StyledThead = styled.thead`
  background-color: #f2f2f2;
`;

export const StyledTh = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  width: ${props => props.largura || 'auto'};
  white-space: nowrap; /* Evita quebra de linha no cabeçalho */
`;

export const StyledTbody = styled.tbody``;

export const StyledTr = styled.tr`
  height: 2.5vh; /* Altura fixa da linha */
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:last-child td {
    border-bottom: none;
  }
`;

export const StyledTd = styled.td`
  padding: 8px 12px; /* Reduzindo o padding vertical */
  border-bottom: 1px solid #ddd;
  width: ${props => props.largura || 'auto'};
  overflow: hidden; /* Garante que o conteúdo não vaze da célula */
  text-overflow: ellipsis; /* Adiciona "..." para indicar conteúdo oculto */
  white-space: nowrap; /* Evita quebra de linha no conteúdo */
`;

export const ActionsTd = styled(StyledTd)`
  text-align: center;
  display: flex; /* Para alinhar os botões lado a lado */
  justify-content: center; /* Centraliza os botões horizontalmente */
  align-items: center; /* Centraliza os botões verticalmente */
  padding: 8px; /* Reduzindo o padding */
`;

export const ActionButton = styled.button`
  background-color: transparent;
  color: #777; /* Cor mais discreta */
  border: none; /* Remove a borda */
  border-radius: 5px;
  padding: 6px 8px; /* Reduzindo o padding */
  margin-left: 5px; /* Espaço entre os botões */
  cursor: pointer;
  font-size: 0.85em; /* Tamanho da fonte menor */

  &:hover {
    background-color: #eee;
    color: #333;
  }

  svg {
    vertical-align: middle;
    margin-right: 3px;
  }

  &:first-child {
    margin-left: 0; /* Remove a margem do primeiro botão */
  }
`;

export const StyledTrInativo = styled(StyledTr)`
  opacity: 0.6; /* Diminui a opacidade para indicar inatividade */
  font-style: italic; /* Adiciona itálico */
  text-decoration: line-through; /* Adiciona um risco */
  color: #888; /* Cor mais clara */
`;