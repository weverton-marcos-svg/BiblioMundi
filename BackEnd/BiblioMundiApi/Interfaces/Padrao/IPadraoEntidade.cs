using System;

namespace BiblioMundiApi.Interfaces.Padrao
{
    public interface IPadraoEntidade
    {
        public int Id { get; set; }
        public bool Inativo { get; set; }
        public int UsuarioCriador { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
    }
}
