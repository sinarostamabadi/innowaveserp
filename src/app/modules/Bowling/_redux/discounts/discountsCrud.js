import axios from "axios";
export const DISCOUNTS_URL = "Discount";
// CREATE = add a new discounts to the server
export function createDiscount(discounts) {
  return axios.post(`${DISCOUNTS_URL}/post`, discounts);
}
// READ
export function getAllDiscounts() {
  return axios.get(`${DISCOUNTS_URL}/get`);
}
export function getDiscountById(discountsId) {
  return axios.get(`${DISCOUNTS_URL}/get/${discountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findDiscounts(queryParams) {
  return axios.post(`${DISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateDiscount(id, discounts) {
  return axios.put(`${DISCOUNTS_URL}/put/${id}`, discounts);
}
// UPDATE Status
export function updateStatusForDiscounts(ids, status) {
  return axios.post(`${DISCOUNTS_URL}/updateStatusForDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the discounts from the server
export function deleteDiscount(discountsId) {
  return axios.delete(`${DISCOUNTS_URL}/delete/${discountsId}`);
}
// DELETE Discounts by ids
export function deleteDiscounts(ids) {
  return axios.post(`${DISCOUNTS_URL}/deleteDiscounts`, ids);
}
