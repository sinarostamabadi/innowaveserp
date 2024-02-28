import axios from "axios";
export const POOLRESERVEPRICES_URL = "PoolReservePrice";
// CREATE = add a new poolReservePrices to the server
export function createPoolReservePrice(poolReservePrices) {
  return axios.post(`${POOLRESERVEPRICES_URL}/post`, poolReservePrices);
}
// READ
export function getAllPoolReservePrices() {
  return axios.get(`${POOLRESERVEPRICES_URL}/get`);
}
export function getPoolReservePriceById(poolReservePricesId) {
  return axios.get(`${POOLRESERVEPRICES_URL}/get/${poolReservePricesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPoolReservePrices(queryParams) {
  return axios.post(`${POOLRESERVEPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePoolReservePrice(id, poolReservePrices) {
  return axios.put(`${POOLRESERVEPRICES_URL}/put/${id}`, poolReservePrices);
}
// UPDATE Status
export function updateStatusForPoolReservePrices(ids, status) {
  return axios.post(
    `${POOLRESERVEPRICES_URL}/updateStatusForPoolReservePrices`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the poolReservePrices from the server
export function deletePoolReservePrice(poolReservePricesId) {
  return axios.delete(`${POOLRESERVEPRICES_URL}/delete/${poolReservePricesId}`);
}
// DELETE PoolReservePrices by ids
export function deletePoolReservePrices(ids) {
  return axios.post(`${POOLRESERVEPRICES_URL}/deletePoolReservePrices`, ids);
}
