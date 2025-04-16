import React from "react";
import CorujaLendo from "../../assets/image/CorujaLendoUmLivro.svg"
import Logo from "../../assets/image/LogoBiblioMundi.svg";
import RecursoNaoDisponivel from "../../assets/image/RecursoNaoDisponivel.svg";
import {PageHeader,NavHeader,ListaOpcao,Opcao,ImgLogo,ContainerImagem,ContainerUser,ImgUser,Main} from "./styled.js";
import FooterPadrao from "../../components/FooterPadrao";
import { FaLock } from "react-icons/fa";

export default function PageHome(){
    return (
        <>
            <PageHeader>
                <NavHeader>
                    <ListaOpcao>
                        <Opcao habilitado={false}>Clientes <FaLock/></Opcao>
                        <Opcao habilitado={false}>Emprestimos <FaLock/> </Opcao>
                        <Opcao habilitado={false}>Acervo <FaLock/> </Opcao>
                        <Opcao habilitado={true} onClick={() => window.location.href = "/funcionarios"}>Funcionários</Opcao>
                    </ListaOpcao>
                </NavHeader>
                <ContainerImagem>
                    <ImgLogo  src={Logo} alt="Mundo com linhas em volta escrito BiblioMundi (logo)"/>
                </ContainerImagem>
                <ContainerUser>
                    <p>Olá, Weverton Marcos</p> 
                    <ImgUser src={CorujaLendo} alt="Imagem do perfil" />
                </ContainerUser>
            </PageHeader>
            <Main>
                <img src={RecursoNaoDisponivel} alt="Recurso não disponível" width="35%"/>
                <span>OPS!... Esse recurso ainda não está disponível, mas não se preocupa nosso time já está trabalhando
                    para disponibilizar esse novo recurso para você!.</span>
            </Main>
            <FooterPadrao />
        </>
    )
}