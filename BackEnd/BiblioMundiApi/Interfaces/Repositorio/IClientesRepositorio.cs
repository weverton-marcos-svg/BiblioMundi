using BiblioMundiApi.Comando.Clientes;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Repositorios.Padrao;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface IClientesRepositorio : IPadraoRepositorio<ClientesEntidade>
    {
        Task<List<ClientesListarTodosComandoSaida>> ListarTodos(ClientesListarTodosComandoEntrada filtros);
        Task<ClientesLocalizarPorIdComandoSaida> LocalizarPorId(int Id);
        Task<ClientesEntidade> LocalizarEntidadePorId(int id);
        Task<ClientesEntidade> LocalizarEntidadePorCPF(string cpf);
    }
}
