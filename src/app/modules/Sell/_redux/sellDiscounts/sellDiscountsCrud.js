
import axios from "axios";
export const SELLDISCOUNTS_URL = "SellDiscount";
// CREATE = add a new sellDiscounts to the server 
export function createSellDiscount(sellDiscounts) { 
  return axios.post(`${SELLDISCOUNTS_URL}/post`, sellDiscounts); 
}
// READ  
export function getAllSellDiscounts() {
  return axios.get(`${SELLDISCOUNTS_URL}/get`);
}
export function getSellDiscountById(sellDiscountsId) {
  return axios.get(`${SELLDISCOUNTS_URL}/get/${sellDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDiscounts(queryParams) {
  return axios.post(`${SELLDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDiscount(id, sellDiscounts) {
  return axios.put(`${SELLDISCOUNTS_URL}/put/${id}`, sellDiscounts);
}
// UPDATE Status  
export function updateStatusForSellDiscounts(ids, status) {
  return axios.post(`${SELLDISCOUNTS_URL}/updateStatusForSellDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the sellDiscounts from the server  
export function deleteSellDiscount(sellDiscountsId) {
  return axios.delete(`${SELLDISCOUNTS_URL}/delete/${sellDiscountsId}`);
}
// DELETE SellDiscounts by ids  
export function deleteSellDiscounts(ids) {
return axios.post(`${SELLDISCOUNTS_URL}/deleteSellDiscounts`, ids);
}