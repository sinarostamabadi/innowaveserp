import axios from "axios";
export const BUYSERIALS_URL = "BuySerial";
// CREATE = add a new buySerials to the server
export function createBuySerial(buySerials) {
  return axios.post(`${BUYSERIALS_URL}/post`, buySerials);
}
// READ
export function getAllBuySerials() {
  return axios.get(`${BUYSERIALS_URL}/get`);
}
export function getBuySerialById(buySerialsId) {
  return axios.get(`${BUYSERIALS_URL}/get/${buySerialsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuySerials(queryParams) {
  return axios.post(`${BUYSERIALS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuySerial(id, buySerials) {
  return axios.put(`${BUYSERIALS_URL}/put/${id}`, buySerials);
}
// UPDATE Status
export function updateStatusForBuySerials(ids, status) {
  return axios.post(`${BUYSERIALS_URL}/updateStatusForBuySerials`, {
    ids,
    status,
  });
}
// DELETE = the buySerials from the server
export function deleteBuySerial(buySerialsId) {
  return axios.delete(`${BUYSERIALS_URL}/delete/${buySerialsId}`);
}
// DELETE BuySerials by ids
export function deleteBuySerials(ids) {
  return axios.post(`${BUYSERIALS_URL}/deleteBuySerials`, ids);
}
