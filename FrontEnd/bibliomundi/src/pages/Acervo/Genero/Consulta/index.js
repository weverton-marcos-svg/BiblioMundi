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


export default function PageGenerosHome() {
    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [generos, setGeneros] = useState([]);
    const [mensagemModal, setMensagemModal] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [generoIdInativar, setGeneroIdInativar] = useState(null);
    const [descricaoFiltro, setDescricaoFiltro] = useState('');

    const generosService = new AutoresService();
    const navigate = useNavigate();

    const fetchGeneros = async (filtros = {}) => {
        const data = await generosService.getGeneros(filtros);

        if (data) {
            const listagemGeneros = data.map(generoAPI => ({
                id: generoAPI.id || 0,
                descricao: generoAPI.descricao || '',
                Inativo: generoAPI.inativo || false,
                dataInclusao: generoAPI.dataInclusao || null,
            }));
            setGeneros(listagemGeneros);
        }
    }

    const handleConfirmarInativacao = async () => {
        setIsModalVisible(false);
        const response = await generosService.putStatusLogicoGeneros(generoIdInativar);
        
        if (response == 200) {
            setGeneroIdInativar(null);
            fetchGeneros();
        }
    };

    const handleVisualizarClick = (generos) => {
        setGeneroIdInativar(generos.id);
        setMensagemModal(`Deseja realmente inativar/ativar o genero ${generos.id} - ${generos.descricao}?`);
        setIsModalVisible(true);
    };

    const handleCancelarModal = () => {
        setIsModalVisible(false);
        setGeneroIdInativar(null);
    }

    const handleApplyFilters = () => {
        const filtros = {
            descricao: descricaoFiltro || undefined,
        };
        fetchGeneros(filtros);
        setFiltroVisivel(false);
    }

    const handleClearFilters = () => {
        setDescricaoFiltro('');
        fetchGeneros();
    };

    const headerColumns = [
        { key: 'descricao', label: 'Descrição', largura: '95%' },
    ]; 
    
    const actionButtons = [
        { label: '', icon: <LuEyeOff />, onClick: handleVisualizarClick },
        { label: '', icon: <LuPencil />, onClick: (generos) => {navigate(`/Acervo/Generos/cadastro/${generos.id}`); }},
    ];

    useEffect(() => {
        fetchGeneros();
    }, []);

    return (
        <>
            <ToastContainer />
            <DefaultHeader url='/home'/> 

           <Main>
                <article>
                    <ContainerFiltro>
                        <AgrupamentoFiltro>
                            <RefreshIconeFiltro onClick={() => fetchGeneros()} />

                            {filtroVisivel 
                                ? <FilterDollarIconeFiltro onClick={() => setFiltroVisivel(false)} />
                                : <FilterIconeFiltro onClick={() => setFiltroVisivel(true)} />
                        }
                        </AgrupamentoFiltro>
                        
                        <StandardButton
                            texto={"Cadastar novo Genero"}
                            redirecionarUrl={"/acervo/Generos/cadastro"}
                        />
                    </ContainerFiltro>

                    <ContainerResultado>
                        <DefaultDataTable
                            data={generos}
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
                    <InputGeneric 
                        htmlFor={"Descricao"}
                        titulo={"Descrição: "}
                        type={"text"}
                        value={descricaoFiltro}
                        onChange={(e) => setDescricaoFiltro(e.target.value)}
                        required={false}
                    />
                </SideFilter>
            )}
            <StandardFooter />
        </>
    )
};