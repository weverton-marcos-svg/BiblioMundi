using BiblioMundiApi.Repositorios.Livros.Enum;

namespace BiblioMundiApi.Comando.Livros
{
    public class LivroCadastroPadraoComandoEntrada
    {
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Isbn { get; set; }
        public string Idioma { get; set; }
        public string Edicao { get; set; }
        public int AnoPublicao { get; set; }
        public int NumeroDePaginas { get; set; }
        public TipoFormatoEnum TipoFormato { get; set; }
        public int IdAutor { get; set; }
        public int IdGenero { get; set; }
        public int QuantidadeDeCopias { get; set; }
    }
}
