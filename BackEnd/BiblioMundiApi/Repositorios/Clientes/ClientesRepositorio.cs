using BiblioMundiApi.Comando.Clientes;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Clientes
{
    public class ClientesRepositorio : PadraoRepositorio<ClientesEntidade>, IClientesRepositorio
    {
        public ClientesRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {
        }

        public async Task<List<ClientesListarTodosComandoSaida>> ListarTodos(ClientesListarTodosComandoEntrada filtros)
        {
            var consultaBd = _conexaoSql.Clientes.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(filtros.Nome) )
            {
                consultaBd = consultaBd.Where(x => x.Nome.Trim().ToUpper() == filtros.Nome.Trim().ToUpper());
            }

            if (!string.IsNullOrWhiteSpace(filtros.Email))
            {
                consultaBd = consultaBd.Where(x => x.Email.Trim().ToUpper() == filtros.Email.Trim().ToUpper());
            }

            if (!string.IsNullOrWhiteSpace(filtros.CPF))
            {
                consultaBd = consultaBd.Where(x => x.CPF.Trim().ToUpper() == filtros.CPF);
            }

            var listagem = await consultaBd
                           .Select(x => new ClientesListarTodosComandoSaida()
                           {
                               Id = x.Id,
                               Nome = x.Nome,
                               Email = x.Email,
                               CPF = x.CPF,
                               Inativo = x.Inativo,
                               BloquearEmprestimo = x.BloquearEmprestimo,
                               DataInclusao = x.DataInclusao,
                               DataAlteracao = x.DataAlteracao,
                               DataNascimento = x.DataNascimento
                           })
                           .OrderBy(x => x.DataInclusao)
                           .ToListAsync();

            return listagem;

        }
        public async Task<ClientesLocalizarPorIdComandoSaida> LocalizarPorId(int Id)
        {
            if (Id <= 0)
            {
                throw new Exception("Id do Cliente não foi informado para consulta.");
            }

            var registro = await _conexaoSql.Clientes
                            .Where(x => x.Id == Id)
                            .Select(x => new ClientesLocalizarPorIdComandoSaida()
                            {
                                Id = x.Id,
                                Nome = x.Nome,
                                Telefone = x.Telefone,
                                Email = x.Email,
                                CPF = x.CPF,
                                Observacao = x.Observacao,
                                Inativo = x.Inativo,
                                BloquearEmprestimo = x.BloquearEmprestimo,
                                DataInclusao = x.DataInclusao,
                                DataAlteracao = x.DataAlteracao,
                                DataNascimento = x.DataNascimento,
                                Endereco = new()
                                {
                                    Uf = x.Uf,
                                    Endereco = x.Endereco,
                                    Bairro = x.Bairro,
                                    Cidade = x.Cidade
                                }
                            })
                            .FirstOrDefaultAsync();

            if (registro is null)
            {
                throw new Exception("Nenhum registros foi encontrado.");
            }

            return registro;
        }
        public async Task<ClientesEntidade> LocalizarEntidadePorCPF(string cpf)
        {
            var clientes = await _conexaoSql.Clientes
                         .AsNoTracking()
                         .FirstOrDefaultAsync(x => x.CPF.Trim().ToUpper() == cpf);

            return clientes;
        }
        public async Task<ClientesEntidade> LocalizarEntidadePorId(int id)
        {
            var Cliente = await _conexaoSql.Clientes.FirstOrDefaultAsync(x => x.Id == id);

            if (Cliente is null)
            {
                throw new Exception($"Nenhum cliente com o id {id} encontrado.");
            }

            return Cliente; 
        }
    }
}
