using BiblioMundiApi.Data.Mapeamento;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using BiblioMundiApi.Entidade.Padrao;

namespace BiblioMundiApi.Data.Conexao
{
    public class ConexaoSql : DbContext
    {
        public string StringConexaoBd { get; set; }
        public DbSet<CargoEntidade> Cargo { get; set; }
        public DbSet<FuncionariosEntidade> Funcionarios { get; set; }
        public DbSet<ClientesEntidade> Clientes { get; set; }
        public DbSet<GenerosEntidade> Generos { get; set; }
        public DbSet<AutoresEntidade> Autores { get; set; }
        //public DbSet<LivrosEntidade> Livros { get; set; }

        public ConexaoSql(string stringConexaoBd)
        {
            if (string.IsNullOrWhiteSpace(stringConexaoBd))
            {
                throw new Exception("String de conexão para o banco de dados não informada.");
            }

            StringConexaoBd = stringConexaoBd;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(StringConexaoBd, build => build.EnableRetryOnFailure());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CargoMapeamento).Assembly);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            // Preenchendo os campos padrões da INCLUSÃO do registro
            PreencherCamposPadroes(EntityState.Added);

            // Preenchendo os campos padrões da ALTERAÇÃO do registro
            PreencherCamposPadroes(EntityState.Modified);

            var result = await base.SaveChangesAsync();

            return result;
        }

        private void PreencherCamposPadroes(EntityState estadoTabela)
        {
            //// Carregando data atual para preencher os campos de DH_INCLUSAO / DH_ALTERACAO
            //DateTime dtAtual = DataHoraServidor();

            // Forçando o Entity a detectar as mudanças
            ChangeTracker.DetectChanges();

            //Carregando todas as entidades no context 
            var entriesTracker = ChangeTracker.Entries()
                       .Where(t => t.State == estadoTabela);

            foreach (var entries in entriesTracker.ToArray())
            {
                var entity = entries.Entity;

                //Correção de valores zerados para nulos
                //entries.Properties
                //    .Where(x => x.Metadata.ClrType.Equals(typeof(int?)))
                //    .ForAll(x => x.CurrentValue = TratarCampoOpcional.RetornarNuloSeCampoVazio((int?)x.CurrentValue));

                //Correção de string nulas para vazias
                //entries.Properties.Where(x => x.Metadata.ClrType.Equals(typeof(string)))
                //   .ForAll(x => x.CurrentValue = x.CurrentValue ?? string.Empty);

                /* Se a classe do model nao tiver implementado a interface padrao 
                 * que contem os campos de data, deve ignorar o preenchimento
                 */
                if (entity is not PadraoEntidade)
                {
                    continue;
                }

                var tabela = entity as PadraoEntidade;

                // Campos que somente devem ser preenchidos na INCLUSAO do registro
                if (estadoTabela == EntityState.Added)
                {
                    tabela.DataInclusao = DateTime.UtcNow;
                    tabela.UsuarioCriador =1;
                }
                // Campos que somente devem ser preenchidos na ALTERACAO do registro
                if (estadoTabela == EntityState.Modified)
                {
                    tabela.DataAlteracao = DateTime.UtcNow;
                }
            }
        }

        public void TesteConexaoDb()
        {
            try
            {
                Database.OpenConnection();
                Database.CloseConnection();
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel acessar o banco de dados. Verifique os dados configurados.", ex);
            }
        }
    }
}
