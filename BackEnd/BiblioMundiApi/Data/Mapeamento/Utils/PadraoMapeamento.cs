using BiblioMundiApi.Entidade.Padrao;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento.Utils
{
    public abstract class PadraoMapeamento<Tentidade> : IEntityTypeConfiguration<Tentidade> where Tentidade : PadraoEntidade
    {
        private readonly string _tabela;

        public PadraoMapeamento(string tabela)
        {
            _tabela = tabela;
        }
        public void Configure(EntityTypeBuilder<Tentidade> builder)
        {
            builder.ToTable(_tabela);
            builder.HasKey(prop => prop.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .UseIdentityColumn()
                .HasColumnName("Id")
                .HasColumnType("int");

            builder.Property(x => x.DataInclusao)
                .HasColumnName("DataInclusao")
                .HasColumnType("Datetime");

            builder.Property(x => x.DataAlteracao)
                .HasColumnName("DataAlteracao")
                .HasColumnType("Datetime");

            builder.Property(x => x.Inativo)
                .HasColumnName("Inativo")
                .HasColumnType("bit");

            builder.Property(x => x.UsuarioCriador)
                .HasColumnName("UsuarioCriador")
                .HasColumnType("int");

            ConfigureCampos(builder);
        }

        public abstract void ConfigureCampos(EntityTypeBuilder<Tentidade> builder);
    }
}
