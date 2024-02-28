import axios from "axios";
export const POOLCENTERS_URL = "PoolCenter";
// CREATE = add a new poolCenters to the server
export function createPoolCenter(poolCenters) {
  return axios.post(`${POOLCENTERS_URL}/post`, poolCenters);
}
// READ
export function getAllPoolCenters() {
  return axios.get(`${POOLCENTERS_URL}/get`);
}
export function getPoolCenterById(poolCentersId) {
  return axios.get(`${POOLCENTERS_URL}/get/${poolCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPoolCenters(queryParams) {
  return axios.post(`${POOLCENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePoolCenter(id, poolCenters) {
  return axios.put(`${POOLCENTERS_URL}/put/${id}`, poolCenters);
}
// UPDATE Status
export function updateStatusForPoolCenters(ids, status) {
  return axios.post(`${POOLCENTERS_URL}/updateStatusForPoolCenters`, {
    ids,
    status,
  });
}
// DELETE = the poolCenters from the server
export function deletePoolCenter(poolCentersId) {
  return axios.delete(`${POOLCENTERS_URL}/delete/${poolCentersId}`);
}
// DELETE PoolCenters by ids
export function deletePoolCenters(ids) {
  return axios.post(`${POOLCENTERS_URL}/deletePoolCenters`, ids);
}
