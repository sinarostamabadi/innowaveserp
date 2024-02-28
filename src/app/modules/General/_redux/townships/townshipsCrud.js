import axios from "axios";
export const TOWNSHIPS_URL = "Township";
// CREATE = add a new townships to the server
export function createTownship(townships) {
  return axios.post(`${TOWNSHIPS_URL}/post`, townships);
}
// READ
export function getAllTownships() {
  return axios.get(`${TOWNSHIPS_URL}/get`);
}
export function getTownshipById(townshipsId) {
  return axios.get(`${TOWNSHIPS_URL}/get/${townshipsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findTownships(queryParams) {
  return axios.post(`${TOWNSHIPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateTownship(id, townships) {
  return axios.put(`${TOWNSHIPS_URL}/put/${id}`, townships);
}
// UPDATE Status
export function updateStatusForTownships(ids, status) {
  return axios.post(`${TOWNSHIPS_URL}/updateStatusForTownships`, {
    ids,
    status,
  });
}
// DELETE = the townships from the server
export function deleteTownship(townshipsId) {
  return axios.delete(`${TOWNSHIPS_URL}/delete/${townshipsId}`);
}
// DELETE Townships by ids
export function deleteTownships(ids) {
  return axios.post(`${TOWNSHIPS_URL}/deleteTownships`, ids);
}
