using FluentValidation;

namespace BiblioMundiApi.Comando.Livros.Validacao
{
    public class LivrosListarTodosComandoEntradaValidador : AbstractValidator<LivrosListarTodosComandoEntrada>
    {
        public LivrosListarTodosComandoEntradaValidador()
        {
            RuleFor(x => x.DataCadastroInicial)
                .NotEmpty()
                .WithMessage("Data de cadastro inicial não foi informada");

            RuleFor(x => x.DataCadastroFinal)
                .NotEmpty()
                .WithMessage("Data de cadastro final não foi informa");

            RuleFor(x => x)
                .Must(x => x.DataCadastroFinal > x.DataCadastroInicial)
                .WithMessage("Data de cadastro inicial e maior que a data de cadastro final.")
                .WithName("DataCadastroInicial");

            RuleFor(x => x.AnoPublicado)
                .GreaterThan(-1)
                .WithMessage("Ano de publicação não pode ser inferior a 0");

            RuleFor(x => x.TipoFormato)
                .IsInEnum()
                .WithMessage("Tipo do Formato é inválido.");
        }
    }
}
