using BiblioMundiApi.Entidade.Padrao;
using System.Collections.Generic;

namespace BiblioMundiApi.Entidade
{
    public class GenerosEntidade : PadraoEntidade
    {
        public string Descricao { get; set; }
        public IEnumerable<LivrosEntidade> Livros { get; set; }
    }
}
