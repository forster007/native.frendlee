import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.clientesmart.com.br',
  // baseURL: 'http://192.168.31.56:3333',
  // baseURL: 'http://192.168.0.13:3333',
});

export default api;
