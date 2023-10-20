
import axios from "axios";
export const SELLPRICING_URL = "SellPricing";
// CREATE = add a new sellPricing to the server 
export function createSellPricing(sellPricing) { 
  return axios.post(`${SELLPRICING_URL}/post`, sellPricing); 
}
// READ  
export function getAllSellPricing() {
  return axios.get(`${SELLPRICING_URL}/get`);
}
export function getSellPricingById(sellPricingId) {
  return axios.get(`${SELLPRICING_URL}/get/${sellPricingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellPricing(queryParams) {
  return axios.post(`${SELLPRICING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellPricing(id, sellPricing) {
  return axios.put(`${SELLPRICING_URL}/put/${id}`, sellPricing);
}
// UPDATE Status  
export function updateStatusForSellPricing(ids, status) {
  return axios.post(`${SELLPRICING_URL}/updateStatusForSellPricing`, {
    ids,
    status,
  });
}
// DELETE = the sellPricing from the server  
export function deleteSellPricing(sellPricingId) {
  return axios.delete(`${SELLPRICING_URL}/delete/${sellPricingId}`);
}
// DELETE SellPricing by ids  
export function deleteSellPricings(ids) {
return axios.post(`${SELLPRICING_URL}/deleteSellPricing`, ids);
}

// SUGGESION PRODUCT
export function suggestProduct(query, unitId) {
  return axios.post(`${SELLPRICING_URL}/suggestion`, {
    Term: query,
    // UnitId: unitId
  });
}