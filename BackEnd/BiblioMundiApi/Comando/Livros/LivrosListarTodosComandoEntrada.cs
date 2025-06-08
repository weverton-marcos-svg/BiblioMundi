using BiblioMundiApi.Repositorios.Livros.Enum;
using System;
using System.Collections.Generic;

namespace BiblioMundiApi.Comando.Livros
{
    public class LivrosListarTodosComandoEntrada
    {
        public List<int> IdsAutores { get; set; } = new();
        public List<int> IdsGeneros { get; set; } = new();
        public int AnoPublicado { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Isbn { get; set; }
        public string Idioma { get; set; }
        public string Edicao { get; set; }
        public DateTime DataCadastroInicial { get; set; }
        public DateTime DataCadastroFinal { get; set; }
        public TipoFormatoEnum TipoFormato { get; set; }
    }
}
