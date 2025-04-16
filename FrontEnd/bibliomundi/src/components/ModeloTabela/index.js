import React from 'react';
import { StyledTable, StyledThead, StyledTh, StyledTbody, StyledTd, StyledTr, ActionsTd, ActionButton} from './styled'

export default function DataTable ({ data, headerColumns, actionButtons }) {
  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {headerColumns.map((column, index) => (
            <StyledTh key={index} largura={column.largura}>
              {column.label}
            </StyledTh>
          ))}
          {actionButtons && <StyledTh>Ações</StyledTh>}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {data.map((row, rowIndex) => (
          <StyledTr key={rowIndex}>
            {headerColumns.map((column, colIndex) => (
              <StyledTd key={colIndex} largura={column.largura}>
                {typeof column.render === 'function' ? column.render(row) : row[column.key]}
              </StyledTd>
            ))}
            {actionButtons && (
              <ActionsTd>
                {actionButtons.map((button, btnIndex) => (
                  <ActionButton key={btnIndex} onClick={() => button.onClick(row)}>
                    {button.icon && button.icon}
                    {button.label}
                  </ActionButton>
                ))}
              </ActionsTd>
            )}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};