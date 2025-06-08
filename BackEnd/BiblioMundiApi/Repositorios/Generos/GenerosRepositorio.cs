using BiblioMundiApi.Comando.Generos;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using BiblioMundiApi.TratamentoDeErro;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Generos
{
    public class GenerosRepositorio : PadraoRepositorio<GenerosEntidade>, IGenerosRepositorio
    {
        public GenerosRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        { }

        public async Task<List<GenerosPadraoComandoSaida>> ListarTodos(GenerosListarTodosComandoEntrada comando)
        {
            var consultaBd = _conexaoSql.Generos.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(comando.Descricao))
            {
                consultaBd = consultaBd.Where(x => x.Descricao == comando.Descricao);
            }

            return await consultaBd
                .Select( x =>  new GenerosPadraoComandoSaida()
                {
                    Id = x.Id,
                    Descricao = x.Descricao,
                    DataInclusao = x.DataInclusao,
                    Inativo = x.Inativo
                }).ToListAsync();
        }

        public async Task<GenerosPadraoComandoSaida> LocalizarPorId(int Id)
        {
            if (Id <= 0)
            {
                throw new Exception("Id do Genero não foi informado");
            }

            var consultaBd = await _conexaoSql.Generos
                .AsNoTracking()
                .Where(x => x.Id == Id)
                .Select(x => new GenerosPadraoComandoSaida()
                {
                    Id = x.Id,
                    Descricao = x.Descricao,
                    DataInclusao = x.DataInclusao,
                    Inativo = x.Inativo
                })
                .FirstOrDefaultAsync();

            return consultaBd;
        }

        public async Task<GenerosEntidade> LocalizarPorDescricao(string descricao) 
        {
            if (string.IsNullOrWhiteSpace(descricao))
            {
                throw new Exception("Descrição do genero não foi informado.");
            }

            return await _conexaoSql.Generos.Where(x => x.Descricao  == descricao).FirstOrDefaultAsync();
        }

        public async Task<GenerosEntidade> LocalizarEntidadePorId(int Id) 
        {
            if (Id <= 0 )
            {
                throw new ErroExcecao("Id naõ informado.");
            }

            return await _conexaoSql.Generos.Where(x => x.Id == Id).FirstOrDefaultAsync();
        }
    }
}
