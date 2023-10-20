
import axios from "axios";
export const ACCOUNTTYPES_URL = "AccountType";
// CREATE = add a new accountTypes to the server 
export function createAccountType(accountTypes) { 
  return axios.post(`${ACCOUNTTYPES_URL}/post`, accountTypes); 
}
// READ  
export function getAllAccountTypes() {
  return axios.get(`${ACCOUNTTYPES_URL}/getAll`);
}
export function getAccountTypeById(accountTypesId) {
  return axios.get(`${ACCOUNTTYPES_URL}/get/${accountTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAccountTypes(queryParams) {
  return axios.post(`${ACCOUNTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAccountType(id, accountTypes) {
  return axios.put(`${ACCOUNTTYPES_URL}/put/${id}`, accountTypes);
}
// UPDATE Status  
export function updateStatusForAccountTypes(ids, status) {
  return axios.post(`${ACCOUNTTYPES_URL}/updateStatusForAccountTypes`, {
    ids,
    status,
  });
}
// DELETE = the accountTypes from the server  
export function deleteAccountType(accountTypesId) {
  return axios.delete(`${ACCOUNTTYPES_URL}/delete/${accountTypesId}`);
}
// DELETE AccountTypes by ids  
export function deleteAccountTypes(ids) {
return axios.post(`${ACCOUNTTYPES_URL}/deleteAccountTypes`, ids);
}