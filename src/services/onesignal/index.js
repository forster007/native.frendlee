import api from '../api';

export function storeOnesignal(obj) {
  return api.post('/onesignal', obj);
}
