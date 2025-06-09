using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador.Padrao;
using BiblioMundiApi.TratamentoDeErro;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador
{
    public class GenerosManipulador : PadraoManipulador
    {
        private readonly IGenerosRepositorio _generosRepositorio;
        public GenerosManipulador(IGenerosRepositorio generosRepositorio)
        {
            _generosRepositorio = generosRepositorio;
        }

        public async Task<PadraoCadastroComandoSaida> Incluir(PadraoCadastroComandoEntrada parametrosCadastro)
        {
            await Validacao(parametrosCadastro,0);
            var registros = new GenerosEntidade();

            PreencherCampos(registros, parametrosCadastro);

            await _generosRepositorio.Incluir(registros);
            await _generosRepositorio.Salvar();

            return new PadraoCadastroComandoSaida()
            {
                Id = registros.Id,
                DataInclusao = registros.DataInclusao
            };
        }

        public async Task Alterar(int Id, PadraoCadastroComandoEntrada parametrosAlteracao)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id para alteração do Autor não foi informado.");
            }
           
            await Validacao(parametrosAlteracao, Id);
            var registro = await ValidarRegistroExiste(Id, _generosRepositorio);

            PreencherCampos(registro, parametrosAlteracao);

            await _generosRepositorio.Salvar();

        }

        public async Task<StatusLogicaPadraoComandoSaida> AlterarStatusLogico(int Id)
        {
            var registro = await _generosRepositorio.LocalizarPorIdEntidade(Id);
            registro.Inativo = !registro.Inativo;

            await _generosRepositorio.Salvar();
            return new StatusLogicaPadraoComandoSaida()
            {
                Inativo = registro.Inativo
            };
        }

        private async Task Validacao(PadraoCadastroComandoEntrada parametro, int Id)
        {
            var registro = await _generosRepositorio.LocalizarPorDescricao(parametro.Descricao);

            if (registro is not null && registro?.Id != Id)
            {
                throw new ErroExcecao($"Já existe um genero com a descrição {parametro.Descricao}");
            }
        }

        private void PreencherCampos(GenerosEntidade registro, PadraoCadastroComandoEntrada parametro)
        {
            registro.Descricao = parametro.Descricao;
        }
    }
}
