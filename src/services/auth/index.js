import api from '../api';

export function signIn(obj) {
  return api.post('/sessions', obj);
}
