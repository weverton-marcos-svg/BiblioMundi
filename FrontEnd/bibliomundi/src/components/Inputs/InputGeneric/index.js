import React from "react";
import { FieldContainer, Label, InputField } from "./styled";

export default class InputGeneric extends React.Component {
    render(){
        return (
            <FieldContainer>
                <Label htmlFor={this.props.htmlFor}>{this.props.titulo}</Label>
                <InputField 
                    id={this.props.htmlFor} 
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    required={this.props.required}
                />

            </FieldContainer>
        )
    }
}