import React from "react";
import RecursoNaoDisponivel from "../../assets/image/RecursoNaoDisponivel.svg";
import { Container, Img, Span } from "./styled";

export default function NotImplemented() {
    return (
        <Container>
            <Img src={RecursoNaoDisponivel} alt="Recurso não disponível"/>
            <Span>OPS!... Esse recurso ainda não está disponível, mas não se preocupa nosso time já está trabalhando
                para disponibilizar esse novo recurso para você!.</Span>
        </Container>
    );
}