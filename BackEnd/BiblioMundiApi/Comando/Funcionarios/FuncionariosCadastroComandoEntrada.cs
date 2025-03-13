using System;

namespace BiblioMundiApi.Comando.Funcionarios
{
    public class FuncionariosCadastroComandoEntrada
    {
        public string Nome { get; set; }
        public string? Telefone { get; set; }
        public string Email { get; set; }
        public DateTime DataAdmissao { get; set; }
        public int IdCargo { get; set; }

    }
}
