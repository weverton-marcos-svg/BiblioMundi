using FluentValidation;

namespace BiblioMundiApi.Comando.Autores.Validacao
{
    public class AutoresCadastroPadraoComandoEntradaValidador : AbstractValidator<AutoresCadastroPadraoComandoEntrada>
    {
        public AutoresCadastroPadraoComandoEntradaValidador()
        {
            RuleFor(x => x.Nome)
                .NotEmpty()
                .WithMessage("Nome do Autor não foi informado");

            RuleFor(x => x.Nacionalidade)
                .NotEmpty()
                .WithMessage("Nacionalidade do autor não foi informada.");
        }
    }
}
