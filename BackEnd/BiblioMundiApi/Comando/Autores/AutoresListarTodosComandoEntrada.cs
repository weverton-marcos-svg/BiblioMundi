using System;

namespace BiblioMundiApi.Comando.Autores
{
    public class AutoresListarTodosComandoEntrada
    {
        public string Nome { get; set; }
        public string Nacionalidade { get; set; }
        public DateTime? DataNascimentoInicial { get; set; }
        public DateTime? DataNascimentoFinal { get; set; }
    }
}
