import api from '../api';

export function getProviders() {
  return api.get('/providers');
}
