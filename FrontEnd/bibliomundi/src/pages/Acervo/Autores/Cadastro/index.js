import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DefaultHeader from "../../../../components/DefaultHeader"; // Adjust path if necessary
import InputGeneric from "../../../../components/Inputs/InputGeneric"; // Adjust path if necessary
import InputDate from "../../../../components/Inputs/InputDate"; // Adjust path if necessary
import AcervoService from "../../../../services/Acervo"; // Use your existing AcervoService

import {
  Main,
  Article,
  ContainerButao,
  Form,
  InputContainer,
  TextArea,
  ButtonCadastro,
  ButtonCancelar
} from "./styled";

export default function PageAutoresCadastro() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autor, setAutor] = useState({
    nome: '',
    dataNascimento: '',
    nacionalidade: ''
  });

  const { id } = useParams(); // Get ID from URL for editing
  const navigate = useNavigate();
  const acervoService = new AcervoService(); // Instantiate your service

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchAutorParaEdicao(id);
    }
  }, [id]);

  const fetchAutorParaEdicao = async (autorId) => {
    setLoading(true);
    setError('');
    const response = await acervoService.getAutoresById(autorId);

    if (response) {
      setAutor({
        nome: response.nome || '',
        dataNascimento:  response.dataNascimento || null,
        nacionalidade: response.nacionalidade || ''
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor(prevAutor => ({
      ...prevAutor,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let response;
    if (isEditing) {
      response = await acervoService.putAutores(id, autor);
      if (response == 200) 
      {
        navigate('/acervo/autores');
      }
      return
    } 
     
    response = await acervoService.postAutores(autor);
    if (response && response.id) { // Check for an 'id' in the response to confirm success
        navigate('/acervo/autores');
    }
  };

  return (
    <>
      <DefaultHeader />
      <Main>
        <Article>
          <h2>{isEditing ? 'Editar Autor' : 'Cadastrar Autor'}</h2>

          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form onSubmit={handleSubmit}>
            <InputContainer>

              <InputGeneric
                titulo="Nome Completo"
                id="nome"
                name="nome"
                type="text"
                required={true}
                value={autor.nome}
                onChange={handleChange}
                maxLength={200}
              />
              <InputDate
                titulo="Data de Nascimento"
                htmlFor="dataNascimento"
                type="date"
                name="dataNascimento"
                required={true}
                value={autor.dataNascimento}
                onChange={handleChange}
              />
              <InputGeneric
                titulo="Nacionalidade"
                id="nacionalidade"
                name="nacionalidade"
                type="text"
                required={true}
                value={autor.nacionalidade}
                onChange={handleChange}
                maxLength={100}
              />
            </InputContainer>

            <ContainerButao>
              <ButtonCadastro type="submit" disabled={loading}>
                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
              </ButtonCadastro>
              <ButtonCancelar type="button" onClick={() => navigate('/acervo/autores')}>
                Cancelar
              </ButtonCancelar>
            </ContainerButao>
          </Form>
        </Article>
      </Main>
    </>
  );
}