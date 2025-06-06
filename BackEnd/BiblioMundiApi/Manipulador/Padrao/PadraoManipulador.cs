using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using System;
using System.Threading.Tasks;

namespace BiblioMundiApi.Manipulador.Padrao
{
    public abstract class PadraoManipulador
    {
        protected async Task<T> ValidarRegistroExiste<T>(int id, IPadraoRepositorio<T> repositorio)
        {
            var registro = await repositorio.LocalizarPorIdEntidade(id);

            if (registro is null)
            {
                throw new Exception($"Não existe um registro com o id {id}");
            }

            return registro;
        }
    }
}
