import axios from "axios";
export const SERVICESES_URL = "Services";
// CREATE = add a new serviceses to the server
export function createServices(serviceses) {
  return axios.post(`${SERVICESES_URL}/post`, serviceses);
}
// READ
export function getAllServiceses() {
  return axios.get(`${SERVICESES_URL}/get`);
}
export function getServicesById(servicesesId) {
  return axios.get(`${SERVICESES_URL}/get/${servicesesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findServiceses(queryParams) {
  return axios.post(`${SERVICESES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateServices(id, serviceses) {
  return axios.put(`${SERVICESES_URL}/put/${id}`, serviceses);
}
// UPDATE Status
export function updateStatusForServiceses(ids, status) {
  return axios.post(`${SERVICESES_URL}/updateStatusForServiceses`, {
    ids,
    status,
  });
}
// DELETE = the serviceses from the server
export function deleteServices(servicesesId) {
  return axios.delete(`${SERVICESES_URL}/delete/${servicesesId}`);
}
// DELETE Serviceses by ids
export function deleteServiceses(ids) {
  return axios.post(`${SERVICESES_URL}/deleteServiceses`, ids);
}
