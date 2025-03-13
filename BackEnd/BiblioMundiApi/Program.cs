using BiblioMundiApi.Conexao;
using BiblioMundiApi.Data.Conexao;
using BiblioMundiApi.Interfaces.Repositorio;
using BiblioMundiApi.Repositorios.Cargos;
using BiblioMundiApi.Repositorios.Funcionarios;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IConexaoBd>(provedorServ =>
{
    return provedorServ.GetService<ConexaoBd>();
});
builder.Services.AddScoped(c => new ConexaoBd(builder.Configuration.GetConnectionString("Conection")));
builder.Services.AddScoped<ICargosRepositorio,CargosRepositorio>();
builder.Services.AddScoped<IFuncionariosRepositorio,FuncionariosRepositorio>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
