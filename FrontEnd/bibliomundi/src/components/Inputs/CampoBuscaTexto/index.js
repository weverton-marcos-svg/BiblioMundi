import React from "react";
import { PageFiltro, Titulo, Campo } from "./styled";
export default class CampoBuscaTexto extends React.Component {
    render(){
        return (
            <PageFiltro>
                <Titulo htmlFor={this.props.htmlFor}>{this.props.titulo}</Titulo>
                <Campo 
                    id={this.props.htmlFor} 
                    type={this.props.type} 
                    value={this.props.value}
                    onChange={this.props.onChange}
                    />
            </PageFiltro>
        )
    }

}
