
import axios from "axios";
export const SELLDOCUMENTCOSTS_URL = "SellDocumentCost";
// CREATE = add a new sellDocumentCosts to the server 
export function createSellDocumentCost(sellDocumentCosts) { 
  return axios.post(`${SELLDOCUMENTCOSTS_URL}/post`, sellDocumentCosts); 
}
// READ  
export function getAllSellDocumentCosts() {
  return axios.get(`${SELLDOCUMENTCOSTS_URL}/get`);
}
export function getSellDocumentCostById(sellDocumentCostsId) {
  return axios.get(`${SELLDOCUMENTCOSTS_URL}/get/${sellDocumentCostsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDocumentCosts(queryParams) {
  return axios.post(`${SELLDOCUMENTCOSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDocumentCost(id, sellDocumentCosts) {
  return axios.put(`${SELLDOCUMENTCOSTS_URL}/put/${id}`, sellDocumentCosts);
}
// UPDATE Status  
export function updateStatusForSellDocumentCosts(ids, status) {
  return axios.post(`${SELLDOCUMENTCOSTS_URL}/updateStatusForSellDocumentCosts`, {
    ids,
    status,
  });
}
// DELETE = the sellDocumentCosts from the server  
export function deleteSellDocumentCost(sellDocumentCostsId) {
  return axios.delete(`${SELLDOCUMENTCOSTS_URL}/delete/${sellDocumentCostsId}`);
}
// DELETE SellDocumentCosts by ids  
export function deleteSellDocumentCosts(ids) {
return axios.post(`${SELLDOCUMENTCOSTS_URL}/deleteSellDocumentCosts`, ids);
}