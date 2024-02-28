import axios from "axios";
export const url = "AccountFloatingGroupRelation";

export function create(data) {
  return axios.post(`${url}/post`, data);
}

export function getAll() {
  return axios.get(`${url}/get`);
}

export function getById(id) {
  return axios.get(`${url}/get/${id}`);
}

export function find(queryParams) {
  return axios.post(`${url}/get`, queryParams);
}

export function update(id, data) {
  return axios.put(`${url}/put/${id}`, data);
}

export function remove(id) {
  return axios.delete(`${url}/delete/${id}`);
}

// export function removeIds(ids) {
// return axios.post(`${url}/deleteAccountFloatingGroupRelations`, ids);
// }

export function removeIds(ids) {
  return axios.post(`${url}/delete`, ids);
}
