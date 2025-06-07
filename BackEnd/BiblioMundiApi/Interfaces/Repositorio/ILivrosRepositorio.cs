using BiblioMundiApi.Comando.Livros;
using BiblioMundiApi.Entidade;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface ILivrosRepositorio : IPadraoRepositorio<LivrosEntidade>
    {
        Task<List<LivrosListarTodosComandoSaida>> ListarTodos(LivrosListarTodosComandoEntrada comando);
        Task<LivrosLocalizarPorIdComandoSaida> LocalizarPorId(int Id);
        Task<LivrosEntidade> LocalizarEntidadeIsbn(string Isbn);
    }
}
