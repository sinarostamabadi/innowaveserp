
import axios from "axios";
export const IMPORTACCOUNTTEMPS_URL = "ImportAccountTemp";
// CREATE = add a new importAccountTemps to the server 
export function createImportAccountTemp(importAccountTemps) { 
  return axios.post(`${IMPORTACCOUNTTEMPS_URL}/post`, importAccountTemps); 
}
// READ  
export function getAllImportAccountTemps() {
  return axios.get(`${IMPORTACCOUNTTEMPS_URL}/get`);
}
export function getImportAccountTempById(importAccountTempsId) {
  return axios.get(`${IMPORTACCOUNTTEMPS_URL}/get/${importAccountTempsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findImportAccountTemps(queryParams) {
  return axios.post(`${IMPORTACCOUNTTEMPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateImportAccountTemp(id, importAccountTemps) {
  return axios.put(`${IMPORTACCOUNTTEMPS_URL}/put/${id}`, importAccountTemps);
}
// UPDATE Status  
export function updateStatusForImportAccountTemps(ids, status) {
  return axios.post(`${IMPORTACCOUNTTEMPS_URL}/updateStatusForImportAccountTemps`, {
    ids,
    status,
  });
}
// DELETE = the importAccountTemps from the server  
export function deleteImportAccountTemp(importAccountTempsId) {
  return axios.delete(`${IMPORTACCOUNTTEMPS_URL}/delete/${importAccountTempsId}`);
}
// DELETE ImportAccountTemps by ids  
export function deleteImportAccountTemps(ids) {
return axios.post(`${IMPORTACCOUNTTEMPS_URL}/deleteImportAccountTemps`, ids);
}