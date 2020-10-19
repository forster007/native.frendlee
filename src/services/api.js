import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.1.5:3333',
  baseURL: 'https://api.clientesmart.com.br',
});

export default api;
