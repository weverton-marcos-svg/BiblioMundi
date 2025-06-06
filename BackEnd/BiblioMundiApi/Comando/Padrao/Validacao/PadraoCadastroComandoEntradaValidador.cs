using FluentValidation;

namespace BiblioMundiApi.Comando.Padrao.Validacao
{
    public class PadraoCadastroComandoEntradaValidador : AbstractValidator<PadraoCadastroComandoEntrada>
    {
        public PadraoCadastroComandoEntradaValidador()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty()
                .WithMessage("Descrição não foi informada");
        }
    }
}
