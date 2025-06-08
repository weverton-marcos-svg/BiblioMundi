using BiblioMundiApi.Comando.Generos;
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
    public class GenerosController : Controller
    {
        private readonly IGenerosRepositorio _generosRepositorio;
        private readonly GenerosManipulador _generosManipulador;
        public GenerosController(IGenerosRepositorio generosRepositorio)
        {
            _generosRepositorio = generosRepositorio;
            _generosManipulador = new GenerosManipulador(_generosRepositorio);
        }

        [HttpPost]
        public async Task<ActionResult<PadraoCadastroComandoSaida>> Incluir (PadraoCadastroComandoEntrada parametrosInclusao)
        {
            return await _generosManipulador.Incluir(parametrosInclusao);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Alterar(int Id, PadraoCadastroComandoEntrada parametrosAlteracao)
        {
            await _generosManipulador.Alterar(Id, parametrosAlteracao);
            return Ok();
        }

        [HttpPut("{Id}/StatusLogico")]
        public async Task<StatusLogicaPadraoComandoSaida> Statuslogico(int Id)
        {
            return await _generosManipulador.AlterarStatusLogico(Id); 
        }

        [HttpGet]
        public async Task<ActionResult<List<GenerosPadraoComandoSaida>>> ListarTodos([FromQuery] GenerosListarTodosComandoEntrada comando)
        {
            return await _generosRepositorio.ListarTodos(comando);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<GenerosPadraoComandoSaida>> LocalizarPorId(int Id)
        {
            return await _generosRepositorio.LocalizarPorId(Id);
        }
    }
}
