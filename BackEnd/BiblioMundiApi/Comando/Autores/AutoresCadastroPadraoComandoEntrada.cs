using System;

namespace BiblioMundiApi.Comando.Autores
{
    public class AutoresCadastroPadraoComandoEntrada
    {
        public string Nome { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public string Nacionalidade { get; set; } = string.Empty;
    }
}
