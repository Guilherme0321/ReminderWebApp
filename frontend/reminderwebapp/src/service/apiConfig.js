import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7108',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
)

export default api;