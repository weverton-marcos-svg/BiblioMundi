using BiblioMundiApi.Entidade.Padrao;
using System;

namespace BiblioMundiApi.Entidade
{
    public class AutoresEntidade : PadraoEntidade
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Nacionalidade { get; set; }
    }
}
