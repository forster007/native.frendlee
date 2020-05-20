import api from '../api';

export function getMessages() {
  return api.get('/messages');
}
