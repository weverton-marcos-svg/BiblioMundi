import React from "react";
import { FieldContainer, Label, InputFieldDate, CalendarIcon, InputContainer } from "./styled";

export default class InputDate extends React.Component {
    render(){
        return (
            <FieldContainer>
                <Label htmlFor={this.props.htmlFor}>{this.props.titulo}</Label>
                <InputContainer>
                    <InputFieldDate 
                        id={this.props.htmlFor} 
                        type={this.props.type} 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        required={this.props.required}
                        ref={this.props.ref}
                    />
                    <CalendarIcon onClick={() =>this.props.ref.current.showPicker()}/>
                </InputContainer>
            </FieldContainer>
        )
    }
}
