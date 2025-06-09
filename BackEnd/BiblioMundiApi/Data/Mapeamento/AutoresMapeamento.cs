using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class AutoresMapeamento : PadraoMapeamento<AutoresEntidade>
    {
        public AutoresMapeamento() : base("Autores")
        {}

        public override void ConfigureCampos(EntityTypeBuilder<AutoresEntidade> builder)
        {
            builder.Property(x => x.Nome)
                .HasColumnName("Nome")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.Nacionalidade)
                .HasColumnName("Nacionalidade")
                .HasColumnType("Varchar")
                .HasMaxLength(200);

            builder.Property(x => x.DataNascimento)
                .HasColumnName("DataNascimento")
                .HasColumnType("DateTime");
        }
    }
}
