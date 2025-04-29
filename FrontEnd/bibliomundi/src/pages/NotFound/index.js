import React from "react";
import  {Img, HeaderPageNotFound,MainPageNotFound,Titulo,ContainerImg,ContainerMensagem,Mensagem} from "./styled.js"
import MundoComLivros from "../../assets/image/MundoComLivros.svg"

export default function PageNotFound(){
    return( 
        <div>
            <HeaderPageNotFound>
                <Titulo>Page Not Found</Titulo>
            </HeaderPageNotFound>
            <MainPageNotFound>
            <ContainerMensagem>   
                <Mensagem>
                    Parece que você se perdeu no mundo da letiura.<br />
                    Tente retornar para a nossa página inicial
                </Mensagem>
            </ContainerMensagem>
            <ContainerImg>
                 <Img src={MundoComLivros} alt="Pagina não encontrada"/>
            </ContainerImg>
            </MainPageNotFound>
        </div>
    )
}