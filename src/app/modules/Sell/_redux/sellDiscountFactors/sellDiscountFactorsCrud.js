
import axios from "axios";
export const SELLDOCUMENTFACTORS_URL = "SellDiscountFactor";
// CREATE = add a new sellDiscountFactors to the server 
export function createSellDiscountFactor(sellDiscountFactors) { 
  return axios.post(`${SELLDOCUMENTFACTORS_URL}/post`, sellDiscountFactors); 
}
// READ  
export function getAllSellDiscountFactors() {
  return axios.get(`${SELLDOCUMENTFACTORS_URL}/get`);
}
export function getSellDiscountFactorById(sellDiscountFactorsId) {
  return axios.get(`${SELLDOCUMENTFACTORS_URL}/get/${sellDiscountFactorsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDiscountFactors(queryParams) {
  return axios.post(`${SELLDOCUMENTFACTORS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDiscountFactor(id, sellDiscountFactors) {
  return axios.put(`${SELLDOCUMENTFACTORS_URL}/put/${id}`, sellDiscountFactors);
}
// UPDATE Status  
export function updateStatusForSellDiscountFactors(ids, status) {
  return axios.post(`${SELLDOCUMENTFACTORS_URL}/updateStatusForSellDiscountFactors`, {
    ids,
    status,
  });
}
// DELETE = the sellDiscountFactors from the server  
export function deleteSellDiscountFactor(sellDiscountFactorsId) {
  return axios.delete(`${SELLDOCUMENTFACTORS_URL}/delete/${sellDiscountFactorsId}`);
}
// DELETE SellDiscountFactors by ids  
export function deleteSellDiscountFactors(ids) {
return axios.post(`${SELLDOCUMENTFACTORS_URL}/deleteSellDiscountFactors`, ids);
}