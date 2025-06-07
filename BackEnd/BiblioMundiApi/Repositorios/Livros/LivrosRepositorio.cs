using BiblioMundiApi.Comando.Livros;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Entidade;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Livros.Enum;
using BiblioMundiApi.Repositorios.Padrao;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiblioMundiApi.Repositorios.Livros
{
    public class LivrosRepositorio : PadraoRepositorio<LivrosEntidade>, ILivrosRepositorio
    {
        public LivrosRepositorio(ConexaoBd conexaoBd) : base(conexaoBd)
        {}

        public async Task<List<LivrosListarTodosComandoSaida>> ListarTodos(LivrosListarTodosComandoEntrada comando)
        {
            var consultaBd = _conexaoSql.Livros
                            .Include(x => x.GenerosEntidade)
                            .Include(x => x.AutoresEntidade)
                            .Where(x => x.DataInclusao >= comando.DataCadastroInicial.Date
                                     && x.DataInclusao <= comando.DataCadastroFinal.Date.AddDays(1));

            if (!string.IsNullOrWhiteSpace(comando.Titulo))
            {
                consultaBd = consultaBd.Where(x => x.Titulo == comando.Titulo);
            }

            if (!string.IsNullOrWhiteSpace(comando.SubTitulo))
            {
                consultaBd = consultaBd.Where(x => x.SubTitulo == comando.SubTitulo);
            }

            if (!string.IsNullOrWhiteSpace(comando.Isbn))
            {
                consultaBd = consultaBd.Where(x => x.Isbn == comando.Isbn);
            }

            if (comando.IdsAutores.Count > 0)
            {
                consultaBd = consultaBd.Where(x => comando.IdsAutores.Contains(x.Autor));
            }

            if (comando.IdsGeneros.Count > 0)
            {
                consultaBd = consultaBd.Where(x => comando.IdsGeneros.Contains(x.Genero));
            }

            if (comando.AnoPublicado > 0)
            {
                consultaBd = consultaBd.Where(x => x.AnoPublicado == comando.AnoPublicado);
            }

            if (!string.IsNullOrWhiteSpace(comando.Idioma))
            {
                consultaBd = consultaBd.Where(x => x.Idioma == comando.Idioma);
            }

            if (!string.IsNullOrWhiteSpace(comando.Edicao))
            {
                consultaBd = consultaBd.Where(x => x.Edicao == comando.Edicao);
            }

            if (comando.TipoFormato != TipoFormatoEnum.Nenhum)
            {
                consultaBd = consultaBd.Where(x => x.TipoFormato == comando.TipoFormato);
            }

            var listagem = await consultaBd
                    .Select(x => new LivrosListarTodosComandoSaida()
                    {
                        Id = x.Id,
                        Titulo = x.Titulo,
                        SubTitulo = x.SubTitulo,
                        Isbn = x.Isbn,
                        AnoPublicado = x.AnoPublicado,
                        QuantidadeDeCopias = x.QuantidadeDeCopias,
                        Autor = new()
                        {
                            Id = x.AutoresEntidade.Id,
                            Descricao = x.AutoresEntidade.Nome
                        },
                        Genero= new()
                        {
                            Id = x.GenerosEntidade.Id,
                            Descricao = x.GenerosEntidade.Descricao
                        }
                    })
                    .AsNoTracking()
                    .ToListAsync();

            return listagem;
        }

        public async Task<LivrosLocalizarPorIdComandoSaida> LocalizarPorId(int Id)
        {
            var consultaBd = await _conexaoSql.Livros.Include(x => x.AutoresEntidade)
                            .Include(x => x.GenerosEntidade)
                            .Where(x => x.Id == Id)
                            .Select(x => new LivrosLocalizarPorIdComandoSaida()
                            {
                                Id =x.Id,
                                Titulo = x.Titulo,
                                SubTitulo = x.SubTitulo,
                                Isbn = x.Isbn,
                                Idioma = x.Idioma,
                                Edicao = x.Edicao,
                                AnoPublicacao = x.AnoPublicado,
                                NumeroDePaginas = x.NumeroDePaginas,
                                QuantidadeDeCopias = x.QuantidadeDeCopias,
                                Autor = new()
                                {
                                    Id = x.AutoresEntidade.Id,
                                    Descricao = x.AutoresEntidade.Nome.Trim()   
                                },
                                Genero = new()
                                {
                                    Id = x.GenerosEntidade.Id,
                                    Descricao = x.GenerosEntidade.Descricao.Trim()
                                },
                                Formato = new()
                                {
                                    Id = (int)x.TipoFormato,
                                    Descricao = x.TipoFormato.ToString(),
                                }
                            })
                            .AsNoTracking()
                            .FirstOrDefaultAsync();

            return consultaBd;
        }

        public async Task<LivrosEntidade> LocalizarEntidadeIsbn(string Isbn)
        {
            return await _conexaoSql.Livros
                                  .Where(x => x.Isbn == Isbn)
                                  .AsNoTracking()
                                  .FirstOrDefaultAsync();       
        }
    }
}
