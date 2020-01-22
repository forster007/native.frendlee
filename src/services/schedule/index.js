import api from '../api';

export function getSchedules() {
  return api.get('/schedules');
}
