import React from 'react';
import { ModalOverlay, ModalContainer, ModalButton, Button} from "./styled";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, mensagem }) {
    if (!isOpen) return null;

    return (
      <ModalOverlay>
        <ModalContainer>
          <p>{mensagem}</p>

          <ModalButton>
            <Button onClick={onConfirm}>Confirmar</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalButton>
        </ModalContainer>
      </ModalOverlay>
    );
  }