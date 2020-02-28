import api from '../api';

export function getAppointments() {
  return api.get('/appointments');
}

export function storeAppointments(obj) {
  return api.post('/appointments', obj);
}
