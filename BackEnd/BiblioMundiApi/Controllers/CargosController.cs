using BiblioMundiApi.Comando.Cargos;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CargosController : Controller
    {
        private readonly ICargosRepositorio _cargosrepositorio;

        public CargosController(ICargosRepositorio repositorio)
        {
            _cargosrepositorio = repositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<CargosListarTodosComandoSaida>>> ListarTodos([FromQuery] PadraoComandoEntrada filtros) =>
            Ok(await _cargosrepositorio.ListarTodos(filtros));

        [HttpGet("id")]
        public async Task<ActionResult<PadraoConsultaComandoSaida>> LocalizarPorId(int id) =>
            Ok(await _cargosrepositorio.LocalizarPorId(id));
    }
}
