using FluentValidation;

namespace BiblioMundiApi.Comando.Padrao.Validacao
{
    public class PadraoComandoEntradaValidacao : AbstractValidator<PadraoComandoEntrada>
    {
        public PadraoComandoEntradaValidacao()
        {
            RuleFor(x => x.Descricao)
              .NotEmpty()
              .WithMessage("Descrição não foi informada na req");
        }
    }
}
