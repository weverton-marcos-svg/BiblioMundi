using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Funcionarios
{
    public class FuncionariosRepositorio : PadraoRepositorio<FuncionariosEntidade>, IFuncionariosRepositorio
    {
        public FuncionariosRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {
        }

        public async Task<List<FuncionariosListarTodosComandoSaida>> ListarTodos(FuncionariosListarTodosComandoEntrada filtros)
        {
            var consulta = _conexaoSql.Funcionarios
                            .Include(x => x.CargoEntidade)
                            .AsNoTracking();

            if (filtros.DataAdmissaoInicial.HasValue)
            {
                consulta = consulta.Where(x => x.DataAdmissao >= filtros.DataAdmissaoInicial.Value);
            }

            if (filtros.DataAdmissaoFinal.HasValue)
            {
                consulta = consulta.Where(x => x.DataAdmissao <= filtros.DataAdmissaoFinal.Value.AddDays(1));
            }

            if (filtros.IdCargos.Count > 0)
            {
                consulta = consulta.Where(x => filtros.IdCargos.Contains(x.Fk_cargo));
            }

            if (!string.IsNullOrEmpty(filtros.Nome))
            {
                consulta = consulta.Where(x => x.Nome.Trim().ToUpper() == filtros.Nome.Trim().ToUpper());
            }

            if (!string.IsNullOrEmpty(filtros.Email))
            {
                consulta = consulta.Where(x => x.Email.Trim().ToUpper() == filtros.Email.Trim().ToUpper());
            }

            var listagem = await consulta
                           .Select(x => new FuncionariosListarTodosComandoSaida()
                           {
                               Id = x.Id,
                               Nome = x.Nome,
                               DataAdmissao = x.DataAdmissao,
                               Email = x.Email,
                               Inativo = x.Inativo,
                               Cargo = new()
                               {
                                   Id = x.CargoEntidade.Id,
                                   Descricao = x.CargoEntidade.Descricao.Trim()
                               }
                           })
                           .OrderBy(x => x.Nome)
                           .ToListAsync();

            return listagem;
        }

        public async Task<FuncionariosLocalizarPorIdComandoSaida> LocalizarPorId (int Id)
        {
            if(Id <= 0)
            {
                throw new Exception("Id do Funcionário não foi informado para consulta.");
            }

            var registro = await _conexaoSql.Funcionarios
                         .Where(x => x.Id == Id)
                         .Select(x => new FuncionariosLocalizarPorIdComandoSaida()
                         {
                             Id = x.Id,
                             Nome = x.Nome,
                             DataAdmissao = x.DataAdmissao,
                             Telefone = x.Telefone,
                             Email = x.Email,
                             Inativo = x.Inativo,
                             DataInclusao = x.DataInclusao,
                             DataAlteracao = x.DataAlteracao,
                             Cargo = new()
                             {
                                 Id = x.CargoEntidade.Id,
                                 Descricao = x.CargoEntidade.Descricao.Trim()
                             }
                             
                         })
                         .FirstOrDefaultAsync();

            if (registro is null)
            {
                throw new Exception("Nenhum registros foi encontrado.");
            }

            return registro;
        }
        public async Task<FuncionariosEntidade> LocalizarPorEmail(string email)
        {
            var funcionario = await _conexaoSql.Funcionarios
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email.Trim().ToUpper() == email.Trim().ToUpper());
            
            if (funcionario is null)
            {
                throw new Exception($"Nenhum funcionário com email {email} encontrado.");
            }

            return funcionario;

        }

        public async Task<FuncionariosEntidade> LocalizarEntidadePorId(int id)
        {
            var funcionario  = await _conexaoSql.Funcionarios.FirstOrDefaultAsync(x => x.Id == id);

            if (funcionario is null)
            {
                throw new Exception($"Nenhum funcionário com id {id} encontrado.");
            }

            return funcionario;
        }
    }
}
