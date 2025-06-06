using BiblioMundiApi.Entidade.Padrao;
using BiblioMundiApi.Repositorios.Livros.Enum;
using System.Collections.Generic;

namespace BiblioMundiApi.Entidade
{
    public class LivrosEntidade : PadraoEntidade
    {
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Isbn { get; set; }
        public int AnoPublicado { get; set; }
        public int NumeroDePaginas { get; set; }
        public string Idioma { get; set; }
        public string Edicao { get; set; }
        public TipoFormatoEnum TipoFormato { get; set; }
        public int QuantidadeDeCopias { get; set; }
        public int Autor { get; set; }
        public int Genero { get; set; }
        public List<AutoresEntidade> autoes { get; set; }
        public List<GenerosEntidade> generos { get; set; }

    }
}
