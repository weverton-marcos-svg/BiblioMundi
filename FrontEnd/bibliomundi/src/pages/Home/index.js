import React from "react";
// import LivroRoxo from "../../assets/image/LivroRoxo.svg"
import Logo from "../../assets/image/LogoBiblioMundi.svg"
import {PageHeader,NavHeader,ListaOpcao,Opcao,ImgLogo,ContainerImagem} from "./styled.js";

export default function PageHome(){
    return (
        <>
            <PageHeader>
                <NavHeader>
                    <ListaOpcao>
                        <Opcao>Clientes</Opcao>
                        <Opcao>Emprestimos</Opcao>
                        <Opcao>Acervo</Opcao>
                    </ListaOpcao>
                </NavHeader>
                <ContainerImagem>
                    <ImgLogo  src={Logo} alt="Mundo com linhas em volta escrito BiblioMundi (logo)"/>
                </ContainerImagem>
                <div>
                    <p>Olá, [Nome.User]</p> 
                </div>
            </PageHeader>

            <footer>
                <p> Todos os Direitos reservados a BiblioDev</p>
            </footer>
        </>
    )
}