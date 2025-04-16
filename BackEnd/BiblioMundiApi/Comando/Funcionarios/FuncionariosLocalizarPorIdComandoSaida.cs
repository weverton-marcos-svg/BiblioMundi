using BiblioMundiApi.Comando.Padrao;
using System;

namespace BiblioMundiApi.Comando.Funcionarios
{
    public class FuncionariosLocalizarPorIdComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Telefone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool Inativo { get; set; }
        public PadraoComandoSaida Cargo { get; set; } = new();
        public DateTime DataAdmissao { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
    }
}
