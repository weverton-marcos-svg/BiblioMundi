using System;

namespace BiblioMundiApi.Comando.Cargos
{
    public class CargosListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public bool Inativo { get; set; }
    }
}
