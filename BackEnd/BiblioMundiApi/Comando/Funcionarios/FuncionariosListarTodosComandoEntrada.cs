using System;
using System.Collections.Generic;

namespace BiblioMundiApi.Comando.Funcionarios
{
    public class FuncionariosListarTodosComandoEntrada
    {
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public DateTime? DataAdmissaoInicial { get; set; }
        public DateTime? DataAdmissaoFinal { get; set; }
        public List<int> IdCargos { get; set; } = new();
    }
}
