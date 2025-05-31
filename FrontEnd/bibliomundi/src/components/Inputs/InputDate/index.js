import React, { useRef } from "react";
import { FieldContainer, Label, InputFieldDate, CalendarIcon, InputContainer } from "./styled";

function formatDateForInput(datetimeString) {
  if (!datetimeString) {
    return '';
  }

  let year, month, day;

  if (datetimeString.includes('T')) {
    // Formato ISO 8601: "YYYY-MM-DDTHH:MM:SS" (ou variações)
    const datePart = datetimeString.split('T')[0];
    [year, month, day] = datePart.split('-').map(Number);
  } else if (datetimeString.includes('-')) {
    // Formato YYYY-MM-DD
    [year, month, day] = datetimeString.split('-').map(Number);
  } else {
    console.error('Formato de data inválido:', datetimeString);
    return ''; // Ou lance um erro, dependendo do seu tratamento de erros
  }

  // Correção: A lógica de criação da Date já lida com o UTC corretamente
  const date = new Date(year, month - 1, day); // month is 0-indexed in Date

  const formattedYear = date.getFullYear(); // Use getFullYear para obter o ano local
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Use getMonth para obter o mês local
  const formattedDay = date.getDate().toString().padStart(2, '0'); // Use getDate para obter o dia local

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

const InputDate = React.forwardRef((props, ref) => {
    const inputRef = useRef(null);

    const handleIconClick = () => {
        if (inputRef.current && typeof inputRef.current.showPicker === 'function') {
            inputRef.current.showPicker();
        }
    };

    
    return (
        <FieldContainer>
            <Label htmlFor={props.htmlFor}>{props.titulo}</Label>
            <InputContainer>
                <InputFieldDate
                    id={props.htmlFor}
                    type={props.type}
                    name={props.name}
                    value={formatDateForInput(props.value)}
                    onChange={props.onChange}
                    required={props.required}
                    ref={inputRef} 
                />
                <CalendarIcon onClick={handleIconClick} />
            </InputContainer>
        </FieldContainer>
    );
});

export default InputDate;