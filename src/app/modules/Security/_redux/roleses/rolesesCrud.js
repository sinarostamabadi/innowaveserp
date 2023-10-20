
import axios from "axios";
export const ROLESES_URL = "Roles";
// CREATE = add a new roleses to the server 
export function createRoles(roleses) { 
  return axios.post(`${ROLESES_URL}/post`, roleses); 
}
// READ  
export function getAllRoleses() {
  return axios.get(`${ROLESES_URL}/get`);
}
export function getRolesById(rolesesId) {
  return axios.get(`${ROLESES_URL}/get/${rolesesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRoleses(queryParams) {
  return axios.post(`${ROLESES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRoles(id, roleses) {
  return axios.put(`${ROLESES_URL}/put/${id}`, roleses);
}
// UPDATE Status  
export function updateStatusForRoleses(ids, status) {
  return axios.post(`${ROLESES_URL}/updateStatusForRoleses`, {
    ids,
    status,
  });
}
// DELETE = the roleses from the server  
export function deleteRoles(rolesesId) {
  return axios.delete(`${ROLESES_URL}/delete/${rolesesId}`);
}
// DELETE Roleses by ids  
export function deleteRoleses(ids) {
return axios.post(`${ROLESES_URL}/deleteRoleses`, ids);
}