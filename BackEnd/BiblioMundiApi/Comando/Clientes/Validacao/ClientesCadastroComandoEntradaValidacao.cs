using FluentValidation;

namespace BiblioMundiApi.Comando.Clientes.Validacao
{
    public class ClientesCadastroComandoEntradaValidacao : AbstractValidator<ClientesCadastroComandoEntrada>
    {
        public ClientesCadastroComandoEntradaValidacao()
        {
            RuleFor(x => x.Nome)
                .NotEmpty()
                .WithMessage("Nome do cliente não foi informado");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email do cliente não foi informado.");
        }
    }
}
