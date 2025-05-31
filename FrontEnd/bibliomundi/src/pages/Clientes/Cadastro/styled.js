import {styled} from 'styled-components';

export const Main = styled.main`
  display:flex;
  flex-direction:column;
  width: 100%;
  justify-content:center;
  align-items:center;
`;

export const Article = styled.article`
  display:flex;
  flex-direction:column;
  width:90%;
  height:90vh;
  align-items: center;
`;

export const ContainerButao = styled.div`
  display:flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaçamento entre os campos do formulário */
  padding: 0px;
  border:none;
  background-color: transparent;
  width: 50%;
  max-width: 70%;
  
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  backgroud: transparent;
  width: 100%;
  border: 1px solid #e0e0e0; /* Adiciona a borda */
  border-radius: 8px; /* Opcional: para cantos arredondados */
  overflow: hidden; /* Importante para garantir que o conteúdo não vaze da borda arredondada */
`;

export const Tab = styled.div`
  border-bottom: 2px solid #e0e0e0; /* Borda mais sutil */
  background-color: #f8f8f8; /* Fundo levemente mais claro */
  display: flex; /* Para alinhar os botões horizontalmente */
`;

export const TabButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 20px; /* Mais espaçamento */
  font-size: 16px;
  font-weight: 500;
  color: #555;
  transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave */

  &:hover {
    background-color: #f0f0f0; /* Hover sutil */
  }

  &.active {
    background-color: #fff; /* Fundo branco para a tab ativa */
    color: #000; /* Texto mais escuro para a tab ativa */
    border-bottom: 2px solid #4CAF50; /* Destaque com cor de acentuação */
  }
`;

export const TabContent = styled.div`
  height: 60vh;
  padding: 20px; /* Mais espaçamento */
  border: 1px solid #e0e0e0;
  border-top: none; /* Remove a borda superior */
  display: none;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #777;
  }

  &.active {
    display: block;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px; 
`;

export const ToggleLabel = styled.label`
  width: 40px;
  height: 20px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Estilos para quando o toggle está "ON" */
  ${props => props.toggledOn && `
    background: #4cd964;
  `}
`;

export const ToggleInput = styled.input`
  display: none; /* Esconde o input checkbox padrão */
`;

export const ToggleButton = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: auto;
  bottom: 0;
  width: 20px;   /* Diâmetro do círculo */
  height: 20px;  /* Diâmetro do círculo */
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* Estilos para quando o toggle está "ON" (move o botão para a direita) */
  ${props => props.toggledOn && `
    left: auto;
    right: 0;
  `}
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
 
  height: 30px;
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 500px;
  height: 200px;

  margin-top: 10px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const Select = styled.select`
  height:in;
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

export const UFContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    width: 50%;
`;

export const ButtonCadastro = styled.button`
    height:4vh;
    width:15vw;
    color:white;
    font-size: 1em;
    background-color:green;
    border-radius: 15px;
    padding: 5px;
`;

export const ButtonCancelar= styled.button`
    height:4vh;
    width:15vw;
    font-size: 1em;
    color:white;
    background-color:rgba(255, 0, 0, 0.6);
    border-radius: 15px;
    padding: 5px;
`;