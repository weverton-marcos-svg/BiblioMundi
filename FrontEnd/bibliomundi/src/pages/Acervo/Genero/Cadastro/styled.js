import { styled } from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Adicionado padding para melhor espaçamento */
`;

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 800px; /* Limita a largura máxima do formulário para melhor leitura */
  min-height: 30vh; /* Altura mínima para ocupar espaço na tela */
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para destacar o card */
`;

export const ContainerButao = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* Ocupa a largura total do formulário */
  margin-top: 20px; /* Espaço acima dos botões */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaçamento entre os campos do formulário */
  padding: 0px;
  border: none;
  background-color: transparent;
  width: 100%; /* Ocupa a largura total do Article */
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;
  width: 95%;
  border: 1px solid #e0e0e0; /* Adiciona a borda */
  border-radius: 8px; /* Opcional: para cantos arredondados */
  overflow: hidden; /* Importante para garantir que o conteúdo não vaze da borda */
  padding: 20px; /* Espaçamento interno */
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
  border-radius: 4px;
  font-size: 1em;
  color: #555;
  width: 100%; /* Ocupa a largura total */

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
  }
`;

export const UFContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const ButtonCadastro = styled.button`
  padding: 10px 20px;
  background-color: #28a745; /* Cor verde para cadastro/salvar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ButtonCancelar = styled.button`
  padding: 10px 20px;
  background-color: #dc3545; /* Cor vermelha para cancelar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;