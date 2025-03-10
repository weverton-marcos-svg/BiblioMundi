using BiblioMundiApi.Data.Mapeamento;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace BiblioMundiApi.Data.Entidades
{
    public class ConexaoSql : DbContext
    {
        public string StringConexaoBd { get; set; }

        public DbSet<CargoEntidade> cargo { get; set; }

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
