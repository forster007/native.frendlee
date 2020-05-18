import api from '../api';

export function getAppointments() {
  return api.get('/appointments');
}

export function updateAppointments(obj) {
  return api.put(`/appointments/${obj.appointment_id}`, obj);
}

export function storeAppointments(obj) {
  return api.post('/appointments', obj);
}
