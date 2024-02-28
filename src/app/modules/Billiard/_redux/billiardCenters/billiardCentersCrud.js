import axios from "axios";
export const BILLIARDCENTERS_URL = "BilliardCenter";
// CREATE = add a new billiardCenters to the server
export function createBilliardCenter(billiardCenters) {
  return axios.post(`${BILLIARDCENTERS_URL}/post`, billiardCenters);
}
// READ
export function getAllBilliardCenters() {
  return axios.get(`${BILLIARDCENTERS_URL}/get`);
}
export function getBilliardCenterById(billiardCentersId) {
  return axios.get(`${BILLIARDCENTERS_URL}/get/${billiardCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBilliardCenters(queryParams) {
  return axios.post(`${BILLIARDCENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBilliardCenter(id, billiardCenters) {
  return axios.put(`${BILLIARDCENTERS_URL}/put/${id}`, billiardCenters);
}
// UPDATE Status
export function updateStatusForBilliardCenters(ids, status) {
  return axios.post(`${BILLIARDCENTERS_URL}/updateStatusForBilliardCenters`, {
    ids,
    status,
  });
}
// DELETE = the billiardCenters from the server
export function deleteBilliardCenter(billiardCentersId) {
  return axios.delete(`${BILLIARDCENTERS_URL}/delete/${billiardCentersId}`);
}
// DELETE BilliardCenters by ids
export function deleteBilliardCenters(ids) {
  return axios.post(`${BILLIARDCENTERS_URL}/deleteBilliardCenters`, ids);
}
