using BiblioMundiApi.Comando.Padrao;
using System;

namespace BiblioMundiApi.Comando.Livros
{
    public class LivrosListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Isbn { get; set; }
        public int AnoPublicado { get; set; }
        public int QuantidadeDeCopias { get; set; }
        public bool Inativo { get; set; }
        public PadraoComandoSaida Autor { get; set; }
        public PadraoComandoSaida Genero { get; set; }
    }
}
