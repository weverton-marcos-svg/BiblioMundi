using BiblioMundiApi.Comando.Padrao;
using System;

namespace BiblioMundiApi.Comando.Funcionarios
{
    public class FuncionariosListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DataAdmissao { get; set; }
        public PadraoComandoSaida Cargo { get; set; } = new();
        public bool Inativo { get; set; }
    }
}
