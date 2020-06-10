import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.clientesmart.com.br',
  // baseURL: 'http://192.168.31.56:3333/api',
  // baseURL: 'http://192.168.0.127:3333/api',
});

export default api;
