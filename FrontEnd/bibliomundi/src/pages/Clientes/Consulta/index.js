import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultHeader from "../../../components/DefaultHeader";
import StandardFooter from "../../../components/StandardFooter";
import SideFilter from "../../../components/SideFilter";
import InputGeneric from "../../../components/Inputs/InputGeneric";
import InputDate from "../../../components/Inputs/InputDate";
import DefaultDataTable from "../../../components/DefaultDataTable";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import StandardButton from "../../../components/StandardButton";
import { LuPencil,LuEyeOff  } from "react-icons/lu";
import ClientesService from "../../../services/clientes";
import { ToastContainer } from 'react-toastify';
import {RefreshIconeFiltro,
    FilterIconeFiltro,
    FilterDollarIconeFiltro,
    Main,
    ContainerFiltro,
    ContainerResultado,
    AgrupamentoFiltro,
    ContainerFiltroData
} from "./styled";

export default function PageClientesHome(){

    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [nomeFiltro, setNomeFiltro] = useState(''); 
    const [dataInclusaoInicial, setDataInclusaoInicial] = useState('');
    const [dataInclusaoFinal, setDataInclusaoFinal] = useState('');
    const [emailFiltro, setEmailFiltro] = useState('');
    const [CPFFiltro, setCPFFiltro] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clienteIdParaInativar, setClienteIdParaInativar] = useState(null);
    const [mensagemModal, setMensagemModal] = useState('');
 
    const clientesService = new ClientesService();
    const navigate = useNavigate();

    const fetchClientes = async (filtros = {}) => {
        const data = await clientesService.getClientes(filtros);

        if (data) {
            const listagemCliente = data.map(clienteAPI => ({
                id: clienteAPI.id || 0,
                nome: clienteAPI.nome || '',
                email: clienteAPI.email || '',
                Inativo: clienteAPI.inativo || false,
                cpf: clienteAPI.cpf || '',
                dataInclusao: clienteAPI.dataInclusao || null,
                dataNascimento: clienteAPI.dataNascimento || null,
                bloquearEmprestimo: clienteAPI.bloquearEmprestimo || false,
            }));
            setClientes(listagemCliente);
        }
    };

    const handleConfirmarInativacao = async () => {
        setIsModalVisible(false);
        if (clienteIdParaInativar) {
        //   try {
            const response = await clientesService.putStatsLogico(clienteIdParaInativar);
            if (response.status === 200) {
                fetchClientes();
            } else {
                alert('Erro ao inativar/ativar um cliente.');
            }
        //   } 
        //   catch (error) {
        //     console.error('Erro ao inativar/ativar um cliente.', error);
        //   } 
        //   finally {
        //     setClienteIdParaInativar(null); 
        //   }
        }
    };

    const handleCancelarModal = () => {
        setIsModalVisible(false);
        setClienteIdParaInativar(null); 
    };

    // Filtros 
    const handleApplyFilters = () => {
        // Cria um objeto com os valores dos filtros
        const filtros = {};
        if (nomeFiltro) {
          filtros.nome = nomeFiltro; // Adiciona o filtro de nome se houver valor
        }

        if (dataInclusaoInicial){
            filtros.dataInclusaoInicial = dataInclusaoInicial;
        }

        if (dataInclusaoFinal) {
            filtros.dataInclusaoFinal = dataInclusaoFinal;
        }

        if (emailFiltro) {
            filtros.email = emailFiltro; // Adiciona o filtro de e-mail se houver valor
        }

        if (CPFFiltro) {
            filtros.cpf = CPFFiltro; // Adiciona o filtro de CPF se houver valor
        }

        fetchClientes(filtros); 
        setFiltroVisivel(false);
    };

    const handleClearFilters = () => {
        setNomeFiltro(''); 
        setDataInclusaoInicial('');
        setDataInclusaoFinal('');
        setEmailFiltro('');
        setCPFFiltro('');
    
        fetchClientes(); 
        setFiltroVisivel(false);
    };

    // Dados da Grid 
    const headerColumns = [
        { key: 'nome', label: 'Nome', largura: '30%' },
        { key: 'cpf', label: 'CPF', largura: '15%' },
        { key: 'email', label: 'E-mail', largura: '25%' },
        { 
            key: 'bloquearEmprestimo', 
            label: 'Bloqueado', 
            largura: '10%', 
            render: (cliente) => cliente.bloquearEmprestimo ? 'Sim' : 'Não' },
        {
            key: 'dataNascimento',
            label: 'Data Nascimento',
            largura: '15%',
            render: (cliente) => new Date(cliente.dataNascimento).toLocaleDateString('pt-BR'),
        }
    ]; 

    const handleVisualizarClick = (clientes) => {
        setClienteIdParaInativar(clientes.id);
        setMensagemModal(`Deseja realmente inativar/ativar o cliente de id: ${clientes.id} - ${clientes.nome}?`);
        setIsModalVisible(true);
    };

    const actionButtons = [
        { label: '', icon: <LuEyeOff />, onClick: handleVisualizarClick },
        { label: '', icon: <LuPencil />, onClick: (clientes) => {navigate(`/clientes/cadastro/${clientes.id}`); }},
    ];

    useEffect(() => {
        fetchClientes()
    },[]);

    return(
        <>
            <ToastContainer/>
            <DefaultHeader
                url = '/home'
            />
            <Main>
                <article>
                    <ContainerFiltro>
                        <AgrupamentoFiltro>
                            <RefreshIconeFiltro onClick={() => fetchClientes()} />

                            {filtroVisivel 
                                ? <FilterDollarIconeFiltro onClick={() => setFiltroVisivel(false)} />
                                : <FilterIconeFiltro onClick={() => setFiltroVisivel(true)} />
                        }
                        </AgrupamentoFiltro>
                        
                        <StandardButton
                            texto={"Cadastar novo cliente"}
                            redirecionarUrl={"/clientes/cadastro"}
                        />
                    </ContainerFiltro>

                    <ContainerResultado>
                        <DefaultDataTable
                            data={clientes}
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
                        htmlFor={"DataInclusaoInicial"}
                        titulo={"Inclusão inicial:"}
                        type={"date"}
                        value={dataInclusaoInicial}
                        onChange={(e) => setDataInclusaoInicial(e.target.value)}
                    />

                    <InputDate
                        htmlFor={"DataInclusaoFinal"}
                        titulo={"Inclusão final:"}
                        type={"date"}
                        value={dataInclusaoFinal}
                        onChange={(e) => setDataInclusaoFinal(e.target.value)}
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
                        htmlFor={"BuscaEmail"}
                        titulo={"E-mail:"}
                        type={"text"}
                        value={emailFiltro}
                        onChange={(e) => setEmailFiltro(e.target.value)}
                        required={false}
                    />

                    <InputGeneric 
                        htmlFor={"CPF"}
                        titulo={"CPF:"}
                        type={"text"}
                        value={CPFFiltro}
                        onChange={(e) => setCPFFiltro(e.target.value)}
                        required={false}
                        maxLength={14} // CPF tem 11 dígitos, mas com formatação pode ter 14 (ex: 123.456.789-00)
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" // Formato do CPF
                        oninput="this.value = this.value.replace(/[^0-9]/g, '')" // Remove caracteres não numéricos
                        placeholder="Ex: 12345678900"
                    />
                </SideFilter>
            )}
            <StandardFooter/>
        </>
    )
}