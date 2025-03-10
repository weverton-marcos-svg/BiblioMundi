using BiblioMundiApi.Conexao;
using BiblioMundiApi.Data.Entidades;

namespace BiblioMundiApi.Repositorios.Padrao
{
    public abstract class PadraoRepositorio<TEntidade>  where TEntidade : class
    {
        protected readonly ConexaoSql _conexaoSql;

        public PadraoRepositorio(ConexaoBd conexaoBd)
        {
            _conexaoSql = conexaoBd.Conexao;
        }


    }
}
