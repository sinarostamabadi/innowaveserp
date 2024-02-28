import axios from "axios";
export const BUYDETAILS_URL = "BuyDetail";
// CREATE = add a new buyDetails to the server
export function createBuyDetail(buyDetails) {
  return axios.post(`${BUYDETAILS_URL}/post`, buyDetails);
}
// READ
export function getAllBuyDetails() {
  return axios.get(`${BUYDETAILS_URL}/get`);
}
export function getBuyDetailById(buyDetailsId) {
  return axios.get(`${BUYDETAILS_URL}/get/${buyDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyDetails(queryParams) {
  return axios.post(`${BUYDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyDetail(id, buyDetails) {
  return axios.put(`${BUYDETAILS_URL}/put/${id}`, buyDetails);
}
// UPDATE Status
export function updateStatusForBuyDetails(ids, status) {
  return axios.post(`${BUYDETAILS_URL}/updateStatusForBuyDetails`, {
    ids,
    status,
  });
}
// DELETE = the buyDetails from the server
export function deleteBuyDetail(buyDetailsId) {
  return axios.delete(`${BUYDETAILS_URL}/delete/${buyDetailsId}`);
}
// DELETE BuyDetails by ids
export function deleteBuyDetails(ids) {
  return axios.post(`${BUYDETAILS_URL}/deleteBuyDetails`, ids);
}
