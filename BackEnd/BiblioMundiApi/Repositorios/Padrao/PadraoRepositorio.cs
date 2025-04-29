using BiblioMundiApi.Conexao;
using BiblioMundiApi.Data.Conexao;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Padrao
{
    public abstract class PadraoRepositorio<TEntidade>  where TEntidade : class
    {
        protected readonly ConexaoSql _conexaoSql;

        public PadraoRepositorio(ConexaoBd conexaoBd)
        {
            _conexaoSql = conexaoBd.Conexao;
        }
        public virtual async Task Salvar() =>
            await _conexaoSql.SaveChangesAsync();
        public virtual async Task Incluir(TEntidade registro) =>
            await _conexaoSql.Set<TEntidade>().AddAsync(registro);
        public virtual async Task IncluirLista(List<TEntidade> listaDeRegistro) =>
           await _conexaoSql.Set<TEntidade>().AddRangeAsync(listaDeRegistro);
        public virtual Task Excluir(TEntidade entidade)
        {
            _conexaoSql.Remove(entidade);

            return Task.CompletedTask;
        }
        public virtual Task ExcluirLista(List<TEntidade> entidade)
        {
            _conexaoSql.RemoveRange(entidade);

            return Task.CompletedTask;
        }
        public async Task AbrirTransacao(Func<Task> metodo)
        {
            if (_conexaoSql.Database.CurrentTransaction is null)
            {
                using (var transacao = await _conexaoSql.Database.BeginTransactionAsync())
                {
                    await metodo();

                    await transacao.CommitAsync();
                }
            }
            else
            {
                await metodo();
            }
        }
        public virtual async Task<TEntidade> LocalizarPorIdEntidade(int id)
        {
            return await _conexaoSql.Set<TEntidade>().FindAsync(id);
        }
    }
}
