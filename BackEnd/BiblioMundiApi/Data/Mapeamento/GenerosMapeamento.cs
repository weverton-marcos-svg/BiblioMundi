using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class GenerosMapeamento : PadraoMapeamento<GenerosEntidade>
    {
        public GenerosMapeamento() : base("Generos")
        {}

        public override void ConfigureCampos(EntityTypeBuilder<GenerosEntidade> builder)
        {
            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasColumnName("Descricao")
                .HasColumnType("Varchar")
                .HasMaxLength(200);
        }
    }
}
