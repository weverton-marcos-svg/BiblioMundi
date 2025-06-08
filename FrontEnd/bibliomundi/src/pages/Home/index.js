import React, {useState} from "react";
import CorujaLendo from "../../assets/image/CorujaLendoUmLivro.svg"
import Logo from "../../assets/image/LogoBiblioMundi.svg";
import StandardFooter from "../../components/StandardFooter";
import NotImplemented from "../../components/NotImplemented";
import {PageHeader,NavHeader,ListaOpcao,Opcao,ImgLogo,ContainerImagem,ContainerUser,ImgUser,Main,NameUser,SubMenu,SubMenuItem} from "./styled.js";
import { FaLock } from "react-icons/fa";

export default function PageHome(){
    const [showSubMenu, setShowSubMenu] = useState(false); 

    return (
        <>
            <PageHeader>
                <NavHeader>
                    <ListaOpcao>
                        <Opcao habilitado={true}  onClick={() => window.location.href = "/clientes"} >Clientes </Opcao>
                        <Opcao habilitado={false} onClick={() => window.location.href = "/Emprestimo"}>Emprestimo <FaLock/></Opcao>
                        <Opcao  habilitado={true}  
                            onMouseEnter={() => setShowSubMenu(true)} 
                            onMouseLeave={() => setShowSubMenu(false)}>Acervo
                            {showSubMenu && (
                                <SubMenu>
                                    <SubMenuItem onClick={() => window.location.href = "/Acervo/Autores"}>
                                        Autores
                                    </SubMenuItem>
                                    <SubMenuItem onClick={() => window.location.href = "/Acervo/Generos"}>
                                        Gêneros
                                    </SubMenuItem>
                                    <SubMenuItem onClick={() => window.location.href = "/Acervo/Livros"}>
                                        Acervo de Livro
                                    </SubMenuItem>
                                </SubMenu>
                            )}
                            </Opcao>
                        <Opcao habilitado={true}  onClick={() => window.location.href = "/funcionarios"}>Funcionários</Opcao>
                    </ListaOpcao>
                </NavHeader>
                <ContainerImagem>
                    <ImgLogo  src={Logo} alt="Mundo com linhas em volta escrito BiblioMundi (logo)"/>
                </ContainerImagem>
                <ContainerUser>
                        <NameUser>Olá, Weverton Marcos</NameUser> 
                        <ImgUser src={CorujaLendo} alt="Imagem do perfil" />
                </ContainerUser>
            </PageHeader>
            <Main>
                <NotImplemented 
                    height="50vh"
                    largura={"30vw"}
                />
            </Main>
            <StandardFooter />
        </>
    )
}