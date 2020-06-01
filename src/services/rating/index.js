import api from '../api';

export function storeRating(obj) {
  return api.post('/ratings', obj);
}
