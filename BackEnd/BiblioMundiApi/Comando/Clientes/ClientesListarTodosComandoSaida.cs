using System;

namespace BiblioMundiApi.Comando.Clientes
{
    public class ClientesListarTodosComandoSaida
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public bool Inativo { get; set; }
        public bool BloquearEmprestimo { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime DataNascimento { get; set; }

    }
}
