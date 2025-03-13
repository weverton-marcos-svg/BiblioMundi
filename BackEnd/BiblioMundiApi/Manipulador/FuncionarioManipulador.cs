using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador.Padrao;
using BiblioMundiApi.Repositorios.Cargos;
using System;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador
{
    public class FuncionarioManipulador : PadraoManipulador
    {
        private readonly IFuncionariosRepositorio _funcionarioRepositorio;
        private readonly ICargosRepositorio _cargosRepositorio;

        public FuncionarioManipulador(IFuncionariosRepositorio funcionariosRepositorio, ICargosRepositorio cargosRepositorio)
        {
            _cargosRepositorio = cargosRepositorio;
            _funcionarioRepositorio = funcionariosRepositorio;
        }

        public async Task<PadraoCadastroComandoSaida> Incluir(FuncionariosCadastroComandoEntrada parametrosCadastro)
        {
            await Validacao(parametrosCadastro, 0);
            var registro = new FuncionariosEntidade();

            PreencherCampos(registro, parametrosCadastro);

            await _funcionarioRepositorio.Incluir(registro);
            await _funcionarioRepositorio.Salvar();

            return new PadraoCadastroComandoSaida()
            {
                Id = registro.Id,
                DataInclusao = registro.DataInclusao
            };
        }

        public async Task Alterar(int id,FuncionariosCadastroComandoEntrada parametrosAlteracao)
        {
            if (id <= 0)
            {
                throw new Exception("Id para alteração do produto não foi informado.");              
            }

            await Validacao(parametrosAlteracao, id);
            var registro = await ValidarRegistroExiste(id, _funcionarioRepositorio);

            PreencherCampos(registro, parametrosAlteracao);

            await _funcionarioRepositorio.Salvar();
        }

        #region Metodos Privados
        private async Task Validacao(FuncionariosCadastroComandoEntrada registroCadastro, int Id)
        {
            var registro = await _funcionarioRepositorio.LocalizarPorEmail(registroCadastro.Email);

            if (registro is not null && registro?.Id != Id )
            {
                throw new Exception($"Não é possivel cadastrar o email {registroCadastro.Email} pois ele já está sendo utilizado no usuário de id {registro.Id}");
            }

            var registroCargo = await _cargosRepositorio.LocalizarPorId(registroCadastro.IdCargo);

            if (registroCadastro is null)
            {
                throw new Exception($"Cargo de id {registroCadastro.IdCargo} não existe.");
            }

            if (registroCargo.Inativo)
            {
                throw new Exception($"Cargo de id {registroCadastro.IdCargo} foi está desativado no sistema.");
            }
        }

        private void PreencherCampos(FuncionariosEntidade registro, FuncionariosCadastroComandoEntrada cadastro)
        {
            registro.Nome = cadastro.Nome.Trim();
            registro.Email = cadastro.Email;
            registro.Telefone = cadastro.Telefone;
            registro.DataAdmissao = cadastro.DataAdmissao;
            registro.Fk_cargo = cadastro.IdCargo;
        }
        #endregion

    }
}
