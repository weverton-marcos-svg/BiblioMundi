using BiblioMundiApi.Comando.Clientes;
using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : Controller
    {
        private readonly IClientesRepositorio _clientesRepositorio;
        private readonly ClientesManipulador _clientesManipulador;

        public ClientesController(IClientesRepositorio clientesRepositorio)
        {
            _clientesRepositorio = clientesRepositorio;
            _clientesManipulador = new ClientesManipulador(_clientesRepositorio);
        }

        [HttpGet]
        public async Task<ActionResult<List<ClientesListarTodosComandoSaida>>> ListarTodos([FromQuery] ClientesListarTodosComandoEntrada filtros)
        {
            return await _clientesRepositorio.ListarTodos(filtros);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<ClientesLocalizarPorIdComandoSaida>> LocalizarPorId (int Id)
        {
            return await _clientesRepositorio.LocalizarPorId(Id);
        }

        [HttpPost]
        public async Task<ActionResult<PadraoCadastroComandoSaida>> Incluir(ClientesCadastroComandoEntrada parametros)
        {
            return await _clientesManipulador.Incluir(parametros);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Alterar(int Id, ClientesCadastroComandoEntrada parametros)
        {
            await _clientesManipulador.Alterar(Id, parametros);
            return Ok();

        }

        [HttpPut("{Id}/StatusLogico")]
        public async Task<StatusLogicaPadraoComandoSaida> Statuslogico(int Id)
        {
            return await _clientesManipulador.AlterarStatusLogico(Id);
        }
    }
}
