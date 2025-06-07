using BiblioMundiApi.Comando.Livros;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador.Padrao;
using BiblioMundiApi.Repositorios.Livros.Enum;
using BiblioMundiApi.TratamentoDeErro;
using Microsoft.VisualBasic;
using System;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador
{
    public class LivrosManipulador : PadraoManipulador
    {
        private readonly ILivrosRepositorio _livrosRepositorio;
        private readonly IAutoresRepositorio _autoresRepositorio;
        private readonly IGenerosRepositorio _generosRepositorio;

        public LivrosManipulador(ILivrosRepositorio livrosRepositorio, IAutoresRepositorio autoresRepositorio, IGenerosRepositorio generosRepositorio)
        {
            _livrosRepositorio = livrosRepositorio;
            _autoresRepositorio = autoresRepositorio;
            _generosRepositorio = generosRepositorio;
        }

        public async Task<PadraoCadastroComandoSaida> Incluir(LivroCadastroPadraoComandoEntrada parametros)
        {
            await Validacao(parametros, 0);
            var registro = new LivrosEntidade();

            PreencherCampos(registro, parametros);

            await _livrosRepositorio.Incluir(registro);
            await _livrosRepositorio.Salvar();

            return new PadraoCadastroComandoSaida()
            {
                Id = registro.Id,
                DataInclusao = registro.DataInclusao,
            };
        }

        public async Task Alterar(int Id, LivroCadastroPadraoComandoEntrada parametros)
        {
            await Validacao(parametros, Id);
            var registro = await ValidarRegistroExiste(Id, _livrosRepositorio);

            PreencherCampos(registro, parametros);
            await _livrosRepositorio.Salvar();
        }

        public async Task<StatusLogicaPadraoComandoSaida> AlterarStatusLogico(int Id)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id não foi informado.");
            }

            var registro = await _livrosRepositorio.LocalizarPorIdEntidade(Id);
            registro.Inativo = !registro.Inativo;

            await _livrosRepositorio.Salvar();
            return new StatusLogicaPadraoComandoSaida()
            {
                Inativo = registro.Inativo
            };
        }

        #region Metodos Privados
        public async Task Validacao(LivroCadastroPadraoComandoEntrada parametros, int Id)
        {
            
            if (parametros.AnoPublicao > DateTime.Now.Year)
            {
                throw new ErroExcecao("Ano de publicação não pode ser superior ao ano atual");
            }

            var registroAutor = await _autoresRepositorio.LocalizarEntidadePorId(parametros.IdAutor);

            if (registroAutor is null)
            {
                throw new ErroExcecao($"Autor informado é inválido {Id}");
            }

            var registroGenero = await _generosRepositorio.LocalizarEntidadePorId(parametros.IdGenero);

            if (registroGenero is null)
            {
                throw new ErroExcecao($"Autor informado é inválido {Id}");
            }

        }

        public void PreencherCampos(LivrosEntidade registro, LivroCadastroPadraoComandoEntrada parametro)
        {
            registro.Titulo = parametro.Titulo;
            registro.SubTitulo = parametro.SubTitulo;
            registro.Isbn = parametro.Isbn;
            registro.AnoPublicado = parametro.AnoPublicao;
            registro.NumeroDePaginas = parametro.NumeroDePaginas;
            registro.Idioma = parametro.Idioma;
            registro.Edicao = parametro.Edicao;
            registro.TipoFormato = (TipoFormatoEnum)parametro.TipoFormato;
            registro.QuantidadeDeCopias = parametro.QuantidadeDeCopias;
            registro.Autor = parametro.IdAutor;
            registro.Genero = parametro.IdGenero;
        }
        #endregion
    }
}
