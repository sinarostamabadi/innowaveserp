
import axios from "axios";
export const SELLDOCUMENTDETAILS_URL = "SellDocumentDetail";
// CREATE = add a new sellDocumentDetails to the server 
export function createSellDocumentDetail(sellDocumentDetails) { 
  return axios.post(`${SELLDOCUMENTDETAILS_URL}/post`, sellDocumentDetails); 
}
// READ  
export function getAllSellDocumentDetails() {
  return axios.get(`${SELLDOCUMENTDETAILS_URL}/get`);
}
export function getSellDocumentDetailById(sellDocumentDetailsId) {
  return axios.get(`${SELLDOCUMENTDETAILS_URL}/get/${sellDocumentDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDocumentDetails(queryParams) {
  return axios.post(`${SELLDOCUMENTDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDocumentDetail(id, sellDocumentDetails) {
  return axios.put(`${SELLDOCUMENTDETAILS_URL}/put/${id}`, sellDocumentDetails);
}
// UPDATE Status  
export function updateStatusForSellDocumentDetails(ids, status) {
  return axios.post(`${SELLDOCUMENTDETAILS_URL}/updateStatusForSellDocumentDetails`, {
    ids,
    status,
  });
}
// DELETE = the sellDocumentDetails from the server  
export function deleteSellDocumentDetail(sellDocumentDetailsId) {
  return axios.delete(`${SELLDOCUMENTDETAILS_URL}/delete/${sellDocumentDetailsId}`);
}
// DELETE SellDocumentDetails by ids  
export function deleteSellDocumentDetails(ids) {
return axios.post(`${SELLDOCUMENTDETAILS_URL}/deleteSellDocumentDetails`, ids);
}

export function saveSellDocumentDetail(sellDocumentDetails) { 
  return axios.post(`${SELLDOCUMENTDETAILS_URL}/save`, sellDocumentDetails); 
}

export function removeSellDocumentDetail(sellDocumentDetailsId) {
  return axios.delete(`${SELLDOCUMENTDETAILS_URL}/delete/${sellDocumentDetailsId}`);
}