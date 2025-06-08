using System;

namespace BiblioMundiApi.Comando.Autores
{
    public class AutoresLocalizarPorIdComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Nacionalidade { get; set; }
        public DateTime DataNascimento { get; set; }
        public DateTime DataInclusao { get; set; }
        public bool Inativo { get; set; }
    }
}
