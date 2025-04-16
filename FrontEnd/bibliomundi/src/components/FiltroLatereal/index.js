// components/FiltroLateral.js
import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Importe um ícone de fechar
import { FiltroLateralContainer, FiltroConteudo, BotaoFechar,BotaoAceitar,ContainerButton, BotaoLimpar} from "./styled";

function FiltroLateral({ onClose, children, onApplyFilters , onClearFilters  }) {
  return (
    <FiltroLateralContainer>
      <FiltroConteudo>
        <BotaoFechar onClick={onClose}>
          <FaTimes />
        </BotaoFechar>
        <h1>Filtros</h1>
        {children}

        <ContainerButton>
          <BotaoAceitar onClick={onApplyFilters}>Aplicar Filtros</BotaoAceitar>
          <BotaoLimpar onClick={onClearFilters}>Limpar filtros</BotaoLimpar>
        </ContainerButton>
      </FiltroConteudo>
    </FiltroLateralContainer>
  );
}



export default FiltroLateral;