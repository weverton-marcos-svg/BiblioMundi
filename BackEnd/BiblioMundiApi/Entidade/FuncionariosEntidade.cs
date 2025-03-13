using BiblioMundiApi.Entidade.Padrao;
using System;
using System.Collections;

namespace BiblioMundiApi.Entidade
{
    public class FuncionariosEntidade : PadraoEntidade
    {
        public string Nome { get; set; } = string.Empty;
        public string? Telefone { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateTime DataAdmissao { get; set; }
        public int Fk_cargo { get; set; }
        public CargoEntidade CargoEntidade { get; set; }

    }
}
