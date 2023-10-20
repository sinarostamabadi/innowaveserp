
import axios from "axios";
export const SELLDOCUMENTDISCOUNTS_URL = "SellDocumentDiscount";
// CREATE = add a new sellDocumentDiscounts to the server 
export function createSellDocumentDiscount(sellDocumentDiscounts) { 
  return axios.post(`${SELLDOCUMENTDISCOUNTS_URL}/post`, sellDocumentDiscounts); 
}
// READ  
export function getAllSellDocumentDiscounts() {
  return axios.get(`${SELLDOCUMENTDISCOUNTS_URL}/get`);
}
export function getSellDocumentDiscountById(sellDocumentDiscountsId) {
  return axios.get(`${SELLDOCUMENTDISCOUNTS_URL}/get/${sellDocumentDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDocumentDiscounts(queryParams) {
  return axios.post(`${SELLDOCUMENTDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDocumentDiscount(id, sellDocumentDiscounts) {
  return axios.put(`${SELLDOCUMENTDISCOUNTS_URL}/put/${id}`, sellDocumentDiscounts);
}
// UPDATE Status  
export function updateStatusForSellDocumentDiscounts(ids, status) {
  return axios.post(`${SELLDOCUMENTDISCOUNTS_URL}/updateStatusForSellDocumentDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the sellDocumentDiscounts from the server  
export function deleteSellDocumentDiscount(sellDocumentDiscountsId) {
  return axios.delete(`${SELLDOCUMENTDISCOUNTS_URL}/delete/${sellDocumentDiscountsId}`);
}
// DELETE SellDocumentDiscounts by ids  
export function deleteSellDocumentDiscounts(ids) {
return axios.post(`${SELLDOCUMENTDISCOUNTS_URL}/deleteSellDocumentDiscounts`, ids);
}