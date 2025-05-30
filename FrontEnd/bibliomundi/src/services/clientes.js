import api from 'axios';

const urlBase = process.env.REACT_APP_API_URL; 

const clientesApi = api.create({
  baseURL: urlBase + '/clientes'
});

export default class ClientesService {

    async getClientes(filtros) {
        try {
        const response = await clientesApi.get('',{params: filtros});
        return response.data;
        }
        catch (error) {
            console.error('Error ao consultar clientes:', error);
            throw error;
        }
    }

    async getClientesById(id) {
        try {
            const response = await clientesApi.get(`/${id}`);
            return response.data;
        }
        catch (error) {
            console.error('Error ao consultar cliente:', error);
            throw error;
        }
    }

    async putStatsLogico(id) {
        try {
            const response = await clientesApi.put(`/${id}/StatusLogico`);
            return response;
        }
        catch (error) {
            console.error('Error ao atualizar cliente:', error);
            throw error;
        }
    }

    async postClientes(req){
        const response = await clientesApi.post('',req)
        return response;
    }

    async putClientes(id, req){
        const response = await clientesApi.put(`/${id}`,req);
        return response;
    }
}