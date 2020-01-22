import axios from 'axios';

const api = axios.create({
  baseURL: 'http://64.227.0.10/api',
});

export default api;
