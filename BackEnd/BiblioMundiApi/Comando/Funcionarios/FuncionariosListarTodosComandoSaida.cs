using System;

namespace BiblioMundiApi.Comando.Funcionarios
{
    public class FuncionariosListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DataAdmissao { get; set; }
        public bool Inativo { get; set; }
    }
}
