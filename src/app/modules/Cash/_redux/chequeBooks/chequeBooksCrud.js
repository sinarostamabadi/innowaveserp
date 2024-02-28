import axios from "axios";
export const URL = "ChequeBook";
// CREATE = add a new chequeBooks to the server
export function create(data) {
  return axios.post(`${URL}/post`, data);
}
// READ
export function getAll() {
  return axios.get(`${URL}/getAll`);
}
export function getById(id) {
  return axios.get(`${URL}/get/${id}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function find(params) {
  return axios.post(`${URL}/get`, params);
}
// UPDATE = update the procuct on the server
export function update(id, data) {
  return axios.put(`${URL}/put/${id}`, data);
}
// DELETE = the chequeBooks from the server
export function remove(id) {
  return axios.delete(`${URL}/delete/${id}`);
}
// DELETE ChequeBooks by ids
export function removeIds(ids) {
  return axios.post(`${URL}/delete`, ids);
}
