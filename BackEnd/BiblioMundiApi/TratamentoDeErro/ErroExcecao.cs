using System;

namespace BiblioMundiApi.TratamentoDeErro
{
    public class ErroExcecao : Exception
    {
        public ErroExcecao(string menssagem) : base(menssagem)
        {
            
        }
    }
}
