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
import AutoresService from "../../../../services/Acervo";
import { ToastContainer } from 'react-toastify';
import {
    RefreshIconeFiltro,
    FilterIconeFiltro,
    FilterDollarIconeFiltro,
    Main,
    ContainerFiltro,
    ContainerResultado,
    AgrupamentoFiltro,
    ContainerFiltroData
} from "./styled";


export default function PageAutoresHome() {

    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [autores, setAutores] = useState([]);
    const [mensagemModal, setMensagemModal] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [autorIdInativar, setAutorIdInativar] = useState(null);
    const [nomeFiltro, setNomeFiltro] = useState('');
    const [nacionalidadeFiltro, setNacionalidadeFiltro] = useState('');
    const [dataNascimentoInicial, setDataNascimentoInicial] = useState('');
    const [dataNascimentoFinal, setDataNascimentoFinal] = useState('');

    const autoresService = new AutoresService();
    const navigate = useNavigate();

    const fetchAutores = async (filtros = {}) => {
        const data = await autoresService.getAutores(filtros);

        if (data) {
            const listagemAutores = data.map(autorAPI => ({
                id: autorAPI.id || 0,
                nome: autorAPI.nome || '',
                nacionalidade: autorAPI.nacionalidade || '',
                Inativo: autorAPI.inativo || false,
                dataInclusao: autorAPI.dataInclusao || null,
            }));
            setAutores(listagemAutores);
        }
    };

    const handleConfirmarInativacao = async () => {
        setIsModalVisible(false);
        const response = await autoresService.putStatusLogicoAutores(autorIdInativar);
        
        if (response) {
            fetchAutores();
        }

        setAutorIdInativar(null);
    };

        const handleCancelarModal = () => {
        setIsModalVisible(false);
        setAutorIdInativar(null);
    };

    const handleApplyFilters = () => {
        // Cria um objeto com os valores dos filtros
        const filtros = {};
        if (nomeFiltro) {
          filtros.nome = nomeFiltro; // Adiciona o filtro de nome se houver valor
        };

        if (nacionalidadeFiltro) {
            filtros.nacionalidade = nacionalidadeFiltro; // Adiciona o filtro de nacionalidade se houver valor
        };

        if (dataNascimentoInicial) {
            filtros.dataNascimentoInicial = dataNascimentoInicial; // Adiciona o filtro de data de nascimento inicial se houver valor  
        }

        if (dataNascimentoFinal) {
            filtros.dataNascimentoFinal = dataNascimentoFinal; // Adiciona o filtro de data de nascimento final se houver valor
        }

        fetchAutores(filtros); 
        setFiltroVisivel(false);
    };

    const handleClearFilters = () => {
        setNomeFiltro(''); 
        setNacionalidadeFiltro('');
        setDataNascimentoInicial('');
        setDataNascimentoFinal('');
    
        fetchAutores(); 
        setFiltroVisivel(false);
    };

    const handleVisualizarClick = (autores) => {
        setAutorIdInativar(autores.id);
        setMensagemModal(`Deseja realmente inativar/ativar o autor de id: ${autores.id} - ${autores.nome}?`);
        setIsModalVisible(true);
    };

    const headerColumns = [
        { key: 'nome', label: 'Nome', largura: '45%' },
        { key: 'nacionalidade', label: 'Nacionalidade', largura: '50%' },
    ]; 

    const actionButtons = [
        { label: '', icon: <LuEyeOff />, onClick: handleVisualizarClick },
        { label: '', icon: <LuPencil />, onClick: (autores) => {navigate(`/Acervo/Autores/cadastro/${autores.id}`); }},
    ];

    useEffect(() => {
        fetchAutores();
    }, []);

    return (
        <>
            <ToastContainer />
            <DefaultHeader url='/home'/> 

             <Main>
                <article>
                    <ContainerFiltro>
                        <AgrupamentoFiltro>
                            <RefreshIconeFiltro onClick={() => fetchAutores()} />

                            {filtroVisivel 
                                ? <FilterDollarIconeFiltro onClick={() => setFiltroVisivel(false)} />
                                : <FilterIconeFiltro onClick={() => setFiltroVisivel(true)} />
                        }
                        </AgrupamentoFiltro>
                        
                        <StandardButton
                            texto={"Cadastar novo Autor"}
                            redirecionarUrl={"/acervo/autores/cadastro"}
                        />
                    </ContainerFiltro>

                    <ContainerResultado>
                        <DefaultDataTable
                            data={autores}
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
                            htmlFor={"dataNascimentoInicial"}
                            titulo={"Nascimento de:"}
                            type={"date"}
                            value={dataNascimentoInicial}
                            onChange={(e) => setDataNascimentoInicial(e.target.value)}
                        />

                        <InputDate
                            htmlFor={"dataNascimentoFinal"}
                            titulo={"Nascimento até:"}
                            type={"date"}
                            value={dataNascimentoFinal}
                            onChange={(e) => setDataNascimentoFinal(e.target.value)}
                        />
                    </ContainerFiltroData>

                    <InputGeneric 
                        htmlFor={"BuscarNome"}
                        titulo={"Nome:"}
                        type={"text"}
                        value={nomeFiltro}
                        onChange={(e) => setNomeFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"BuscarNacionalidade"}
                        titulo={"Nacionalidade:"}
                        type={"text"}
                        value={nacionalidadeFiltro}
                        onChange={(e) => setNacionalidadeFiltro(e.target.value)}
                        required={false}
                    />
                 </SideFilter>
            )}
            <StandardFooter />
        </>
    )
};