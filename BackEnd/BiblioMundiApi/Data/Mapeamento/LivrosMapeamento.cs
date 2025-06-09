using BiblioMundiApi.Data.Mapeamento.Utils;
using BiblioMundiApi.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BiblioMundiApi.Data.Mapeamento
{
    public class LivrosMapeamento : PadraoMapeamento<LivrosEntidade>
    {
        public LivrosMapeamento() : base("Livros")
        {
        }

        public override void ConfigureCampos(EntityTypeBuilder<LivrosEntidade> builder)
        {
            builder.Property(x => x.Titulo)
                 .IsRequired()
                 .HasColumnName("Titulo")
                 .HasColumnType("Varchar")
                 .HasMaxLength(200);

            builder.Property(x => x.SubTitulo)
                .HasColumnName("SubTitulo")
                .HasColumnType("Varchar")
                .HasMaxLength(100);

            builder.Property(x => x.Isbn)
                .IsRequired()
                .HasColumnName("Isbn")
                .HasColumnType("Varchar")
                .HasMaxLength(13);

            builder.Property(x => x.AnoPublicado)
                .HasColumnName("AnoPublicado")
                .HasColumnType("Int");

            builder.Property(x => x.NumeroDePaginas)
                .HasColumnName("NumeroDePaginas")
                .HasColumnType("Int");

            builder.Property(x => x.Idioma)
                .HasColumnName("Idioma")
                .HasColumnType("Varchar")
                .HasMaxLength(50);

            builder.Property(x => x.Edicao)
                .HasColumnName("Edicao")
                .HasColumnType("Varchar")
                .HasMaxLength(50);

            builder.Property(x => x.TipoFormato)
                .HasColumnName("TipoFormato")
                .HasColumnType("Int");

            builder.Property(x => x.QuantidadeDeCopias)
                .HasColumnName("QuantidadeDeCopias")
                .HasColumnType("Int");

            builder.Property(x => x.Autor)
                .HasColumnName("Autor")
                .HasColumnType("Int");

            builder.Property(x => x.Genero)
                .HasColumnName("Genero")
                .HasColumnType("Int");

            builder.HasOne(x => x.AutoresEntidade)
                .WithMany(tabelaPrincipal => tabelaPrincipal.Livros)
                .HasForeignKey(tabelaRelacionamento => tabelaRelacionamento.Autor);

            builder.HasOne(x => x.GenerosEntidade)
                .WithMany(tabelaPrincipal => tabelaPrincipal.Livros)
                .HasForeignKey(tabelaRelacionamento => tabelaRelacionamento.Genero);
                
        }
    }
}
