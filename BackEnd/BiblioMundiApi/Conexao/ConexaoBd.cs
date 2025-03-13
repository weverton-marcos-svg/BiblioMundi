using BiblioMundiApi.Data.Conexao;
using BiblioMundiApi.Interfaces.Padrao;
using Microsoft.EntityFrameworkCore;

namespace BiblioMundiApi.Conexao
{
    public class ConexaoBd : IConexaoBd
    {
        public ConexaoSql Conexao { get; set; }
        private readonly string _stringConexao;

        public ConexaoBd(string stringConexao)
        {
            _stringConexao = stringConexao;
            Conexao = InicializarDbContext();
            Conexao.TesteConexaoDb();
        }

        private ConexaoSql InicializarDbContext()
        {
            return new ConexaoSql(_stringConexao);
        }
        public DbSet<T> CreateDbSet<T>() where T : class, IPadraoEntidade
        {
            return Conexao.Set<T>();
        }
    }
}
