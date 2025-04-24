using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Entidade;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface IFuncionariosRepositorio : IPadraoRepositorio<FuncionariosEntidade>
    {
        Task<List<FuncionariosListarTodosComandoSaida>> ListarTodos(FuncionariosListarTodosComandoEntrada filtros);
        Task<FuncionariosLocalizarPorIdComandoSaida> LocalizarPorId(int Id);
        Task<FuncionariosEntidade> LocalizarEntidadePorEmail(string email);
        Task<FuncionariosEntidade> LocalizarEntidadePorId(int id);
    }
}
