using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class FuncionariosMapeamento : PadraoMapeamento<FuncionariosEntidade>
    {
        public FuncionariosMapeamento() : base("Funcionarios")
        {
        }
        public override void ConfigureCampos(EntityTypeBuilder<FuncionariosEntidade> builder)
        {
            builder.Property(x => x.Nome)
                .IsRequired()
                .HasColumnName("Nome")
                .HasColumnType("Varchar")
                .HasMaxLength(250);

            builder.Property(x => x.Telefone)
                 .HasColumnName("Telefone")
                 .HasColumnType("Varchar")
                 .HasMaxLength(120);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnName("Email")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.DataAdmissao)
                .HasColumnName("DataAdmissao")
                .HasColumnType("Datetime");

            builder.Property(x => x.Fk_cargo)
                .IsRequired()
                .HasColumnName("Fk_cargo")
                .HasColumnType("int");

            builder.HasOne(x => x.CargoEntidade)
                .WithMany(tabelaPrincipal => tabelaPrincipal.Funcionarios)
                .HasForeignKey(tabelaRelacionamento => tabelaRelacionamento.Fk_cargo);
        }
    }
}
