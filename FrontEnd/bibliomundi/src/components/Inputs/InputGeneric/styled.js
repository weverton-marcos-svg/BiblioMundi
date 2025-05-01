import styled from "styled-components";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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