using BiblioMundiApi.Comando.Cargos;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Cargos
{
    public class CargosRepositorio : PadraoRepositorio<CargoEntidade>, ICargosRepositorio
    {
        public CargosRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {
        }

        public async Task<List<CargosListarTodosComandoSaida>> ListarTodos(PadraoComandoEntrada filtros)
        {
            var listagem = _conexaoSql.Cargo.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(filtros.Descricao))
            {
                listagem = listagem.Where(x => x.Descricao.Contains(filtros.Descricao));
            }

            if (!filtros.ExibirInativo)
            {
                listagem = listagem.Where(x => x.Inativo == false);
            }

            return await listagem
                .Select(x => new CargosListarTodosComandoSaida()
                {
                    Id = x.Id,
                    Descricao = x.Descricao,
                    DataAlteracao = x.DataAlteracao,
                    DataInclusao = x.DataInclusao,
                    Inativo = x.Inativo,
                })
                .OrderBy(x => x.Descricao)
                .ToListAsync();
        }

        public async Task<PadraoConsultaComandoSaida> LocalizarPorId(int id)
        {
            if (id <= 0)
            {
                throw new Exception("Não foi informado o Id do cargo para busca.");
            }

            var registro = await _conexaoSql.Cargo
                            .AsNoTracking()
                            .Where(x => x.Id == id)
                            .Select(x => new PadraoConsultaComandoSaida()
                            {
                                Id = x.Id,
                                Descricao = x.Descricao,
                                Inativo = x.Inativo,
                            })
                            .FirstOrDefaultAsync();

            if (registro is null)
            {
                throw new Exception($"Não foi encontrado nenhum registro com o id: {id}");
            }

            return registro;
        }

    }
}
