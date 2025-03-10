using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class CargoMapeamento : PadraoMapeamento<CargoEntidade>
    {
        public CargoMapeamento() : base("Cargos")
        {
        }

        public override void ConfigureCampos(EntityTypeBuilder<CargoEntidade> builder)
        {
            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasColumnName("Descricao")
                .HasColumnType("Varchar")
                .HasMaxLength(120);
        }
    }
}
