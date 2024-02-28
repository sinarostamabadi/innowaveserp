import axios from "axios";
export const BUYCOSTS_URL = "BuyCost";
// CREATE = add a new buyCosts to the server
export function createBuyCost(buyCosts) {
  return axios.post(`${BUYCOSTS_URL}/post`, buyCosts);
}
// READ
export function getAllBuyCosts() {
  return axios.get(`${BUYCOSTS_URL}/getAll`);
}
export function getBuyCostById(buyCostsId) {
  return axios.get(`${BUYCOSTS_URL}/get/${buyCostsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyCosts(queryParams) {
  return axios.post(`${BUYCOSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyCost(id, buyCosts) {
  return axios.put(`${BUYCOSTS_URL}/put/${id}`, buyCosts);
}
// UPDATE Status
export function updateStatusForBuyCosts(ids, status) {
  return axios.post(`${BUYCOSTS_URL}/updateStatusForBuyCosts`, {
    ids,
    status,
  });
}
// DELETE = the buyCosts from the server
export function deleteBuyCost(buyCostsId) {
  return axios.delete(`${BUYCOSTS_URL}/delete/${buyCostsId}`);
}
// DELETE BuyCosts by ids
export function deleteBuyCosts(ids) {
  return axios.post(`${BUYCOSTS_URL}/deleteBuyCosts`, ids);
}
