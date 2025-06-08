import  React, {useState, useEffect} from 'react';
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
  ButtonCancelar,
  Label,
  Select
} from "./styled";

export default function PageLivrosCadastro() { 
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [livro, setLivro] = useState({});
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();
    const LivrosService = new AcervoService(); // Instantiate your service

    const fetchLivroParaEdicao = async (livroId) => {
        setLoading(true);
        setError('');

        const response = await LivrosService.getLivrosById(livroId);

        console.log(response);
        if (response) {
            setLivro({
                titulo: response.titulo || '',
                subtitulo: response.subTitulo || '',
                isbn: response.isbn || '',  
                idioma: response.idioma || '',
                edicao: response.edicao || '',
                anoPublicao: response.anoPublicacao || 0,
                numeroDePaginas: response.numeroDePaginas || 0,
                tipoFormato: response.formato.id || 0,
                idAutor: response.autor.id || 0,
                idGenero: response.genero.id || 0,
                quantidadeDeCopias: response.quantidadeDeCopias || 0,
            });
        }
        setLoading(false);
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setLivro(prevLivro => ({
    //         ...prevLivro,
    //         [name]: value
    //     }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Define um array de campos que devem ser números
        const numericFields = ['idAutor', 'idGenero', 'numeroDePaginas', 'tipoFormato','anoPublicao','quantidadeDeCopias'];

        setLivro((prevLivro) => ({
            ...prevLivro,
            // Verifica se o nome do campo atual está no nosso array numericFields
            // Se estiver, converte o valor para um número usando o operador unário de adição (+) ou parseInt/parseFloat
            // Caso contrário, usa o valor como está (que será uma string para outros campos)
            [name]: numericFields.includes(name) ? +value : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let response;
        if (isEditing) {
            response = await LivrosService.putLivros(id, livro);

            if (response == 200) {
                setLoading(false);
                navigate('/acervo/livros');
            }
            return;
        }
        
        response = await LivrosService.postLivros(livro);
        console.log(response);
        if (response && response.id) { 
            setLoading(false);
            navigate('/acervo/livros');
        }
    };

    const getAutores = async () => {
        const response = await LivrosService.getAutores();

        if(response){
            setAutores( response.map(autor => ({
                id: autor.id,
                nome: autor.nome
            })));
        }
    }

    const getGeneros = async () => {
        const response = await LivrosService.getGeneros();

        if(response){
            setGeneros(response.map(genero => ({
                id: genero.id,
                nome: genero.descricao
            })));
        }
    };

    useEffect(() => {
        getAutores();
        getGeneros();

        if (id) {
            setIsEditing(true);
            fetchLivroParaEdicao(id);
        }
    }, [id]);

    return(
        <>
           <DefaultHeader 
              url='/acervo/livros'
           />
           <Main>
                <Article>
                    <h2>{isEditing ? 'Editar Livro' : 'Cadastrar Livro'}</h2>

                    {loading && <p>Carregando...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Form onSubmit={handleSubmit}>
                        <InputContainer>
                            <InputGeneric
                                titulo="Nome"
                                id="titulo"
                                name="titulo"
                                value={livro.titulo || ''}
                                onChange={handleChange}
                                type="text"
                                required={true}
                                placeholder="Digite o título do livro"
                            />

                            <InputGeneric
                                titulo="Subtítulo"
                                id="subTitulo"
                                name="subTitulo"
                                value={livro.subtitulo}
                                onChange={handleChange}
                                type="text"
                                required={true}
                                placeholder="Digite o sub Título do livro"
                            />

                            <InputGeneric
                                titulo="ISBN"
                                id="isbn"
                                name="isbn"
                                value={livro.isbn || ''}
                                onChange={handleChange}
                                type="text"
                                required={true}
                                placeholder="Digite o ISBN do livro"        
                            />

                            <Label htmlFor="Autor">Autor:</Label>
                            <Select id="Autor"
                                name="idAutor"
                                onChange={handleChange}
                                value={livro.idAutor || 0}
                            >
                            <option value={0} disabled selected={!isEditing}>Selecione...</option>
                            {autores.map((autor) => (
                                <option key={autor.id} value={autor.id}>
                                    {autor.nome}
                                </option>
                            ))}
                            </Select>

                            <Label htmlFor="Gênero">Gênero:</Label>
                            <Select id="Genero"
                                name="idGenero"
                                onChange={handleChange}
                                value={livro.idGenero}
                            >
                            <option value={0} disabled selected={!isEditing}>Selecione...</option>
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>
                                    {genero.nome}
                                </option>
                            ))}
                            </Select>

                            <InputGeneric
                                titulo="Idioma"
                                id="idioma"
                                name="idioma"
                                value={livro.idioma || ''}
                                onChange={handleChange}
                                type="text"
                                required={true}
                                placeholder="Digite o idioma do livro"
                            />

                            <InputGeneric
                                titulo="Edição"
                                id="edicao"
                                name="edicao"
                                value={livro.edicao || ''}
                                onChange={handleChange}
                                type="text"
                                required={true}
                                placeholder="Digite a edição do livro" 
                            />

                            <InputGeneric 
                                titulo="Ano de Publicação"
                                id="anoPublicao"
                                name="anoPublicao"
                                value={livro.anoPublicao}
                                onChange={handleChange}
                                type="number"
                                required={true}
                                placeholder="Digite o ano de publicação do livro" 
                            />

                            <InputGeneric 
                                titulo="Número de Páginas"
                                id="numeroDePaginas"
                                name="numeroDePaginas"
                                value={livro.numeroDePaginas || ''}
                                onChange={handleChange}
                                type="number"
                                required={true}
                                placeholder="Digite o número de páginas do livro" 
                            />

                            <Label htmlFor="TipoFormato">Formato:</Label>
                            <Select id="TipoFormato"
                                name="tipoFormato"
                                onChange={handleChange}
                                value={livro.tipoFormato}
                            >
                            <option value={-1} disabled selected={!isEditing}>Selecione...</option>
                            <option value={1}>Livros</option>
                            <option value={2}>E-books</option>
                            <option value={3}>Manga</option>
                            <option value={4}>Graphic Novels</option>
                            <option value={5}>Novels Leves</option>
                            <option value={6}>Revistas</option>
                            <option value={7}>Livro Academico</option>
                            </Select>

                            <InputGeneric 
                                titulo="Quantidade De Copias"
                                id="quantidadeDeCopias"
                                name="quantidadeDeCopias"
                                value={livro.quantidadeDeCopias}
                                onChange={handleChange}
                                type="number"
                                required={true}
                                placeholder="Digite o número livros que a bibliotexa possui"
                            />
                        </InputContainer>

                        <ContainerButao>
                            <ButtonCadastro type="submit" disabled={loading}>
                                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                            </ButtonCadastro>
                            <ButtonCancelar type="button" onClick={() => navigate('/acervo/livros')}>
                                Cancelar
                            </ButtonCancelar>
                        </ContainerButao>
                    </Form>
                </Article>
           </Main>
        </>
    )
}