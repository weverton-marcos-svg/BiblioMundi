using BiblioMundiApi.Comando.Padrao.Validacao;
using BiblioMundiApi.Conexao;
using BiblioMundiApi.Data.Conexao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Cargos;
using BiblioMundiApi.Repositorios.Clientes;
using BiblioMundiApi.Repositorios.Funcionarios;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddValidatorsFromAssemblyContaining<PadraoComandoEntradaValidacao>();
builder.Services.AddFluentValidationAutoValidation();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IConexaoBd>(provedorServ =>
{
    return provedorServ.GetService<ConexaoBd>();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirQualquerOrigem", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirQualquerOrigem", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped(c => new ConexaoBd(builder.Configuration.GetConnectionString("Conection")));
builder.Services.AddScoped<ICargosRepositorio,CargosRepositorio>();
builder.Services.AddScoped<IFuncionariosRepositorio,FuncionariosRepositorio>();
builder.Services.AddScoped<IClientesRepositorio, ClientesRepositorio>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("PermitirQualquerOrigem");
app.UseCors("PermitirQualquerOrigem");

app.MapControllers();

app.Run();
