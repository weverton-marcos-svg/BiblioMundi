import React, { useRef } from "react";
import { FieldContainer, Label, InputFieldDate, CalendarIcon, InputContainer } from "./styled";

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
                    value={props.value}
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