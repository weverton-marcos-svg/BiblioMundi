import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderPadrao from '../../../components/HeaderPadrao';
import { Form, InputContainer, Label, InputField, Main,InputContainerData, Article, ButtonCadastro, ButtonCancelar, Span, Select, ContainerButao, InputFieldDate, CalendarIcon} from './styled'; // Importe os estilos do form e input/


const CadastroFuncionario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState({
    nome: '',
    email: '',
    idCargo: 0,
    dataAdmissao: '',
    telefone: ''
  });
  const dateInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cargos, setCargos] = useState([]);
  
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchFuncionarioParaEdicao(id);
    }
  }, [id]);

  const fetchFuncionarioParaEdicao = async (funcionarioId) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://localhost:5000/api/Funcionario/${funcionarioId}`); 
      if (!response.ok) {
        throw new Error(`Erro ao buscar funcionário: ${response.status}`);
      }
      const data = await response.json();
      setFuncionario({
        nome: data.nome || '', // Use valores padrão caso a API não retorne o campo
        email: data.email || '',
        idCargo: data.cargo.id || 0,
        dataAdmissao: data.dataAdmissao || new Date().toISOString(),
        telefone: data.telefone || '',
      });
      console.log(funcionario);
    } catch (err) {
      setError('Erro ao carregar dados do funcionário para edição.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    funcionario.idCargo = parseInt(funcionario.idCargo);
    try {
      const url = isEditing
        ? `https://localhost:5000/api/Funcionario/${id}` // Rota para edição (PUT ou PATCH)
        : 'https://localhost:5000/api/Funcionario/'; // Rota para cadastro (POST)
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? 'editar' : 'cadastrar'} funcionário: ${response.status}`);
      }

      console.log(`Funcionário ${isEditing ? 'editado' : 'cadastrado'} com sucesso!`);
      navigate('/funcionarios'); // Redireciona para a página de listagem
    }
    catch (err) {
      setError(`Erro ao ${isEditing ? 'editar' : 'cadastrar'} funcionário.`);
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchCargos = async () => {
    const url = 'https://localhost:5000/api/cargos'

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCargos(data);
    } 
    catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

   useEffect(() => {
      fetchCargos(); // Carrega todos os funcionários inicialmente
    }, []);

  function formatDateForInput(datetimeString) {
    if (!datetimeString) {
      return ''; // Retorna uma string vazia se a data for nula ou indefinida
    }
    const date = new Date(datetimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês e formata com zero à esquerda
    const day = date.getDate().toString().padStart(2, '0'); // Formata o dia com zero à esquerda
    return `${year}-${month}-${day}`;
  }


  return (
    <>
      <HeaderPadrao />
      <Main>
        <Article>
          <h2>{isEditing ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <p>Carregando...</p>}

          <Form onSubmit={handleSubmit} disabled={loading}>
            <InputContainer>
              <Label htmlFor="nome">Nome:</Label>
              <InputField
                type="text"
                id="nome"
                name="nome"
                value={funcionario.nome}
                onChange={handleChange}
                required
              />     

              <Label htmlFor="email">Email:</Label>
              <InputField
                type="email"
                id="email"
                name="email"
                value={funcionario.email}
                onChange={handleChange}
                required
              />

              <Label htmlFor="cargo">Cargo:</Label>
              <Select id="cargo"
                name="idCargo"
                onChange={handleChange}
                value={funcionario.idCargo}
              >
                <option value={0} disabled selected={!isEditing}>Selecione...</option>
                {cargos.map((cargo) => (
                    <option key={cargo.id} value={cargo.id}>
                     {cargo.descricao}
                    </option>
                  ))}
              </Select>
              
              <Label htmlFor="dataAdmissao">Data de Admissão:</Label>
              <InputContainerData>
                <InputFieldDate
                  type="date"
                  id="dataAdmissao"
                  name="dataAdmissao"
                  value={formatDateForInput(funcionario.dataAdmissao)}
                  onChange={handleChange}
                  ref={dateInputRef}
                />
                <CalendarIcon onClick={() =>dateInputRef.current.showPicker()}/>

              </InputContainerData>

              <Label htmlFor="telefone">Telefone:</Label>
              <Span>Adicionar no formato (11) 99999-9999</Span>
              <InputField
                type="tel"
                id="telefone"
                name="telefone"
                value={funcionario.telefone}
                onChange={handleChange}
              />
            </InputContainer>
            
            <ContainerButao>
              <ButtonCadastro type="submit" disabled={loading}>
                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
              </ButtonCadastro>
              <ButtonCancelar type="button" onClick={() => navigate('/funcionarios')}>
                Cancelar
              </ButtonCancelar>
            </ContainerButao>
          </Form>
        </Article>
      </Main>
    </>
  );
};

export default CadastroFuncionario;