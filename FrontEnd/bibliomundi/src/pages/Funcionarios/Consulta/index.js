import React, { useState , useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import HeaderPadrao from "../../../components/HeaderPadrao";
import FooterPadrao from "../../../components/FooterPadrao";
import FiltroLateral from "../../../components/FiltroLatereal";
import CampoBuscaTexto from "../../../components/Inputs/CampoBuscaTexto";
import CampoBuscaData from "../../../components/Inputs/CampoBuscaData"
import DataTable from "../../../components/ModeloTabela";
import { FaFilter,FaFilterCircleDollar,FaFilterCircleXmark } from "react-icons/fa6";
import { LuPencil,LuEyeOff  } from "react-icons/lu";
import { RiRefreshFill } from "react-icons/ri";
import {Main, ContainerFiltro, ContainerResultado, Article, IconeFiltro, BotaoCadastro, AgrupamentoFiltro,ContainerFiltroData} from './styled';

export default function PageFuncionariosHome(){

    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [nomeFiltro, setNomeFiltro] = useState(''); 
    const [cargoFiltro, setCargoFiltro] = useState('');
    const [dataAdmissaoInicial, setDataAdmissaoInicial] = useState('');
    const [dataAdmissaoFinal, setDataAdmissaoFinal] = useState('');

    const fetchFuncionarios = async (filtros = {}) => {
        let url = 'https://localhost:5000/api/Funcionario';
        const temFiltro = Object.keys(filtros).length > 0;
    
        if (temFiltro) {
          const queryParams = new URLSearchParams(filtros);
          url += `?${queryParams.toString()}`;
        }
    
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFuncionarios(data);
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
          // Lógica para lidar com o erro (exibir mensagem para o usuário, etc.)
        }
    };

    const handleApplyFilters = () => {
        // Cria um objeto com os valores dos filtros
        const filtros = {};
        if (nomeFiltro) {
          filtros.nome = nomeFiltro; // Adiciona o filtro de nome se houver valor
        }

        if (dataAdmissaoInicial){
            filtros.dataAdmissaoInicial = dataAdmissaoInicial;
        }

        if (dataAdmissaoFinal) {
            filtros.dataAdmissaoFinal = dataAdmissaoFinal;
        }

        fetchFuncionarios(filtros); 
        setFiltroVisivel(false);
    };

    const handleClearFilters = () => {
        setNomeFiltro(''); 
        setCargoFiltro('');
        setDataAdmissaoInicial('');
        setDataAdmissaoFinal('');
    
        fetchFuncionarios(); 
        setFiltroVisivel(false);
      };

    useEffect(() => {
        fetchFuncionarios(); // Carrega todos os funcionários inicialmente
    }, []);

    const headerColumns = [
        { key: 'nome', label: 'Nome', largura: '25%' },
        { key: 'email', label: 'E-mail', largura: '35%' },
        { key: 'cargo', label: 'Cargo', largura: '20%' },
        {
          key: 'dataAdmissao',
          label: 'Admissão',
          largura: '15%',
          render: (funcionario) => new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR'),
        },
      ];
    
    const navigate = useNavigate();
    const actionButtonsFuncionarios = [
        { label: '', icon: <LuEyeOff />, onClick: (funcionario) => console.log('Visualizar:', funcionario) },
        { label: '', icon: <LuPencil />, onClick: (funcionario) => {navigate(`/funcionarios/cadastro/${funcionario.id}`); }},
    ];

    return(
        <>
        <HeaderPadrao />
        <Main>
            <Article>
                <ContainerFiltro>
                    <AgrupamentoFiltro >
                        <IconeFiltro onClick={() => fetchFuncionarios()}>
                            <RiRefreshFill />
                        </IconeFiltro>
                        <IconeFiltro onClick={() => setFiltroVisivel(true)}> {/* Abre o modal */}
                            {filtroVisivel ? <FaFilterCircleDollar /> : <FaFilter />} {/* Use apenas o ícone de filtro para abrir */}
                        </IconeFiltro>
                        <IconeFiltro onClick={() => handleClearFilters()}>
                            <FaFilterCircleXmark />
                        </IconeFiltro>
                    </AgrupamentoFiltro>
                    <Link to="/funcionarios/cadastro">
                         <BotaoCadastro>Cadastrar</BotaoCadastro>
                    </Link>
                </ContainerFiltro>
                <ContainerResultado>
                <DataTable
                        data={funcionarios}
                        headerColumns={headerColumns}
                        actionButtons={actionButtonsFuncionarios} // Se você definiu botões de ação
                    />
                </ContainerResultado>
            </Article>
        </Main>

        {filtroVisivel && ( 
            <FiltroLateral onClose={() => setFiltroVisivel(false)} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters}>

                <ContainerFiltroData>
                    <CampoBuscaData
                        htmlFor={"DataAdmissaoInicial"}
                        titulo={"Data de Admissão:"}
                        type={"date"}
                        value={dataAdmissaoInicial}
                        onChange={(e) => setDataAdmissaoInicial(e.target.value)}
                    />

                    <CampoBuscaData
                        htmlFor={"DataAdmissaoFinal"}
                        titulo={"Data de Admissão"}
                        type={"date"}
                        value={dataAdmissaoFinal}
                        onChange={(e) => setDataAdmissaoFinal(e.target.value)}
                    />
                </ContainerFiltroData>

                <CampoBuscaTexto  
                        htmlFor={"BuscaNomeFuncionario"}
                        titulo={"Nome Funcionário:"}
                        type={"text"}
                        value={nomeFiltro}
                        onChange={(e) => setNomeFiltro(e.target.value)} // Atualiza o estado nomeFiltro
                />

                <CampoBuscaTexto 
                        htmlFor={"BuscaCargo"}
                        titulo={"Cargo:"}
                        type={"text"}
                        value={cargoFiltro}
                        onChange={(e) => setCargoFiltro(e.target.value)}
                />

            </FiltroLateral>
        )}
        <FooterPadrao />
        </>
    )
}