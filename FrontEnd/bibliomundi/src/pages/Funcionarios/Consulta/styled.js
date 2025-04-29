import styled from "styled-components";

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
    height: 100%;
    width: 6vw;
    justify-content: end;
    align-items: center;
`;

export const IconeFiltro = styled.div`
    display: flex;
    height: 2vh;
    width: 2vw;
    border: 1px solid black;
    border-radius: 5px;
    padding: 4px;
    justify-content: center;
    background-color: whitesmoke;
    margin-right: 5px;
`;

export const BotaoCadastro = styled.button`
    width: auto;
    height: 2.5em;
    border-radius: 6px;
    border: 1px solid;
    background: transparent;
    background-color: green;
    color: white;
`;

export const TableModel = styled.table`
    // display: flex;
    // flex-direction: column;
    height: 70vh;
    width:90vw;
    // border: 1px solid black;
    // border-radius: 10px;
`;

export const Thead = styled.thead`
    width: 100%;
    background-color: #D5D5D5;
    height: 5vh;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid;
    box-sizing: border-box;
    border-spacing: 0;
`;

export const Th = styled.th`
    width: ${props => props.largura};
    text-align: center;
    padding: 0;
    height: 5vh;
`;

export const ThAcao = styled.th`
    width: ${props => props.largura};
    text-align: center;
    padding: 0;
`;

Th.defaultProps = {
    largura: "10vw"
};

ThAcao.defaultProps= {
    largura: "10vw"
};

export const Tbody = styled.tbody`
    height: 100%;
    width: 100%;
    border-spacing: 0;
`;

export const Tr = styled.tr`
   border-spacing: 0;
   width: 100%;
    &:nth-child(odd) {
        background-color: rgb(200,200,200) /* Cor de fundo para linhas pares */
    };
    text-decoration: ${props => props.inativo ? 'line-through' : 'none'};
`;

export const Td = styled.td`
    width: ${props => props.largura};
    text-align: center;
    padding: 0;
    box-sizing: border-box;
    border-spacing: 0;
`;

Td.defaultProps = {
    largura: "10vw"
};

export const ButtoAcao = styled.button`
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid black;
`;

export const ContainerFiltroData = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between; /* Distribui o espaço entre os campos */
  align-items: center; /* Alinha verticalmente os itens (opcional) */
  gap: 10px; /* Adiciona um espaçamento entre os campos */
  margin-top: 10px; /* Adiciona um pouco de margem acima dos campos de data */
`;