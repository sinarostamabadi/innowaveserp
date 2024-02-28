import axios from "axios";
export const POOLTIMEPRICEING_URL = "PoolTimePriceing";
// CREATE = add a new poolTimePriceing to the server
export function createPoolTimePriceing(poolTimePriceing) {
  return axios.post(`${POOLTIMEPRICEING_URL}/post`, poolTimePriceing);
}
// READ
export function getAllPoolTimePriceing() {
  return axios.get(`${POOLTIMEPRICEING_URL}/get`);
}
export function getPoolTimePriceingById(poolTimePriceingId) {
  return axios.get(`${POOLTIMEPRICEING_URL}/get/${poolTimePriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPoolTimePriceing(queryParams) {
  return axios.post(`${POOLTIMEPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePoolTimePriceing(id, poolTimePriceing) {
  return axios.put(`${POOLTIMEPRICEING_URL}/put/${id}`, poolTimePriceing);
}
// UPDATE Status
export function updateStatusForPoolTimePriceing(ids, status) {
  return axios.post(`${POOLTIMEPRICEING_URL}/updateStatusForPoolTimePriceing`, {
    ids,
    status,
  });
}
// DELETE = the poolTimePriceing from the server
export function deletePoolTimePriceing(poolTimePriceingId) {
  return axios.delete(`${POOLTIMEPRICEING_URL}/delete/${poolTimePriceingId}`);
}
// DELETE PoolTimePriceing by ids
export function deletePoolTimePriceing(ids) {
  return axios.post(`${POOLTIMEPRICEING_URL}/deletePoolTimePriceing`, ids);
}
