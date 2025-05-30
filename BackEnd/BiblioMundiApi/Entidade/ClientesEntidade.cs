using BiblioMundiApi.Entidade.Padrao;
using System;

namespace BiblioMundiApi.Entidade
{
    public class ClientesEntidade : PadraoEntidade
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public string Uf { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Observacao { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool BloquearEmprestimo { get; set; }
    }
}
