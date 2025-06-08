using System;

namespace BiblioMundiApi.Comando.Generos
{
    public class GenerosPadraoComandoSaida
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInclusao { get; set; }
        public bool Inativo { get; set; }
    }
}
