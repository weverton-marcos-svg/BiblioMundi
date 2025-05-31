using BiblioMundiApi.Comando.Clientes;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador.Padrao;
using BiblioMundiApi.Utilitarios.Extensao;
using System;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador
{
    public class ClientesManipulador : PadraoManipulador
    {
        private readonly IClientesRepositorio _clientesRepositorio;

        public ClientesManipulador(IClientesRepositorio clientesRepositorio)
        {
            _clientesRepositorio = clientesRepositorio;
        }

        public async Task<PadraoCadastroComandoSaida> Incluir(ClientesCadastroComandoEntrada parametrosCadastro)
        {
            await Validacao(parametrosCadastro, 0);
            var registro = new ClientesEntidade();

            PreencherCampos(registro, parametrosCadastro);

            await _clientesRepositorio.Incluir(registro);
            await _clientesRepositorio.Salvar();

            return new PadraoCadastroComandoSaida()
            {
                Id = registro.Id,
                DataInclusao = registro.DataInclusao
            };

        }

        public async Task Alterar(int id, ClientesCadastroComandoEntrada parametrosAlteracao)
        {
            if (id <= 0)
            {
                throw new Exception("Id para alteração do funcionário não foi informado.");
            }

            await Validacao(parametrosAlteracao, id);
            var registro = await ValidarRegistroExiste(id, _clientesRepositorio);

            PreencherCampos(registro, parametrosAlteracao);

            await _clientesRepositorio.Salvar();
        }

        public async Task<StatusLogicaPadraoComandoSaida> AlterarStatusLogico(int Id)
        {
            var registro = await _clientesRepositorio.LocalizarPorIdEntidade(Id);

            registro.Inativo = !registro.Inativo;

            await _clientesRepositorio.Salvar();

            return new StatusLogicaPadraoComandoSaida()
            {
                Inativo = registro.Inativo
            };
        }
        private async Task Validacao(ClientesCadastroComandoEntrada comando, int Id)
        {
            comando.CPF.ValidarCPF();
            if (!comando.Email.ValidarEmail())
            {
                throw new Exception("E-mail inválido.");
            }

            var registro = await _clientesRepositorio.LocalizarEntidadePorCPF(comando.CPF);
            
            if (registro is not null && registro?.Id != Id)
            {
                throw new Exception($"Não é possivel cadastrar o cliente com o {registro.CPF} pois ele já está sendo utilizado no usuário de id {registro.Id}");
            }
        }

        private void PreencherCampos(ClientesEntidade registro, ClientesCadastroComandoEntrada comando)
        {
            registro.Nome = comando.Nome;
            registro.Telefone = comando.Telefone;
            registro.Email = comando.Email;
            registro.DataNascimento = comando.DataNascimento;
            registro.BloquearEmprestimo = comando.BloquearEmprestimo;
            registro.CPF = comando.CPF;
            registro.Observacao = comando.Observacao;

            if (comando.Endereco is not null)
            {
                registro.Uf = comando.Endereco.Uf;
                registro.Endereco = comando.Endereco.Endereco;
                registro.Bairro = comando.Endereco.Bairro;
                registro.Cidade = comando.Endereco.Cidade;
            }
            else
            {
                registro.Uf = string.Empty;
                registro.Endereco = string.Empty;
                registro.Bairro = string.Empty;
                registro.Cidade = string.Empty;
            }
            
        }
    }
}
