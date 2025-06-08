import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultHeader from "../../../../components/DefaultHeader";
import StandardFooter from "../../../../components/StandardFooter";
import SideFilter from "../../../../components/SideFilter";
import InputGeneric from "../../../../components/Inputs/InputGeneric";
import InputDate from "../../../../components/Inputs/InputDate";
import DefaultDataTable from "../../../../components/DefaultDataTable";
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";
import StandardButton from "../../../../components/StandardButton";
import { LuPencil, LuEyeOff } from "react-icons/lu";
import AcervoService from "../../../../services/Acervo";
import { ToastContainer } from 'react-toastify';
import {
    RefreshIconeFiltro,
    FilterIconeFiltro,
    FilterDollarIconeFiltro,
    Main,
    ContainerFiltro,
    ContainerResultado,
    AgrupamentoFiltro,
    ContainerFiltroData,
    Select,
    Label
    
} from "./styled";


function RetornarDataCadastro(){
    const hoje = new Date();
    
    let ano = hoje.getFullYear();
    let dia = hoje.getDate();
    
    let mes = hoje.getMonth()

    if (mes == 1 ) {
        mes = 12;
        ano -= 1; 
    }else{
        mes -= 1; 
    }

    return  new Date(ano, mes, dia).toISOString();
}

export default function PageLivrosHome() {

    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [livros, setLivros] = useState([]);
    const [mensagemModal, setMensagemModal] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [livroIdInativar, setLivroIdInativar] = useState(null);
    const [tituloFiltro, setTituloFiltro] = useState('');
    const [subTituloFiltro, setSubTituloFiltro] = useState('');
    const [isbnFiltro, setIsbnFiltro] = useState('');
    const [idiomaFiltro, setIdiomaFiltro] = useState('');
    const [edicaoFiltro, setEdicaoFiltro] = useState('');
    const [dataCadastroInicial, setDataCadastroInicial] = useState(RetornarDataCadastro()); // Default to today
    const [dataCadastroFinal, setDataCadastroFinal] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [anoPublicadoFiltro, setanoPublicadoFiltro] = useState(0);
    const [tipoFormatoFiltro, setTipoFormatoFiltro] = useState(0);
    const [autoresFiltro, setAutoresFiltros] = useState([]);
    const [autoresDisponiveis, setAutoresDisponiveis] = useState([]);

    const LivrosService = new AcervoService();
    const navigate = useNavigate();

    const fetchLivros = async (filtros) => {
        const data = await LivrosService.getLivros(filtros);

        if (data) {
            const listagemLivros = data.map(livroAPI => ({
                id: livroAPI.id || 0,
                titulo: livroAPI.titulo || '',
                subTitulo: livroAPI.subTitulo || '',
                isbn: livroAPI.isbn || '',
                anoPublicado: livroAPI.anoPublicado || null,
                quantidadeDeCopias: livroAPI.quantidadeDeCopias || 0,
                autor: livroAPI.autor || {},
                genero: livroAPI.genero || {},
                Inativo: livroAPI.inativo || false
            }));
            setLivros(listagemLivros);
            console.log('Livros carregados:', listagemLivros);
        }
    };

    const fetchLivrosAutores = async () => {
        const data = await LivrosService.getAutores()

        if (data){
            setAutoresDisponiveis(data);
        }
    }

    const handleConfirmarInativacao = async () => {
        setIsModalVisible(false);
        const response = await LivrosService.putStatusLogicoLivros(livroIdInativar);
        
        if (response) {
            handleApplyFilters();
        }
    };

    const handleCancelarModal = () => {
        setIsModalVisible(false);
        setLivroIdInativar(null);
    };

    const handleApplyFilters = () => {
        const filtros = {};
        
        if (tituloFiltro) filtros.titulo = tituloFiltro;
        if (subTituloFiltro) filtros.subTitulo = subTituloFiltro;
        if (isbnFiltro) filtros.isbn = isbnFiltro;
        if (idiomaFiltro) filtros.idioma = idiomaFiltro;
        if (edicaoFiltro) filtros.edicao = edicaoFiltro;    
        if (tipoFormatoFiltro) filtros.tipoFormato = tipoFormatoFiltro;
        if (dataCadastroInicial) filtros.dataCadastroInicial = dataCadastroInicial;
        if (dataCadastroFinal) filtros.dataCadastroFinal = dataCadastroFinal;
        if (anoPublicadoFiltro) filtros.anoPublicado = anoPublicadoFiltro;
        if (autoresFiltro && autoresFiltro.length > 0) { // Verifica se há itens selecionados
            filtros.IdsAutores  = autoresFiltro;
        }   
        
        console.log(autoresFiltro);
        fetchLivros(filtros);
        setFiltroVisivel(false);
    }

    const handleClearFilters = () => {
        setTituloFiltro('');
        setSubTituloFiltro('');
        setIsbnFiltro('');
        setIdiomaFiltro('');
        setEdicaoFiltro('');
        setDataCadastroFinal(new Date().toISOString().split('T')[0]); // Reset to today
        setDataCadastroInicial(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() ).toISOString().split('T')[0]); // Reset to today
        setanoPublicadoFiltro('');
        setTipoFormatoFiltro(0);
        setAutoresFiltros([]);

        fetchLivros();
    };

    const handleVisualizarClick = (livro) => {
        setLivroIdInativar(livro.id);
        setMensagemModal(`Deseja realmente inativar o livro: ${livro.titulo}?`);
        setIsModalVisible(true);
    }

    const headerColumns = [
        { key: 'isbn', label: 'ISBN', largura: '5%' },
        { key: 'titulo', label: 'Título', largura: '20%' },
        { key: 'subTitulo', label: 'SubTítulo', largura: '20%' },
        { key: 'anoPublicado', label: 'Publicado', largura: '8%' },
        { key: 'quantidadeDeCopias', label: 'Copias', largura: '8%' },
        { path: "autor.descricao", label: 'Autor', largura: '20%'},
        { path: "genero.descricao", label: 'Gênero', largura: '20%' },
    ]; 

    const actionButtons = [
        { label: '', icon: <LuEyeOff />, onClick: handleVisualizarClick },
        { label: '', icon: <LuPencil />, onClick: (autores) => {navigate(`/Acervo/Livros/cadastro/${autores.id}`); }},
    ];

    useEffect(() => {
        fetchLivrosAutores();
        handleApplyFilters();
    }, []);

    return (
        <>
            <ToastContainer />
            <DefaultHeader url='/home'/> 

            <Main>
                <article>
                    <ContainerFiltro>
                        <AgrupamentoFiltro>
                            <RefreshIconeFiltro onClick={() => handleApplyFilters()} />

                            {filtroVisivel 
                                ? <FilterDollarIconeFiltro onClick={() => setFiltroVisivel(false)} />
                                : <FilterIconeFiltro onClick={() => setFiltroVisivel(true)} />
                        }
                        </AgrupamentoFiltro>
                        
                        <StandardButton
                            texto={"Cadastar novo livro"}
                            redirecionarUrl={"/acervo/Livros/cadastro"}
                        />
                    </ContainerFiltro>

                    <ContainerResultado>
                        <DefaultDataTable
                            data={livros}
                            headerColumns={headerColumns}
                            actionButtons={actionButtons} 
                        />
                        <ConfirmationModal
                            isOpen={isModalVisible}
                            onClose={handleCancelarModal}
                            onConfirm={handleConfirmarInativacao}
                            mensagem={mensagemModal}
                        />
                    </ContainerResultado>
                </article>
            </Main>

             {filtroVisivel && ( 
                <SideFilter onClose={() => setFiltroVisivel(false)} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters}>
                    <ContainerFiltroData>
                        <InputDate
                            htmlFor={"DataCadastroInicial"}
                            titulo={"Cadastrado de:"}
                            type={"date"}
                            value={dataCadastroInicial}
                            onChange={(e) => setDataCadastroInicial(e.target.value)}
                        />

                        <InputDate
                            htmlFor={"DataCadastroFinal"}
                            titulo={"Cadastrado até:"}
                            type={"date"}
                            value={dataCadastroFinal}
                            onChange={(e) => setDataCadastroFinal(e.target.value)}
                        />

                    </ContainerFiltroData>

                    <InputGeneric 
                        htmlFor={"BuscarISBN"}
                        titulo={"Isbn:"}
                        type={"text"}
                        value={isbnFiltro}
                        onChange={(e) => setIsbnFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"BuscarTitulo"}
                        titulo={"Titulo:"}
                        type={"text"}
                        value={tituloFiltro}
                        onChange={(e) => setTituloFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"BuscarSubTitulo"}
                        titulo={"SubTitulo:"}
                        type={"text"}
                        value={tituloFiltro}
                        onChange={(e) => setTituloFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"BuscarIdioma"}
                        titulo={"Idioma:"}
                        type={"text"}
                        value={idiomaFiltro}
                        onChange={(e) => setIdiomaFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"BuscarEdicao"}
                        titulo={"Edição:"}
                        type={"text"}
                        value={edicaoFiltro}
                        onChange={(e) => setEdicaoFiltro(e.target.value)}
                        required={false}
                    />


                    <Label htmlFor="Formato">Tipo do Formato</Label>
                    <Select id="Formato"
                            htmlFor="Formato"
                            name="TipoFormato"
                            onChange={(e) => setTipoFormatoFiltro(e.target.value)}
                            value={tipoFormatoFiltro}
                        >
                        <option value={0} >Nenhum</option>
                        <option value={1} >Livros</option>
                        <option value={2} >EBooks</option>
                        <option value={3} >Manga</option>
                        <option value={4} >Graphic Novels</option>
                        <option value={5} >Novels Leves</option>
                        <option value={6} >Revistas</option>
                        <option value={7} >Livros Academico</option>
                    </Select>

                    <Label htmlFor="Autores">Autores</Label>
                    <Select
                        id="Autores"
                        multiple
                        name="IdsAutores"
                        value={autoresFiltro} // O valor agora é um array de IDs
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.options)
                                .filter(option => option.selected)
                                .map(option => parseInt(option.value, 10));
                            setAutoresFiltros(selectedOptions);
                        }}
                    >
                        <option value={0} disabled>Selecione...</option>
                        {autoresDisponiveis.map((autores) => (
                            <option key={autores.id} value={autores.id}>
                                {autores.nome} 
                            </option>
                        ))}
                    </Select>
                </SideFilter>
            )}
            <StandardFooter />
        </>
    );
    // Other functions and effects...

}