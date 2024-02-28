import axios from "axios";
export const BUYS_URL = "Buy";
// CREATE = add a new buys to the server
export function createBuy(buys) {
  return axios.post(`${BUYS_URL}/post`, buys);
}
// READ
export function getAllBuys() {
  return axios.get(`${BUYS_URL}/get`);
}
export function getBuyById(buysId) {
  return axios.get(`${BUYS_URL}/get/${buysId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuys(queryParams) {
  return axios.post(`${BUYS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuy(id, buys) {
  return axios.put(`${BUYS_URL}/put/${id}`, buys);
}
// UPDATE Status
export function updateStatusForBuys(ids, status) {
  return axios.post(`${BUYS_URL}/updateStatusForBuys`, {
    ids,
    status,
  });
}
// DELETE = the buys from the server
export function deleteBuy(buysId) {
  return axios.delete(`${BUYS_URL}/delete/${buysId}`);
}
// DELETE Buys by ids
export function deleteBuys(ids) {
  return axios.post(`${BUYS_URL}/deleteBuys`, ids);
}
