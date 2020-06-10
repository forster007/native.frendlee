import api from '../api';

export function storePayment(obj) {
  return api.post('/payments', obj);
}
