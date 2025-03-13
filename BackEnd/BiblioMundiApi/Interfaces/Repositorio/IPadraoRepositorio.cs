using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiblioMundiApi.Interfaces.Repositorio
{
    public interface IPadraoRepositorio<TEntidade>
    {
        Task Salvar();
        Task Incluir(TEntidade registro);
        Task IncluirLista(List<TEntidade> listaDeRegistro);
        Task Excluir(TEntidade entidade);
        Task ExcluirLista(List<TEntidade> entidade);
        Task AbrirTransacao(Func<Task> metodo);
        Task<TEntidade> LocalizarPorIdEntidade(int id);
    }
}
