import axios from "axios";
export const POOLRESERVES_URL = "PoolReserve";
// CREATE = add a new poolReserves to the server
export function createPoolReserve(poolReserves) {
  return axios.post(`${POOLRESERVES_URL}/post`, poolReserves);
}
// READ
export function getAllPoolReserves() {
  return axios.get(`${POOLRESERVES_URL}/get`);
}
export function getPoolReserveById(poolReservesId) {
  return axios.get(`${POOLRESERVES_URL}/get/${poolReservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPoolReserves(queryParams) {
  return axios.post(`${POOLRESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePoolReserve(id, poolReserves) {
  return axios.put(`${POOLRESERVES_URL}/put/${id}`, poolReserves);
}
// UPDATE Status
export function updateStatusForPoolReserves(ids, status) {
  return axios.post(`${POOLRESERVES_URL}/updateStatusForPoolReserves`, {
    ids,
    status,
  });
}
// DELETE = the poolReserves from the server
export function deletePoolReserve(poolReservesId) {
  return axios.delete(`${POOLRESERVES_URL}/delete/${poolReservesId}`);
}
// DELETE PoolReserves by ids
export function deletePoolReserves(ids) {
  return axios.post(`${POOLRESERVES_URL}/deletePoolReserves`, ids);
}
