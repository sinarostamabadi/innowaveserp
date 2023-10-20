
import axios from "axios";
export const SELLDOCUMENTDETAILSERIALS_URL = "SellDocumentDetailSerial";
// CREATE = add a new sellDocumentDetailSerials to the server 
export function createSellDocumentDetailSerial(sellDocumentDetailSerials) { 
  return axios.post(`${SELLDOCUMENTDETAILSERIALS_URL}/post`, sellDocumentDetailSerials); 
}
// READ  
export function getAllSellDocumentDetailSerials() {
  return axios.get(`${SELLDOCUMENTDETAILSERIALS_URL}/get`);
}
export function getSellDocumentDetailSerialById(sellDocumentDetailSerialsId) {
  return axios.get(`${SELLDOCUMENTDETAILSERIALS_URL}/get/${sellDocumentDetailSerialsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDocumentDetailSerials(queryParams) {
  return axios.post(`${SELLDOCUMENTDETAILSERIALS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDocumentDetailSerial(id, sellDocumentDetailSerials) {
  return axios.put(`${SELLDOCUMENTDETAILSERIALS_URL}/put/${id}`, sellDocumentDetailSerials);
}
// UPDATE Status  
export function updateStatusForSellDocumentDetailSerials(ids, status) {
  return axios.post(`${SELLDOCUMENTDETAILSERIALS_URL}/updateStatusForSellDocumentDetailSerials`, {
    ids,
    status,
  });
}
// DELETE = the sellDocumentDetailSerials from the server  
export function deleteSellDocumentDetailSerial(sellDocumentDetailSerialsId) {
  return axios.delete(`${SELLDOCUMENTDETAILSERIALS_URL}/delete/${sellDocumentDetailSerialsId}`);
}
// DELETE SellDocumentDetailSerials by ids  
export function deleteSellDocumentDetailSerials(ids) {
return axios.post(`${SELLDOCUMENTDETAILSERIALS_URL}/deleteSellDocumentDetailSerials`, ids);
}