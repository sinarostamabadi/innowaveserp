
import axios from "axios";
export const IMPORTDOCUMENTTEMPS_URL = "ImportDocumentTemp";
// CREATE = add a new importDocumentTemps to the server 
export function createImportDocumentTemp(importDocumentTemps) { 
  return axios.post(`${IMPORTDOCUMENTTEMPS_URL}/post`, importDocumentTemps); 
}
// READ  
export function getAllImportDocumentTemps() {
  return axios.get(`${IMPORTDOCUMENTTEMPS_URL}/get`);
}
export function getImportDocumentTempById(importDocumentTempsId) {
  return axios.get(`${IMPORTDOCUMENTTEMPS_URL}/get/${importDocumentTempsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findImportDocumentTemps(queryParams) {
  return axios.post(`${IMPORTDOCUMENTTEMPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateImportDocumentTemp(id, importDocumentTemps) {
  return axios.put(`${IMPORTDOCUMENTTEMPS_URL}/put/${id}`, importDocumentTemps);
}
// UPDATE Status  
export function updateStatusForImportDocumentTemps(ids, status) {
  return axios.post(`${IMPORTDOCUMENTTEMPS_URL}/updateStatusForImportDocumentTemps`, {
    ids,
    status,
  });
}
// DELETE = the importDocumentTemps from the server  
export function deleteImportDocumentTemp(importDocumentTempsId) {
  return axios.delete(`${IMPORTDOCUMENTTEMPS_URL}/delete/${importDocumentTempsId}`);
}
// DELETE ImportDocumentTemps by ids  
export function deleteImportDocumentTemps(ids) {
return axios.post(`${IMPORTDOCUMENTTEMPS_URL}/deleteImportDocumentTemps`, ids);
}