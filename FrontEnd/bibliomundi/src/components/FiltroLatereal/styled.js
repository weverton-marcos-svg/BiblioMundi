import { styled } from 'styled-components';

export const FiltroLateralContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Ocupa toda a largura */
  height: 100%; /* Ocupa toda a altura */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente para o efeito de destaque */
  display: flex;
  justify-content: flex-start; /* Alinha o conteúdo à esquerda */
  align-items: flex-start; /* Alinha o conteúdo ao topo */
  z-index: 1000; /* Garante que o modal fique acima de tudo */
`;

export const FiltroConteudo = styled.aside`
  background-color: white;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 20vw; /* Largura da aba de filtros */
  height: 100%; /* Altura automática para o conteúdo */
  max-height: 90vh; /* Opcional: define uma altura máxima */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for muito grande */
  position: relative; /* Necessário para posicionar o botão de fechar */
`;

export const BotaoFechar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.7em;
  :hover{
    border-radius:100%;
    box-sizing:border-box;
    padding:5px;
    color: red;
    background-color:rgb(192,192,192,0.5);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  }
`;

export const BotaoAceitar = styled.button`
  width:45%;
  height:4.5vh;
  background-color: green;
  color: white;
  border-radius:10px;
  font-size:0.9em;
  font-weight:bold;
  padding: 5px;
  box-sizing:border-box;
`;

export const BotaoLimpar = styled.button`
  width:45%;
  height:4.5vh;
  background-color: red;
  color: white;
  border-radius:10px;
  font-size:0.9em;
  font-weight:bold;
  padding: 5px;
  box-sizing:border-box;
`;

export const ContainerButton = styled.div`
  display:flex;
  width:100%;
  bottom:0;
  left:0;
  position: absolute;
  height: 5vh;
  justify-content: space-evenly;
  align-items: center;
  margin-top:5px;
`;