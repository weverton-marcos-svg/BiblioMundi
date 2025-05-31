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
import {Main, 
  ContainerFiltro, 
  ContainerResultado, 
  Article, 
  AgrupamentoFiltro,
  ContainerFiltroData,
  RefreshIconeFiltro,
  FilterIconeFiltro,
  FilterDollarIconeFiltro,
} from './styled';

export default function PageFuncionariosHome(){

    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [nomeFiltro, setNomeFiltro] = useState(''); 
    const [cargoFiltro, setCargoFiltro] = useState('');
    const [dataAdmissaoInicial, setDataAdmissaoInicial] = useState('');
    const [dataAdmissaoFinal, setDataAdmissaoFinal] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [funcionarioIdParaInativar, setFuncionarioIdParaInativar] = useState(null);
    const [mensagemModal, setMensagemModal] = useState('');
    const navigate = useNavigate();

    const fetchFuncionarios = async (filtros = {}) => {
        let url = 'http://localhost:5000/api/Funcionario';
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
          const listagemFuncionario = data.map(funcionarioAPI => ({
            id: funcionarioAPI.id || null,
            nome: funcionarioAPI.nome || '',
            email: funcionarioAPI.email || '',
            Inativo: funcionarioAPI.inativo || false,
            cargo: funcionarioAPI.cargo.descricao || '',
            dataAdmissao: funcionarioAPI.dataAdmissao || null,
          }));
          setFuncionarios(listagemFuncionario);
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
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

    const handleVisualizarClick = (funcionario) => {
        setFuncionarioIdParaInativar(funcionario.id);
        setMensagemModal(`Deseja realmente inativar/ativar o funcionário de id: ${funcionario.id} - ${funcionario.nome}?`);
        setIsModalVisible(true);
    };

    const handleConfirmarInativacao = async () => {
        setIsModalVisible(false);
        if (funcionarioIdParaInativar) {
          try {
            const response = await fetch(`https://localhost:5000/api/Funcionario/${funcionarioIdParaInativar}/StatusLogico`, {
              method: 'PUT', // Ou o método HTTP correto para inativação
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inativo: true }), // Assumindo que você envia um objeto com a propriedade 'inativo'
            });
    
            if (response.ok) {
              console.log(`Funcionário com ID ${funcionarioIdParaInativar} inativado com sucesso.`);
              fetchFuncionarios();
            } 
            else {
              console.error('Erro ao inativar funcionário:', response.status);
            }
          } 
          catch (error) {
            console.error('Erro ao inativar funcionário:', error);
          } 
          finally {
            setFuncionarioIdParaInativar(null); 
          }
        }
    };

    const handleCancelarModal = () => {
      setIsModalVisible(false);
      setFuncionarioIdParaInativar(null); 
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

    const actionButtonsFuncionarios = [
        { label: '', icon: <LuEyeOff />, onClick: handleVisualizarClick },
        { label: '', icon: <LuPencil />, onClick: (funcionario) => {navigate(`/funcionarios/cadastro/${funcionario.id}`); }},
    ];

    return(
        <>
        <DefaultHeader 
          url = '/home'
        />
        <Main>
            <Article>
                <ContainerFiltro>

                  <AgrupamentoFiltro >
                    <RefreshIconeFiltro onClick={() => fetchFuncionarios()} />
                    {filtroVisivel 
                      ? <FilterDollarIconeFiltro onClick={() => setFiltroVisivel(false)} />
                      : <FilterIconeFiltro onClick={() => setFiltroVisivel(true)} />
                    }
                  </AgrupamentoFiltro>

                  <StandardButton
                    texto={"Cadastar novo funcionario"}
                    redirecionarUrl={"/funcionarios/cadastro"}
                  />

                </ContainerFiltro>

                <ContainerResultado>
                    <DefaultDataTable
                        data={funcionarios}
                        headerColumns={headerColumns}
                        actionButtons={actionButtonsFuncionarios} // Se você definiu botões de ação
                    />
                    <ConfirmationModal
                        isOpen={isModalVisible}
                        onClose={handleCancelarModal}
                        onConfirm={handleConfirmarInativacao}
                        mensagem={mensagemModal}
                    />
                </ContainerResultado>
            </Article>
        </Main>

        {filtroVisivel && ( 
            <SideFilter onClose={() => setFiltroVisivel(false)} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters}>

                <ContainerFiltroData>
                    <InputDate
                        htmlFor={"DataAdmissaoInicial"}
                        titulo={"Data de Admissão:"}
                        type={"date"}
                        value={dataAdmissaoInicial}
                        onChange={(e) => setDataAdmissaoInicial(e.target.value)}
                      />

                    <InputDate
                        htmlFor={"DataAdmissaoFinal"}
                        titulo={"Data de Admissão"}
                        type={"date"}
                        value={dataAdmissaoFinal}
                        onChange={(e) => setDataAdmissaoFinal(e.target.value)}
                      />

                </ContainerFiltroData>

                <InputGeneric 
                  htmlFor={"BuscaNomeFuncionario"}
                  titulo={"Nome Funcionário:"}
                  type={"text"}
                  value={nomeFiltro}
                  onChange={(e) => setNomeFiltro(e.target.value)}
                  required={false}
                />

                <InputGeneric 
                  htmlFor={"BuscaCargo"}
                  titulo={"Cargo:"}
                  type={"text"}
                  value={cargoFiltro}
                  onChange={(e) => setCargoFiltro(e.target.value)}
                  required={false}
                />

            </SideFilter>
        )}
        <StandardFooter />
        </>
    )
}