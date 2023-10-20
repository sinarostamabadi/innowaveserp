
import axios from "axios";
export const IMPORTACCOUNTFLOATINGTEMPS_URL = "ImportAccountFloatingTemp";
// CREATE = add a new importAccountFloatingTemps to the server 
export function createImportAccountFloatingTemp(importAccountFloatingTemps) { 
  return axios.post(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/post`, importAccountFloatingTemps); 
}
// READ  
export function getAllImportAccountFloatingTemps() {
  return axios.get(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/get`);
}
export function getImportAccountFloatingTempById(importAccountFloatingTempsId) {
  return axios.get(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/get/${importAccountFloatingTempsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findImportAccountFloatingTemps(queryParams) {
  return axios.post(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateImportAccountFloatingTemp(id, importAccountFloatingTemps) {
  return axios.put(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/put/${id}`, importAccountFloatingTemps);
}
// UPDATE Status  
export function updateStatusForImportAccountFloatingTemps(ids, status) {
  return axios.post(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/updateStatusForImportAccountFloatingTemps`, {
    ids,
    status,
  });
}
// DELETE = the importAccountFloatingTemps from the server  
export function deleteImportAccountFloatingTemp(importAccountFloatingTempsId) {
  return axios.delete(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/delete/${importAccountFloatingTempsId}`);
}
// DELETE ImportAccountFloatingTemps by ids  
export function deleteImportAccountFloatingTemps(ids) {
return axios.post(`${IMPORTACCOUNTFLOATINGTEMPS_URL}/deleteImportAccountFloatingTemps`, ids);
}