import api from '../api';

export function getMessages() {
  return api.get('/messages');
}

export function sendMesssage(obj) {
  return api.put(`/messages/${obj.appointment_id}`, obj);
}
