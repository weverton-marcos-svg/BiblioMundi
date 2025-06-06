using BiblioMundiApi.Comando.Autores;
using BiblioMundiApi.Entidade;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface IAutoresRepositorio : IPadraoRepositorio<AutoresEntidade>
    {
        Task<List<AutoresListarTodosComandoSaida>> ListarTodos(AutoresListarTodosComandoEntrada comando);
        Task<AutoresLocalizarPorIdComandoSaida> LocalizarPorId(int Id);
        Task<AutoresEntidade> LocalizarPorNome(string nome);
    }
}
