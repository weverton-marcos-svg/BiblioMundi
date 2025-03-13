﻿using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Comando.Padrao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Manipulador;
using BiblioMundiApi.Repositorios.Cargos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : Controller
    {
        private readonly IFuncionariosRepositorio _funcionariosRepositorio;
        private readonly ICargosRepositorio _cargosRepositorio;
        private readonly FuncionarioManipulador _funcionarioManipulador;

        public FuncionarioController(IFuncionariosRepositorio  funcionariosRepositorio, ICargosRepositorio cargosRepositorio)
        {
            _funcionariosRepositorio = funcionariosRepositorio;
            _cargosRepositorio = cargosRepositorio;
            _funcionarioManipulador = new FuncionarioManipulador(_funcionariosRepositorio,_cargosRepositorio);
        }

        [HttpGet]
        public async Task<ActionResult<List<FuncionariosListarTodosComandoSaida>>> ListarTodos([FromQuery] FuncionariosListarTodosComandoEntrada filtros)
        {
            return await _funcionariosRepositorio.ListarTodos(filtros);
        }

        [HttpGet("Id")]
        public async Task<ActionResult<FuncionariosLocalizarPorIdComandoSaida>> LocalizarPorID (int Id)
        {
            return await _funcionariosRepositorio.LocalizarPorId(Id);
        }

        [HttpPost]
        public async Task<ActionResult<PadraoCadastroComandoSaida>> Incluir(FuncionariosCadastroComandoEntrada parametros)
        {
            return await _funcionarioManipulador.Incluir(parametros);
        }

        [HttpPut("Id")]
        public async Task<ActionResult> Alterar(int id, FuncionariosCadastroComandoEntrada parametros)
        {
            await _funcionarioManipulador.Alterar(id, parametros);
            return Ok();

        }
    }
}
