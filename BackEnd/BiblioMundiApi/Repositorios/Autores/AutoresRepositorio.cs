using BiblioMundiApi.Comando.Autores;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using BiblioMundiApi.TratamentoDeErro;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Autores
{
    public class AutoresRepositorio : PadraoRepositorio<AutoresEntidade>, IAutoresRepositorio
    {
        public AutoresRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {}

        public async Task<List<AutoresListarTodosComandoSaida>> ListarTodos(AutoresListarTodosComandoEntrada comando)
        {
            var consultaBd = _conexaoSql.Autores.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(comando.Nome))
            {
                consultaBd = consultaBd.Where(x => x.Nome == comando.Nome);
            }

            if (comando.DataNascimentoInicial.HasValue)
            {
                consultaBd = consultaBd.Where(x => x.DataNascimento >= comando.DataNascimentoInicial);
            }

            if (comando.DataNascimentoFinal.HasValue)
            {
                consultaBd = consultaBd.Where(x => x.DataNascimento <= comando.DataNascimentoFinal);
            }

            if (!string.IsNullOrWhiteSpace(comando.Nacionalidade))
            {
                consultaBd = consultaBd.Where(x => x.Nacionalidade == comando.Nacionalidade);
            }

            var listagem = await consultaBd
                          .Select(x => new AutoresListarTodosComandoSaida
                          {
                              Id = x.Id,
                              DataInclusao = x.DataInclusao,
                              Nacionalidade = x.Nacionalidade,
                              Nome = x.Nome,
                              Inativo = x.Inativo
                          })
                          .ToListAsync();
            
            return listagem;
        }

        public async Task<AutoresLocalizarPorIdComandoSaida> LocalizarPorId(int Id)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id não foi informado");
            }

            return await _conexaoSql.Autores
                   .Where(x => x.Id == Id)
                   .Select(x => new AutoresLocalizarPorIdComandoSaida()
                   {
                       Id = x.Id,
                       Nome = x.Nome,
                       Nacionalidade = x.Nacionalidade,
                       Inativo = x.Inativo,
                       DataNascimento = x.DataNascimento,
                       DataInclusao = x.DataInclusao
                   })
                   .FirstOrDefaultAsync();
        }
        
        public async Task<AutoresEntidade> LocalizarPorNome(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ErroExcecao("Nome não informado");
            }

            return await _conexaoSql.Autores.Where(x => x.Nome == nome).FirstOrDefaultAsync();
        }

        public async Task<AutoresEntidade> LocalizarEntidadePorId(int Id)
        {
            if (Id <= 0)
            {
                throw new ErroExcecao("Id não informado");
            }

            return await _conexaoSql.Autores.Where(x => x.Id == Id).FirstOrDefaultAsync();
        }
    }
}
