import axios from "axios";
export const BUYDISCOUNTS_URL = "BuyDiscount";
// CREATE = add a new buyDiscounts to the server
export function createBuyDiscount(buyDiscounts) {
  return axios.post(`${BUYDISCOUNTS_URL}/post`, buyDiscounts);
}
// READ
export function getAllBuyDiscounts() {
  return axios.get(`${BUYDISCOUNTS_URL}/getAll`);
}
export function getBuyDiscountById(buyDiscountsId) {
  return axios.get(`${BUYDISCOUNTS_URL}/get/${buyDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyDiscounts(queryParams) {
  return axios.post(`${BUYDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyDiscount(id, buyDiscounts) {
  return axios.put(`${BUYDISCOUNTS_URL}/put/${id}`, buyDiscounts);
}
// UPDATE Status
export function updateStatusForBuyDiscounts(ids, status) {
  return axios.post(`${BUYDISCOUNTS_URL}/updateStatusForBuyDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the buyDiscounts from the server
export function deleteBuyDiscount(buyDiscountsId) {
  return axios.delete(`${BUYDISCOUNTS_URL}/delete/${buyDiscountsId}`);
}
// DELETE BuyDiscounts by ids
export function deleteBuyDiscounts(ids) {
  return axios.post(`${BUYDISCOUNTS_URL}/deleteBuyDiscounts`, ids);
}
