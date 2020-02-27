import axios from 'axios';

export function getAppointments() {
  return axios.get('/appointments');
}

export function storeAppointments(obj) {
  return axios.post('/appointments', obj);
}
