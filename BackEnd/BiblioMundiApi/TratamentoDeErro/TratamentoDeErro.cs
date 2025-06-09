using BiblioMundiApi.TratamentoDeErro;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext); // Continua a execução normal da API
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex); // Captura e trata a exceção
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = HttpStatusCode.BadRequest;
        string messagem = "";

        switch (exception)
        {
            case ErroExcecao erroExcecao:
                messagem = exception.Message;
                break;
            default:
                messagem = $"Erro interno na Api";
                break;
        }

        var response = new { error = exception.Message, status = (int)statusCode };
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}