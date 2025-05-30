using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class ClientesMapeamento : PadraoMapeamento<ClientesEntidade>
    {
        public ClientesMapeamento() : base("Clientes")
        {
        }
        public override void ConfigureCampos(EntityTypeBuilder<ClientesEntidade> builder)
        {
            builder.Property(x => x.Nome)
                 .IsRequired()
                 .HasColumnName("Nome")
                 .HasColumnType("Varchar")
                 .HasMaxLength(250);

            builder.Property(x => x.CPF)
                .IsRequired()
                .HasColumnName("CPF")
                .HasColumnType("Varchar")
                .HasMaxLength(16);

            builder.Property(x => x.Telefone)
                .HasColumnName("Telefone")
                .HasColumnType("Varchar")
                .HasMaxLength(120);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnName("Email")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.Uf)
                .IsRequired()
                .HasColumnName("Uf")
                .HasColumnType("Char")
                .HasMaxLength(2);

            builder.Property(x => x.Endereco)
                .IsRequired()
                .HasColumnName("Endereco")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.Bairro)
                .IsRequired()
                .HasColumnName("Bairro")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.Cidade)
                .IsRequired()
                .HasColumnName("Cidade")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.DataNascimento)
                .IsRequired()
                .HasColumnName("DataNascimento")
                .HasColumnType("Date");

            builder.Property(x => x.BloquearEmprestimo)
                .IsRequired()
                .HasColumnName("BloquearEmprestimo")
                .HasColumnType("Bit");

            builder.Property(x => x.Observacao)
                .HasColumnName("Observacao")
                .HasColumnType("Varchar(Max)");
        }
    }
}
