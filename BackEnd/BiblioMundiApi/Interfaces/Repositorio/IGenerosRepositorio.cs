using BiblioMundiApi.Comando.Generos;
using BiblioMundiApi.Entidade;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface IGenerosRepositorio : IPadraoRepositorio<GenerosEntidade>
    {
        Task<List<GenerosPadraoComandoSaida>> ListarTodos(GenerosListarTodosComandoEntrada comando);
        Task<GenerosPadraoComandoSaida> LocalizarPorId(int Id);
        Task<GenerosEntidade> LocalizarPorDescricao(string descricao);
    }
}
