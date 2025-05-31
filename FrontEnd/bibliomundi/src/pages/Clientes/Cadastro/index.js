import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DefaultHeader from "../../../components/DefaultHeader";
import InputGeneric from "../../../components/Inputs/InputGeneric";
import InputDate from "../../../components/Inputs/InputDate";
import ClientesService from "../../../services/clientes";
import { Main, Article, ContainerButao, 
  Form, InputContainer, Tab, TabButton, TabContent, 
  ToggleButton ,ToggleInput,ToggleLabel,ToggleContainer, OptionContainer,
  TextArea,Label,Select,UFContainer,ButtonCadastro,ButtonCancelar } from "./styled";

export default function PageClientesCadastro() {
  const [activeTab, setActiveTab] = useState('Cliente'); // Estado para controlar a tab ativa
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cliente, setCliente] = useState({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      dataNascimento: '',
      endereco: {
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      },
      observacao: '',
      bloquearEmprestimo: false,
    });

  const { id } = useParams();
  const navigate = useNavigate();
  const clientesService = new ClientesService();

  const handleTabClick = (tabName, e) => {
    e.preventDefault(); // Evita o recarregamento do formulário
    setActiveTab(tabName);
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const actualValue = type === 'checkbox' ? checked : value;

    if (name.includes('.')) {
      const [objectName, propertyName] = name.split('.');

      setCliente(prevState => ({
        ...prevState,
        [objectName]: {
          ...prevState[objectName],
          [propertyName]: actualValue,
        },
      }));
    } else {    
      setCliente(prevState => ({
        ...prevState,
        [name]: actualValue,
      }));
    }
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    setError('');

    let menssagem,response;
    if(!isEditing){
      menssagem = 'Erro ao cadastrar o cliente'
      try {
        response = await clientesService.postClientes(cliente);
      }catch (erro) {
        console.log('Erro ao cadastrar clietnte',erro)
      }
    }
    else{
      menssagem = 'Erro ao atualizar o cliente'
      try{
        response = await clientesService.putClientes(id,cliente);
      }catch (erro){
        console.log('Erro ao atualizar o cliente',erro)
      }
    }

    if (response.status === 200) {
       navigate('/clientes')
    } else {
      alert(`${menssagem}`);
    }

  };

  const fetchClienteParaEdicao = async (clienteId) => {
    setLoading(true);
    setError('');

    try {
      const response = await clientesService.getClientesById(clienteId);
      if (response) {
        setCliente({
          nome: response.nome || '',
          email: response.email || '',
          telefone: response.telefone || '',
          cpf: response.cpf || '',
          dataNascimento: response.dataNascimento || '',
          endereco: {
            endereco: response.endereco.endereco || '',
            numero: response.endereco.numero || '',
            complemento: response.endereco.complemento || '',
            bairro: response.endereco.bairro || '',
            cidade: response.endereco.cidade || '',
            uf: response.endereco.uf || '',
            cep: response.endereco.cep || ''
          },
          observacao: response.observacao || '',
          bloquearEmprestimo: response.bloquearEmprestimo || false,
        });
      }
    }
    catch(err) {
      setError('Erro ao carregar dados do cliente para edição.',err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchClienteParaEdicao(id);
    }
  }, [id]);

  return (
    <>
      <DefaultHeader 
        url = '/Clientes'
      />
      <Main>
        <Article>
          <h2>{isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <p>Carregando...</p>}

          <Form  onSubmit={handleSubmit}>
            <InputContainer>
              <Tab>
                <TabButton
                  className={activeTab === 'Cliente' ? 'tablinks active' : 'tablinks'}
                  onClick={(e) => handleTabClick('Cliente', e)}
                >
                  Cliente
                </TabButton>

                <TabButton
                  className={activeTab === 'Endereco' ? 'tablinks active' : 'tablinks'}
                  onClick={(e) => handleTabClick('Endereco', e)}
                >
                  Endereço
                </TabButton>

                <TabButton
                  className={activeTab === 'Observacao' ? 'tablinks active' : 'tablinks'}
                  onClick={(e) => handleTabClick('Observacao', e)}
                >
                  Observações
                </TabButton>
              </Tab>

              <TabContent id="Cliente" style={{ display: activeTab === 'Cliente' ? 'block' : 'none' }}>
                <h3>Dados do Cliente</h3>

                <InputGeneric 
                  htmlFor="nome"
                  titulo="Nome"
                  type="text"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                  required={true}
                  maxLength={250}
                  placeholder="Digite o nome do cliente"
                />

                <InputGeneric 
                  htmlFor="CPF"
                  titulo="CPF"
                  type="text"
                  name="cpf"
                  value={cliente.cpf}
                  onChange={handleChange}
                  required={true}
                  maxLength={12}
                  placeholder="Digite o CPF do cliente sem pontos"
                />

                <InputGeneric 
                  htmlFor="Email"
                  titulo="Email"
                  type="email"
                  name="email"
                  value={cliente.email}
                  onChange={handleChange}
                  required={true}
                  maxLength={250}
                />

                <InputDate 
                  htmlFor="DataNascimento"
                  titulo="Data de Nascimento" 
                  type="date"
                  name="dataNascimento"
                  value={cliente.dataNascimento}
                  onChange={handleChange}
                  required={true}
                />

                <InputGeneric 
                  htmlFor="telefone"
                  titulo="Telefone"
                  type="tel"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                  required={true}
                  maxLength={250}
                />
              </TabContent>

              <TabContent id="Endereco" style={{ display: activeTab === 'Endereco' ? 'block' : 'none' }}>
                <h3>Dados de Endereço</h3>

                <InputGeneric 
                  htmlFor="Endereco"
                  titulo="Endereço"
                  type="text"
                  name="endereco.endereco"
                  value={cliente.endereco.endereco}
                  onChange={handleChange}
                  required={true}
                  maxLength={250}
                />

                <UFContainer>
                  <Label htmlFor="UF">Estado:</Label>
                  <Select id="UF"
                    name="endereco.uf"
                    onChange={handleChange}
                    value={cliente.endereco.uf}
                  >
                    <option value={""} disabled selected={!isEditing}>Selecione...</option>
                    <option value={"AC"}>Acre</option>
                    <option value={"AL"}>Alagoas</option>
                    <option value={"AP"}>Amapá</option>
                    <option value={"AM"}>Amazonas</option>
                    <option value={"BA"}>Bahia</option>
                    <option value={"CE"}>Ceará</option>
                    <option value={"DF"}>Distrito Federal</option>
                    <option value={"ES"}>Espírito Santo</option>
                    <option value={"GO"}>Goiás</option>
                    <option value={"MA"}>Maranhão</option>
                    <option value={"MT"}>Mato Grosso</option>
                    <option value={"MS"}>Mato Grosso do Sul</option>
                    <option value={"MG"}>Minas Gerais</option>
                    <option value={"PA"}>Pará</option>
                    <option value={"PB"}>Paraíba</option>
                    <option value={"PR"}>Paraná</option>
                    <option value={"PE"}>Pernambuco</option>
                    <option value={"PI"}>Piauí</option>
                    <option value={"RJ"}>Rio de Janeiro</option>
                    <option value={"RN"}>Rio Grande do Norte</option>
                    <option value={"RS"}>Rio Grande do Sul</option>
                    <option value={"RO"}>Rondônia</option>
                    <option value={"RR"}>Roraima</option>
                    <option value={"SC"}>Santa Catarina</option>
                    <option value={"SP"}>São Paulo</option>
                    <option value={"SE"}>Sergipe</option>
                    <option value={"TO"}>Tocantins</option>
                    <option value={"EX"}>Estrangeiro</option>
                    <option value={"ZZ"}>Não Informado</option>
                  </Select>
                </UFContainer>

                <InputGeneric 
                  htmlFor="Cidade"
                  titulo="Cidade"
                  type="text"
                  name="endereco.cidade"
                  value={cliente.endereco.cidade}
                  onChange={handleChange}
                  required={true}
                  maxLength={200}
                />
                

                <InputGeneric 
                  htmlFor="Bairro"
                  titulo="Bairro"
                  type="text"
                  name="endereco.bairro"
                  value={cliente.endereco.bairro}
                  onChange={handleChange}
                  required={true}
                  maxLength={200}
                />

              </TabContent>

              <TabContent id="Observacao" style={{ display: activeTab === 'Observacao' ? 'block' : 'none' }}>
                <h3>Observação</h3>

                <OptionContainer>
                  <p>Bloqueado para emprestimo</p>

                  <ToggleContainer>
                    <ToggleInput 
                      type="checkbox"
                      id="bloqueado"
                      name="bloquearEmprestimo" // Adicione o name para o handleChange funcionar
                      checked={cliente.bloquearEmprestimo} // Vincule ao estado cliente.bloqueado
                      onChange={handleChange} // Use a função handleChange existente
                    />
                    <ToggleLabel htmlFor="bloqueado" toggledOn={cliente.bloquearEmprestimo}> {/* Use cliente.bloqueado */}
                       <ToggleButton toggledOn={cliente.bloquearEmprestimo} /> {/* Use cliente.bloqueado */}
                    </ToggleLabel>
                  </ToggleContainer>
                </OptionContainer>

                <TextArea
                  id="observacao"
                  name="observacao" // Adicione o name para o handleChange funcionar
                  value={cliente.observacao} // Vincule ao estado cliente.observacao
                  onChange={handleChange} // Use a função handleChange existente
                  placeholder="Digite alguma observação sobre o cliente"
                >

                </TextArea>
              </TabContent>
            </InputContainer>

            <ContainerButao>
              <ButtonCadastro type="submit" disabled={loading} onClick={handleSubmit}>
                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
              </ButtonCadastro>
              <ButtonCancelar type="button" onClick={() => navigate('/clientes')}>
                Cancelar
              </ButtonCancelar>
            </ContainerButao>
          </Form>
        </Article>
      </Main>
    </>
  );
}