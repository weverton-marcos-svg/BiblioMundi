import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiltroLateralContainer, FiltroConteudo, BotaoFechar,BotaoAceitar,ContainerButton, BotaoLimpar} from "./styled";

export default function SideFilter({ onClose, children, onApplyFilters , onClearFilters  }) {
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