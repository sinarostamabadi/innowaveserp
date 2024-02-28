import axios from "axios";
export const BUYS_URL = "BuyReturn";
// CREATE = add a new buyReturns to the server
export function createBuyReturn(buyReturns) {
  return axios.post(`${BUYS_URL}/post`, buyReturns);
}
// READ
export function getAllBuyReturns() {
  return axios.get(`${BUYS_URL}/get`);
}
export function getBuyReturnById(buyReturnsId) {
  return axios.get(`${BUYS_URL}/get/${buyReturnsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyReturns(queryParams) {
  return axios.post(`${BUYS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyReturn(id, buyReturns) {
  return axios.put(`${BUYS_URL}/put/${id}`, buyReturns);
}
// UPDATE Status
export function updateStatusForBuyReturns(ids, status) {
  return axios.post(`${BUYS_URL}/updateStatusForBuyReturns`, {
    ids,
    status,
  });
}
// DELETE = the buyReturns from the server
export function deleteBuyReturn(buyReturnsId) {
  return axios.delete(`${BUYS_URL}/delete/${buyReturnsId}`);
}
// DELETE BuyReturns by ids
export function deleteBuyReturns(ids) {
  return axios.post(`${BUYS_URL}/deleteBuyReturns`, ids);
}
