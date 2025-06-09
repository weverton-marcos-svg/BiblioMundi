using BiblioMundiApi.Comando.Livros;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Controllers.Acervo
{
    [Route("api/Acervo/[controller]")]
    [ApiController]
    public class LivrosController : Controller
    {
        private readonly ILivrosRepositorio _livrosRepositorio;
        private readonly IAutoresRepositorio _autoresRepositorio;
        private readonly IGenerosRepositorio _generoRepositorio;
        private readonly LivrosManipulador _livroManipulador;
        public LivrosController(ILivrosRepositorio livrosRepositorio, 
            IAutoresRepositorio autoresRepositorio,
            IGenerosRepositorio generosRepositorio)
        {
            _livrosRepositorio = livrosRepositorio;
            _autoresRepositorio = autoresRepositorio;
            _generoRepositorio = generosRepositorio;
            _livroManipulador = new LivrosManipulador(_livrosRepositorio, _autoresRepositorio, _generoRepositorio);
        }

        [HttpGet]
        public async Task<ActionResult<List<LivrosListarTodosComandoSaida>>> ListarTodos([FromQuery] LivrosListarTodosComandoEntrada comando)
        {
            return await _livrosRepositorio.ListarTodos(comando);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<LivrosLocalizarPorIdComandoSaida>> LocalizarPorId(int Id)
        {
            return await _livrosRepositorio.LocalizarPorId(Id);
        }

        [HttpPost]
        public async Task<ActionResult<PadraoCadastroComandoSaida>> Incluir(LivroCadastroPadraoComandoEntrada parametro)
        {
            return await _livroManipulador.Incluir(parametro);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Alterar(int Id, LivroCadastroPadraoComandoEntrada parametro)
        {
            await _livroManipulador.Alterar(Id, parametro);
            return Ok();
        }

        [HttpPut("{Id}/StatusLogico")]
        public async Task<StatusLogicaPadraoComandoSaida> StatusLogico(int Id)
        {
            return await _livroManipulador.AlterarStatusLogico(Id);
        }
    }
}
