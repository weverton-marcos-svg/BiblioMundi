using System;

namespace BiblioMundiApi.Comando.Clientes
{
    public class ClientesCadastroComandoEntrada
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public ClientesEnderecoComandoPadraoSaida? Endereco { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool BloquearEmprestimo { get; set; }
        public string? Observacao { get; set; }
    }
}
