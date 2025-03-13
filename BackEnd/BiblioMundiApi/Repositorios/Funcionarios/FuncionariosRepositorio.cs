﻿using BiblioMundiApi.Comando.Funcionarios;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Padrao;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Funcionarios
{
    public class FuncionariosRepositorio : PadraoRepositorio<FuncionariosEntidade>, IFuncionariosRepositorio
    {
        public FuncionariosRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {
        }

        public async Task<List<FuncionariosListarTodosComandoSaida>> ListarTodos(FuncionariosListarTodosComandoEntrada filtros)
        {
            var consulta = _conexaoSql.Funcionarios
                            .Include(x => x.CargoEntidade)
                            .AsNoTracking();

            if (filtros.DataAdmissaoInicial.HasValue)
            {
                consulta = consulta.Where(x => x.DataAdmissao >= filtros.DataAdmissaoInicial.Value);
            }

            if (filtros.DataAdmissaoFinal.HasValue)
            {
                consulta = consulta.Where(x => x.DataAdmissao <= filtros.DataAdmissaoFinal.Value.AddDays(1));
            }

            if (filtros.IdCargos.Count > 0)
            {
                consulta = consulta.Where(x => filtros.IdCargos.Contains(x.Fk_cargo));
            }

            if (!string.IsNullOrEmpty(filtros.Nome))
            {
                consulta = consulta.Where(x => x.Nome.Trim().ToUpper() == filtros.Nome);
            }

            if (!string.IsNullOrEmpty(filtros.Email))
            {
                consulta = consulta.Where(x => x.Email.Trim().ToUpper() == filtros.Email);
            }

            var listagem = await consulta
                           .Select(x => new FuncionariosListarTodosComandoSaida()
                           {
                               Id = x.Id,
                               Nome = x.Nome,
                               DataAdmissao = x.DataAdmissao,
                               Email = x.Email,
                               Inativo = x.Inativo
                           })
                           .OrderBy(x => x.Nome)
                           .ToListAsync();

            return listagem;
        }

        public async Task<FuncionariosLocalizarPorIdComandoSaida> LocalizarPorId (int Id)
        {
            if(Id <= 0)
            {
                throw new Exception("Id do Funcionário não foi informado para consulta.");
            }

            var registro = await _conexaoSql.Funcionarios
                         .Where(x => x.Id == Id)
                         .Select(x => new FuncionariosLocalizarPorIdComandoSaida()
                         {
                             Id = x.Id,
                             Nome = x.Nome,
                             DataAdmissao = x.DataAdmissao,
                             Telefone = x.Telefone,
                             Email = x.Email,
                             Inativo = x.Inativo,
                             DataInclusao = x.DataInclusao,
                             DataAlteracao = x.DataAlteracao
                             
                         })
                         .FirstOrDefaultAsync();

            if (registro is null)
            {
                throw new Exception("Nenhum registros foi encontrado.");
            }

            return registro;
        }
        public async Task<FuncionariosEntidade> LocalizarPorEmail(string email)
        {
            return await _conexaoSql.Funcionarios
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email.Trim().ToUpper() == email.Trim().ToUpper());
        }
    }
}
