import axios from "axios";
export const url = "CashDocument";
// CREATE = add a new cashDocuments to the server
export function create(cashDocuments) {
  return axios.post(`${url}/post`, cashDocuments);
}
// READ
export function getAll() {
  return axios.get(`${url}/get`);
}
export function getById(id) {
  return axios.get(`${url}/get/${id}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function find(params) {
  return axios.post(`${url}/get`, params);
}
// UPDATE = update the procuct on the server
export function update(id, data) {
  return axios.put(`${url}/put/${id}`, data);
}

// DELETE = the cashDocuments from the server
export function remove(id) {
  return axios.delete(`${url}/delete/${id}`);
}
// DELETE CashDocuments by ids
export function removeIds(ids) {
  return axios.post(`${url}/deleteCashDocuments`, ids);
}

export function createCashRequest(pkId, entityId) {
  return axios.post(`${url}/CreateCashRequest`, {
    EntityPKId: pkId,
    EntityId: entityId,
  });
}
