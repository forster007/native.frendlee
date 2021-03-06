import api from '../api';

export function postCustomerParent(obj) {
  return api.post('/customerparents', obj);
}

export function updateCustomerParent({ id, status }) {
  return api.put(`/customerparents/${id}`, { status });
}

export function getCustomerToken() {
  return api.post('/customertokens');
}

export function getCustomerParents(all = false) {
  return api.get(all ? `/customerparents?all=${all}` : `/customerparents`);
}

export function getCustomerProfile() {
  return api.get('/customers');
}

export function getParentProfile() {
  return api.get('/parents');
}
