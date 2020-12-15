import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.clientesmart.com.br',
});

export default api;
