import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import ImgLogo from "../../assets/image/LogoBiblioMundi.svg"
import {Header,Img, Span} from "./styled"

export default function HeaderPadrao(){
    return (
        <Header>
            <Span  onClick={() => window.history.back()}>  Voltar <RiArrowGoBackFill /></Span>
            
            <Img src={ImgLogo} alt="Logo do siste" /> 
        </Header>
    )
}