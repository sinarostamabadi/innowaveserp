import axios from "axios";
export const BUYREQUESTS_URL = "BuyRequest";
// CREATE = add a new buyRequests to the server
export function createBuyRequest(buyRequests) {
  return axios.post(`${BUYREQUESTS_URL}/post`, buyRequests);
}
// READ
export function getAllBuyRequests() {
  return axios.get(`${BUYREQUESTS_URL}/get`);
}
export function getBuyRequestById(buyRequestsId) {
  return axios.get(`${BUYREQUESTS_URL}/get/${buyRequestsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyRequests(queryParams) {
  return axios.post(`${BUYREQUESTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyRequest(id, buyRequests) {
  return axios.put(`${BUYREQUESTS_URL}/put/${id}`, buyRequests);
}
// UPDATE Status
export function updateStatusForBuyRequests(ids, status) {
  return axios.post(`${BUYREQUESTS_URL}/updateStatusForBuyRequests`, {
    ids,
    status,
  });
}
// DELETE = the buyRequests from the server
export function deleteBuyRequest(buyRequestsId) {
  return axios.delete(`${BUYREQUESTS_URL}/delete/${buyRequestsId}`);
}
// DELETE BuyRequests by ids
export function deleteBuyRequests(ids) {
  return axios.post(`${BUYREQUESTS_URL}/deleteBuyRequests`, ids);
}
