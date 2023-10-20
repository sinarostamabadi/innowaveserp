
import axios from "axios";
export const IMPORTXMLKEIES_URL = "ImportXMLKey";
// CREATE = add a new importXMLKeies to the server 
export function createImportXMLKey(importXMLKeies) { 
  return axios.post(`${IMPORTXMLKEIES_URL}/post`, importXMLKeies); 
}
// READ  
export function getAllImportXMLKeies() {
  return axios.get(`${IMPORTXMLKEIES_URL}/get`);
}
export function getImportXMLKeyById(importXMLKeiesId) {
  return axios.get(`${IMPORTXMLKEIES_URL}/get/${importXMLKeiesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findImportXMLKeies(queryParams) {
  return axios.post(`${IMPORTXMLKEIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateImportXMLKey(id, importXMLKeies) {
  return axios.put(`${IMPORTXMLKEIES_URL}/put/${id}`, importXMLKeies);
}
// UPDATE Status  
export function updateStatusForImportXMLKeies(ids, status) {
  return axios.post(`${IMPORTXMLKEIES_URL}/updateStatusForImportXMLKeies`, {
    ids,
    status,
  });
}
// DELETE = the importXMLKeies from the server  
export function deleteImportXMLKey(importXMLKeiesId) {
  return axios.delete(`${IMPORTXMLKEIES_URL}/delete/${importXMLKeiesId}`);
}
// DELETE ImportXMLKeies by ids  
export function deleteImportXMLKeies(ids) {
return axios.post(`${IMPORTXMLKEIES_URL}/deleteImportXMLKeies`, ids);
}