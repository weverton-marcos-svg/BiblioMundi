import api from 'axios';
import showErrorToast from '../components/Toast/ToastErro';

const urlBase = process.env.REACT_APP_API_URL;

const acervoApi = api.create({
  baseURL: urlBase + '/acervo'
});

export default class AcervoService {

    // #region Autores
    async getAutores(filtros) {
        const response = await acervoApi.get('/autores', { params: filtros })
        .catch(function(error) {    
            showErrorToast('Erro ao consultar autores');
            console.error('Erro ao consultar autores:', error);
            return [];
        });

        return response.data;
    }

    async getAutoresById(id) {
        const response = await acervoApi.get(`/autores/${id}`)
        .catch(function(error) {
            showErrorToast('Erro ao consultar autor');
            console.error('Erro ao consultar autor:', error);
            return []
        });

        return response.data;
    }

    async postAutores(req) {
        const response = await acervoApi.post('/autores', req)
        .catch(function(error) {
            showErrorToast('Erro ao consultar autores', error.response.statusText);
            console.error('Erro ao cadastrar autor:', error.response);
            return [];
        });

         return response.data
    }

    async putAutores(id, req) {
        const response = await acervoApi.put(`/autores/${id}`, req)
        .catch(function(error) {
            showErrorToast('Erro ao consultar autores', error.response.statusText);
            console.error('Erro ao atualizar autor:', error.response);
            return  error.response.status;
        });

        return response.status;
    }

    async putStatusLogicoAutores(id) {
        const response = await acervoApi.put(`/autores/${id}/StatusLogico`)
        .catch(function(error) {
            showErrorToast('Erro ao atualizar status do autor:', error.response.statusText);
            console.error('Erro ao atualizar status do autor:', error.response);
            return error.response.status;
        });

        return response.status;
    }
    // #endregion

    // #region Generos
    async getGeneros(filtros) {
        const response = await acervoApi.get('/generos', { params: filtros })
        .catch(function(error) {
            showErrorToast('Erro ao consultar gêneros');
            console.error('Erro ao consultar gêneros:', error.response);
            return [];
        });

        return response.data
    }

    async getGenerosById(id) {
        const response = await acervoApi.get(`/generos/${id}`)
        .catch(function(error) {
            showErrorToast('Erro ao consultar gêneros');
            console.error('Erro ao consultar gênero:', error.response);
            return [];
        });

        return response.data;
    }

    async postGeneros(req) {
        const response = await acervoApi.post('/generos', req)
        .catch(function(error) {
            showErrorToast('Erro ao cadastrar gênero ' + error.response.statusText);
            console.error('Erro ao cadastrar gênero:', error.response);
            return [];
        });

        return response.data;
    }

    async putGeneros(id, req) {
        const response =  await acervoApi.put(`/generos/${id}`, req)
        .catch(function(error) {
            showErrorToast('Erro ao atualizar gênero ' + error.response.statusText);
            console.error('Erro ao atualizar gênero:', error.response);
            return error.response.status;
        });

        return response.status;
    }

    async putStatusLogicoGeneros(id) {
        const response =  await acervoApi.put(`/generos/${id}/StatusLogico`)
        .catch(function(error) {
            showErrorToast('Erro ao atualizar status lógico do gênero ' + error.response.statusText);
            console.error('Erro ao atualizar status lógico do gênero:', error.response);
            return error.response.status;
        });

        return response.status;
    }

    // #endregion

    // #region Livros
    async getLivros(filtros) {
        const response = await acervoApi.get('/livros', { params: filtros })
        .catch(function(error) {
            showErrorToast('Erro ao consultar livros ' + error.response.statusText);
            console.error('Erro ao consultar livros:', error);
            return [];
        });

        return response.data;
    }

    async getLivrosById(id) {
        const response = await acervoApi.get(`/livros/${id}`)
        .catch(function(error) {
            showErrorToast('Erro ao consultar livros', error.response.statusText);
            console.error('Erro ao consultar livro:', error);
            return [];
        });

        return response.data;
    }

    async postLivros(req) {
        const response = await acervoApi.post('/livros', req)
        .catch(function(error) {
            showErrorToast('Erro ao cadastrar livro', error.response.statusText);
            console.error('Erro ao cadastrar livro:', error);
            return [];
        });

        return response.data;
    }

    async putLivros(id, req) {
        const response = await acervoApi.put(`/livros/${id}`, req)
        .catch(function(error) {
            showErrorToast('Erro ao atualizar livro', error.response.statusText);
            console.error('Erro ao atualizar livro:', error);
            return error.response.status;
        });

        return response.status;
    }

    async putStatusLogicoLivros(id) {
        const response = await acervoApi.put(`/livros/${id}/StatusLogico`)
        .catch(function(error) {
            showErrorToast('Erro ao atualizar status lógico do livro', error.response.statusText);
            console.error('Erro ao atualizar status lógico do livro:', error);
            return error.response.status;
        });

        return response.status;
    }
    // #endregion
}