
import axios from "axios";
export const ACCOUNTFLOATINGGROUPS_URL = "AccountFloatingGroup";
// CREATE = add a new accountFloatingGroups to the server 
export function createAccountFloatingGroup(accountFloatingGroups) { 
  return axios.post(`${ACCOUNTFLOATINGGROUPS_URL}/post`, accountFloatingGroups); 
}
// READ  
export function getAllAccountFloatingGroups() {
  return axios.get(`${ACCOUNTFLOATINGGROUPS_URL}/getAll`);
}
export function getAccountFloatingGroupById(accountFloatingGroupsId) {
  return axios.get(`${ACCOUNTFLOATINGGROUPS_URL}/get/${accountFloatingGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAccountFloatingGroups(queryParams) {
  return axios.post(`${ACCOUNTFLOATINGGROUPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAccountFloatingGroup(id, accountFloatingGroups) {
  return axios.put(`${ACCOUNTFLOATINGGROUPS_URL}/put/${id}`, accountFloatingGroups);
}
// UPDATE Status  
export function updateStatusForAccountFloatingGroups(ids, status) {
  return axios.post(`${ACCOUNTFLOATINGGROUPS_URL}/updateStatusForAccountFloatingGroups`, {
    ids,
    status,
  });
}
// DELETE = the accountFloatingGroups from the server  
export function deleteAccountFloatingGroup(accountFloatingGroupsId) {
  return axios.delete(`${ACCOUNTFLOATINGGROUPS_URL}/delete/${accountFloatingGroupsId}`);
}
// DELETE AccountFloatingGroups by ids  
export function deleteAccountFloatingGroups(ids) {
return axios.post(`${ACCOUNTFLOATINGGROUPS_URL}/deleteAccountFloatingGroups`, ids);
}