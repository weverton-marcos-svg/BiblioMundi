using BiblioMundiApi.Entidade.Padrao;
using System.Collections.Generic;

namespace BiblioMundiApi.Entidade
{
    public class CargoEntidade : PadraoEntidade
    {
        public string Descricao { get; set; }

        public IEnumerable<FuncionariosEntidade> Funcionarios { get; set; }
    }
}
