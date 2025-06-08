using BiblioMundiApi.Comando.Autores;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador.Padrao;
using BiblioMundiApi.TratamentoDeErro;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador
{
    public class AutoresManipulador : PadraoManipulador
    {
        private readonly IAutoresRepositorio _autoresRepositorio;

        public AutoresManipulador(IAutoresRepositorio autoresRepositorio)
        {
            _autoresRepositorio = autoresRepositorio;
        }

        public async Task<PadraoCadastroComandoSaida> Incluir(AutoresCadastroPadraoComandoEntrada parametros)
        {
            await Validacao(parametros, 0);
            var registro = new AutoresEntidade();

            PreencherCampos(registro, parametros);

            await _autoresRepositorio.Incluir(registro);
            await _autoresRepositorio.Salvar();

            return new PadraoCadastroComandoSaida()
            {
                Id = registro.Id,
                DataInclusao = registro.DataInclusao
            };
        }

        public async Task Alterar(int Id, AutoresCadastroPadraoComandoEntrada parametros)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id do autor para alteração não foi informado.");
            }

            await Validacao(parametros, Id);
            var registro = await ValidarRegistroExiste(Id, _autoresRepositorio);

            PreencherCampos(registro, parametros);

            await _autoresRepositorio.Salvar();
        }

        public async Task<StatusLogicaPadraoComandoSaida> AlterarStatusLogico(int Id)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id não foi informado.");
            }

            var registro = await _autoresRepositorio.LocalizarPorIdEntidade(Id);

            registro.Inativo = !registro.Inativo;

            await _autoresRepositorio.Salvar();

            return new StatusLogicaPadraoComandoSaida()
            {
                Inativo = registro.Inativo
            };
        }

        #region Metodos privados
        public async Task Validacao(AutoresCadastroPadraoComandoEntrada parametros, int Id)
        {
            var registro = await _autoresRepositorio.LocalizarPorNome(parametros.Nome);

            if (registro is not null && registro.Id != Id)
            {
                throw new ErroExcecao("Já existe um Autor com esse nome.");  
            }
        }

        public void PreencherCampos(AutoresEntidade registro, AutoresCadastroPadraoComandoEntrada parametros)
        {
            registro.DataNascimento = parametros.DataNascimento;
            registro.Nacionalidade = parametros.Nacionalidade;
            registro.Nome = parametros.Nome;
        }

        #endregion
    }
}
