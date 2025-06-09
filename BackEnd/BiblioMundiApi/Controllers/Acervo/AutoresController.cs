using BiblioMundiApi.Comando.Autores;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Controllers.Acervo
{
    [ApiController]
    [Route("api/Acervo/[controller]")]
    public class AutoresController : Controller
    {
        private readonly IAutoresRepositorio _autoresRepositorio;
        private readonly AutoresManipulador _autoresManipulador;
        public AutoresController(IAutoresRepositorio autoresRepositorio)
        {
            _autoresRepositorio = autoresRepositorio;
            _autoresManipulador = new AutoresManipulador(_autoresRepositorio);
        }

        [HttpGet]
        public async Task<List<AutoresListarTodosComandoSaida>> ListarTodos([FromQuery]AutoresListarTodosComandoEntrada comandos)
        {
            return await _autoresRepositorio.ListarTodos(comandos);
        }

        [HttpGet("{Id}")]
        public async Task<AutoresLocalizarPorIdComandoSaida> LocalizarPorID(int Id)
        {
            return await _autoresRepositorio.LocalizarPorId(Id);
        }

        [HttpPost]
        public async Task<ActionResult<PadraoCadastroComandoSaida>> Incluir(AutoresCadastroPadraoComandoEntrada parametros)
        {
            return await _autoresManipulador.Incluir(parametros);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Alterar(int Id, AutoresCadastroPadraoComandoEntrada parametros)
        {
            await _autoresManipulador.Alterar(Id, parametros);
            return Ok();
        }

        [HttpPut("{Id}/StatusLogico")]
        public async Task<StatusLogicaPadraoComandoSaida> StatusLogico(int Id)
        {
            return await _autoresManipulador.AlterarStatusLogico(Id);
        }
    }
}
