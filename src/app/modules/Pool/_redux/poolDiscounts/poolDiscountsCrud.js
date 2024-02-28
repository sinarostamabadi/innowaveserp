import axios from "axios";
export const POOLDISCOUNTS_URL = "PoolDiscount";
// CREATE = add a new poolDiscounts to the server
export function createPoolDiscount(poolDiscounts) {
  return axios.post(`${POOLDISCOUNTS_URL}/post`, poolDiscounts);
}
// READ
export function getAllPoolDiscounts() {
  return axios.get(`${POOLDISCOUNTS_URL}/get`);
}
export function getPoolDiscountById(poolDiscountsId) {
  return axios.get(`${POOLDISCOUNTS_URL}/get/${poolDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPoolDiscounts(queryParams) {
  return axios.post(`${POOLDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePoolDiscount(id, poolDiscounts) {
  return axios.put(`${POOLDISCOUNTS_URL}/put/${id}`, poolDiscounts);
}
// UPDATE Status
export function updateStatusForPoolDiscounts(ids, status) {
  return axios.post(`${POOLDISCOUNTS_URL}/updateStatusForPoolDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the poolDiscounts from the server
export function deletePoolDiscount(poolDiscountsId) {
  return axios.delete(`${POOLDISCOUNTS_URL}/delete/${poolDiscountsId}`);
}
// DELETE PoolDiscounts by ids
export function deletePoolDiscounts(ids) {
  return axios.post(`${POOLDISCOUNTS_URL}/deletePoolDiscounts`, ids);
}
