
import axios from "axios";
export const ACCOUNTFLOATINGGROUPTYPES_URL = "AccountFloatingGroupType";
// CREATE = add a new accountFloatingGroupTypes to the server 
export function createAccountFloatingGroupType(accountFloatingGroupTypes) { 
  return axios.post(`${ACCOUNTFLOATINGGROUPTYPES_URL}/post`, accountFloatingGroupTypes); 
}
// READ  
export function getAllAccountFloatingGroupTypes() {
  return axios.get(`${ACCOUNTFLOATINGGROUPTYPES_URL}/get`);
}
export function getAccountFloatingGroupTypeById(accountFloatingGroupTypesId) {
  return axios.get(`${ACCOUNTFLOATINGGROUPTYPES_URL}/get/${accountFloatingGroupTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAccountFloatingGroupTypes(queryParams) {
  return axios.post(`${ACCOUNTFLOATINGGROUPTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAccountFloatingGroupType(id, accountFloatingGroupTypes) {
  return axios.put(`${ACCOUNTFLOATINGGROUPTYPES_URL}/put/${id}`, accountFloatingGroupTypes);
}
// UPDATE Status  
export function updateStatusForAccountFloatingGroupTypes(ids, status) {
  return axios.post(`${ACCOUNTFLOATINGGROUPTYPES_URL}/updateStatusForAccountFloatingGroupTypes`, {
    ids,
    status,
  });
}
// DELETE = the accountFloatingGroupTypes from the server  
export function deleteAccountFloatingGroupType(accountFloatingGroupTypesId) {
  return axios.delete(`${ACCOUNTFLOATINGGROUPTYPES_URL}/delete/${accountFloatingGroupTypesId}`);
}
// DELETE AccountFloatingGroupTypes by ids  
export function deleteAccountFloatingGroupTypes(ids) {
return axios.post(`${ACCOUNTFLOATINGGROUPTYPES_URL}/deleteAccountFloatingGroupTypes`, ids);
}