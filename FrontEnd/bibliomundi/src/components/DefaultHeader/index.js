import React from "react";
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";
import ImgLogo from "../../assets/image/LogoBiblioMundi.svg"
import {Header,Img, Span} from "./styled"

export default function DefaultHeader({url}){
    const navigate = useNavigate();
    return (
        <Header>
            <Span  onClick={() => navigate(url)}>  Voltar <RiArrowGoBackFill /></Span>
            
            <Img onClick={() => navigate('/home')} src={ImgLogo} alt="Logo do siste" /> 
        </Header>
    )
}