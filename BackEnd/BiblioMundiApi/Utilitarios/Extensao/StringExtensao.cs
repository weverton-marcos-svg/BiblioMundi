using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace BiblioMundiApi.Utilitarios.Extensao
{
    public static class StringExtensao
    {
        public static void ValidarCPF(this string CPF)
        {
            if (string.IsNullOrEmpty(CPF))
            {
                return;
            }

            if (CPF.Length != 11)
            {
                throw new Exception("Quanitdade de digitos inválido.");
            }

            #region Validação do primeiro digito verificador
            var digitos = CPF.Substring(0,9);
            var verificador = int.Parse(CPF.Substring(9, 1));

            var posicao = 0;
            var totalsomado = 0;
            for (int i = 10; i >= 2; i--)
            {
                var digito = int.Parse(digitos.Substring(posicao, 1));
                totalsomado += digito * i;
                posicao += 1;
            }

            var validarverificado = (totalsomado * 10) % 11;
            validarverificado = validarverificado == 10 ? 0 : validarverificado;

            if (validarverificado != verificador)
            {
                throw new Exception("CPF inválido.");
            }
            #endregion

            #region Validação do segundo digito verificado
            digitos = CPF.Substring(0,10);
            verificador = int.Parse(CPF.Substring(10, 1));

            posicao = 0;
            totalsomado = 0;
            for (int i = 11; i >= 2; i--)
            {
                var digito = int.Parse(digitos.Substring(posicao, 1));
                totalsomado += digito * i;
                posicao += 1;
            }

            validarverificado = (totalsomado * 10) % 11;
            validarverificado = validarverificado == 10 ? 0 : validarverificado;

            if (validarverificado != verificador)
            {
                throw new Exception("CPF inválido.");
            }
            #endregion

        }

        public static bool ValidarEmail(this string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return true;
            }

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
    }
}
