using FluentValidation;

namespace BiblioMundiApi.Comando.Livros.Validacao
{
    public class LivroCadastroPadraoComandoEntradaValidador : AbstractValidator<LivroCadastroPadraoComandoEntrada>
    {
        public LivroCadastroPadraoComandoEntradaValidador()
        {
            RuleFor(x => x.Titulo)
               .NotEmpty()
               .WithMessage("Título não foi informado.");

            RuleFor(x => x.Isbn)
                .NotEmpty()
                .WithMessage("Isbn não foi informado.");

            RuleFor(x => x.TipoFormato)
                .IsInEnum()
                .WithMessage("Formato inválido.");

            RuleFor(x => x.IdAutor)
                .GreaterThan(0)
                .WithMessage("Id do Autor inválido");

            RuleFor(x => x.IdGenero)
                .GreaterThan(0)
                .WithMessage("Id do Genero inválido");

            RuleFor(x => x.QuantidadeDeCopias)
                .GreaterThan(0)
                .WithMessage("Quantidade de Copias não pode ser inferior a 0");

            RuleFor(x => x.NumeroDePaginas)
                .GreaterThan(0)
                .WithMessage("Numero de Páginas não pode ser menor que 0");
        }
    }
}
