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
  ButtonCadastro,
  ButtonCancelar
} from "./styled";

export default function PageGenerosCadastro() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [genero, setGenero] = useState({
        descricao: '',
    });

    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();
    const acervoService = new AcervoService(); // Instantiate your service

    const fetchGeneroParaEdicao = async (generoId) => {
        setLoading(true);
        setError('');
        const response = await acervoService.getGenerosById(generoId);

        if (response) {
            setGenero({
                descricao: response.descricao || '',
            });
        }
        setLoading(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenero(prevGenero => ({
            ...prevGenero,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let response;
        if (isEditing) {
           response = await acervoService.putGeneros(id, genero);
           if (response === 200) {
                navigate('/acervo/generos');
            }
            return;
        }

        response = await acervoService.postGeneros(genero);
        if (response && response.id) {
            navigate('/acervo/generos');
        }

    };

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchGeneroParaEdicao(id);
        }
    }, [id]);

    return (
        <>
            <DefaultHeader />
            <Main>
                <Article>
                    <h2>{isEditing ? 'Editar Genero' : 'Cadastrar Genero'}</h2>

                    {loading && <p>Carregando...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Form onSubmit={handleSubmit}>
                            <InputContainer>

                                <InputGeneric
                                    titulo="Descrição"
                                    id="descricao"
                                    name="descricao"
                                    type="text"
                                    required={true}
                                    value={genero.descricao}
                                    onChange={handleChange}
                                    maxLength={200} 
                                />

                            </InputContainer>

                            <ContainerButao>
                            <ButtonCadastro type="submit" disabled={loading}>
                                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                            </ButtonCadastro>
                            <ButtonCancelar type="button" onClick={() => navigate('/acervo/generos')}>
                                Cancelar
                            </ButtonCancelar>
                            </ContainerButao>
                        </Form>
                    </Article>
            </Main>
        </>
    )
};