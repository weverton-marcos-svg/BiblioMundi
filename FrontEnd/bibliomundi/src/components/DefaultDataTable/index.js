import React from 'react';
import { StyledTable, StyledThead, StyledTh, StyledTbody, StyledTd, StyledTr, ActionsTd, ActionButton, StyledTrInativo} from './styled'

const getStyledTr = (isInativo) => {
  return isInativo ? StyledTrInativo : StyledTr;
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export default function DefaultDataTable ({ data, headerColumns, actionButtons }) {
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
        {data.map((row, rowIndex) => {
          const isInativo = row.Inativo === true;
          const RowComponent = getStyledTr(isInativo);

          return (
            <RowComponent key={rowIndex}>
              {headerColumns.map((column, colIndex) => (
                <StyledTd key={colIndex} largura={column.largura}>
                  {typeof column.render === 'function' 
                      ? column.render(row) 
                      : column.path 
                        ? getNestedValue(row, column.path)
                        : row[column.key]}
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
            </RowComponent>
          );
        })}
      </StyledTbody>
    </StyledTable>
  );
};