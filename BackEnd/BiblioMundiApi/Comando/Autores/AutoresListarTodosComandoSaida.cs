using System;

namespace BiblioMundiApi.Comando.Autores
{
    public class AutoresListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Nacionalidade { get; set; }
        public bool Inativo { get; set; }
        public DateTime DataInclusao { get; set; }
    }
}
