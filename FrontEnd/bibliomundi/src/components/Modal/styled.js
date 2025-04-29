import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; 
`;

export const ModalContainer = styled.div`
    background: #ffffff; /* White background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06); /* Subtle shadow */
    max-width: 500px;
    width: 100%;
    z-index: 1001; /* Ensure it stays above the overlay */
`;

export const ModalButton = styled.div`
    display: flex; /* Alinha os botões lado a lado */
    justify-content: space-between; /* Espaço uniforme entre os botões */
    width: 100%; /* Ocupa toda a largura do modal */
    margin-top: 20px; /* Espaçamento superior */
`;

export const Button = styled.button`
    background-color: #007BFF; /* Azul padrão */
    color: #ffffff; /* Texto branco */
    padding: 10px 20px; /* Espaçamento interno */
    border: none; /* Remove borda padrão */
    border-radius: 5px; /* Bordas arredondadas */
    font-size: 16px; /* Tamanho da fonte */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
    flex: 1; /* Cada botão ocupa metade do espaço disponível */
    margin: 0 5px; /* Espaçamento horizontal entre os botões */
    transition: background-color 0.3s ease; /* Transição suave para hover */

    &:hover {
        background-color: #0056b3; /* Azul mais escuro no hover */
    }

    &:active {
        background-color: #004085; /* Azul ainda mais escuro ao clicar */
    }

    &:disabled {
        background-color: #cccccc; /* Cinza para estado desabilitado */
        cursor: not-allowed; /* Cursor indicando que está desabilitado */
    }
`;

