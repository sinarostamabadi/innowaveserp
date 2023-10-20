
import axios from "axios";
export const SELLDOCUMENTS_URL = "SellDocument";
// CREATE = add a new sellDocuments to the server 
export function createSellDocument(sellDocuments) { 
  return axios.post(`${SELLDOCUMENTS_URL}/post`, sellDocuments); 
}
// READ  
export function getAllSellDocuments() {
  return axios.get(`${SELLDOCUMENTS_URL}/get`);
}
export function getSellDocumentById(sellDocumentsId) {
  return axios.get(`${SELLDOCUMENTS_URL}/get/${sellDocumentsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDocuments(queryParams) {
  return axios.post(`${SELLDOCUMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDocument(id, sellDocuments) {
  return axios.put(`${SELLDOCUMENTS_URL}/put/${id}`, sellDocuments);
}
// UPDATE Status  
export function updateStatusForSellDocuments(ids, status) {
  return axios.post(`${SELLDOCUMENTS_URL}/updateStatusForSellDocuments`, {
    ids,
    status,
  });
}
// DELETE = the sellDocuments from the server  
export function deleteSellDocument(sellDocumentsId) {
  return axios.delete(`${SELLDOCUMENTS_URL}/delete/${sellDocumentsId}`);
}
// DELETE SellDocuments by ids  
export function deleteSellDocuments(ids) {
return axios.post(`${SELLDOCUMENTS_URL}/deleteSellDocuments`, ids);
}

export function calculate(sellDocumentsId) {
  return axios.get(`${SELLDOCUMENTS_URL}/Calculate/${sellDocumentsId}`);
}
