using BiblioMundiApi.Comando.Cargos;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Entidade;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface ICargosRepositorio : IPadraoRepositorio<CargoEntidade>
    {
        Task<List<CargosListarTodosComandoSaida>> ListarTodos(PadraoComandoEntrada filtros);
        Task<PadraoConsultaComandoSaida> LocalizarPorId(int id);
    }
}
