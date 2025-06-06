import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultHeader from '../../../components/DefaultHeader';
import InputDate from '../../../components/Inputs/InputDate';
import InputGeneric from '../../../components/Inputs/InputGeneric';
import { Form, InputContainer, Label, Main, Article, ButtonCadastro, ButtonCancelar, Span, Select, ContainerButao} from './styled'; 

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
        nome: data.nome || '',
        email: data.email || '',
        idCargo: data.cargo.id || 0,
        dataAdmissao: data.dataAdmissao || new Date().toISOString(),
        telefone: data.telefone || '',
      });
      console.log(funcionario);
    } catch (err) {
      setError('Erro ao carregar dados do funcionário para edição.');
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

  return (
    <>
      <DefaultHeader 
        url = '/funcionarios'
      />
      <Main>
        <Article>
          <h2>{isEditing ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <p>Carregando...</p>}

          <Form onSubmit={handleSubmit} disabled={loading}>
            <InputContainer>
              <InputGeneric
                type="text"
                id="nome"
                name="nome"
                titulo="Nome:"
                value={funcionario.nome}
                onChange={handleChange}
                required={true}
              />     

              <InputGeneric
                type="email"
                id="email"
                name="email"
                value={funcionario.email}
                onChange={handleChange}
                required={true}
                titulo="Email:"
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

              <InputDate
                type="date"
                id="dataAdmissao"
                name="dataAdmissao"
                titulo="Data de Admissão:"
                value={funcionario.dataAdmissao}
                onChange={handleChange}
                required={true}
              />

              <InputGeneric
                type="tel"
                id="telefone"
                name="telefone"
                titulo="Telefone:"
                value={funcionario.telefone}
                onChange={handleChange}
              />
              <Span>Adicionar no formato (11) 99999-9999</Span>
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