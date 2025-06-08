using BiblioMundiApi.Comando.Padrao;

namespace BiblioMundiApi.Comando.Livros
{
    public class LivrosLocalizarPorIdComandoSaida
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Isbn { get; set; }
        public string Idioma { get; set; }
        public string Edicao { get; set; }
        public int AnoPublicacao { get; set; }
        public int NumeroDePaginas { get; set; }
        public int QuantidadeDeCopias { get; set; }
        public PadraoComandoSaida Autor { get; set; }
        public PadraoComandoSaida Genero { get; set; }
        public PadraoComandoSaida Formato { get; set; }
    }
}
