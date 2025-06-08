using BiblioMundiApi.Entidade.Padrao;
using System;
using System.Collections;
using System.Collections.Generic;

namespace BiblioMundiApi.Entidade
{
    public class AutoresEntidade : PadraoEntidade
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Nacionalidade { get; set; }
        public IEnumerable<LivrosEntidade> Livros { get; set; }

    }
}
