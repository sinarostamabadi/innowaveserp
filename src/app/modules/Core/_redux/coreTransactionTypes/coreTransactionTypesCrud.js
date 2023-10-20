import axios from "axios";
export const CORETRANSACTIONTYPES_URL = "CoreTransactionType";
// CREATE = add a new coreTransactionTypes to the server 
export function createCoreTransactionType(coreTransactionTypes) { 
  return axios.post(`${CORETRANSACTIONTYPES_URL}/post`, coreTransactionTypes); 
}
// READ  
export function getAllCoreTransactionTypes() {
  return axios.get(`${CORETRANSACTIONTYPES_URL}/get`);
}
export function getCoreTransactionTypeById(coreTransactionTypesId) {
  return axios.get(`${CORETRANSACTIONTYPES_URL}/${coreTransactionTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCoreTransactionTypes(queryParams) {
  return axios.post(`${CORETRANSACTIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCoreTransactionType(coreTransactionTypes) {
  return axios.put(`${CORETRANSACTIONTYPES_URL}`, coreTransactionTypes);
}
// UPDATE Status  
export function updateStatusForCoreTransactionTypes(ids, status) {
  return axios.post(`${CORETRANSACTIONTYPES_URL}/updateStatusForCoreTransactionTypes`, {
    ids,
    status,
  });
}
// DELETE = the coreTransactionTypes from the server  
export function deleteCoreTransactionType(coreTransactionTypesId) {
  return axios.delete(`${CORETRANSACTIONTYPES_URL}/${coreTransactionTypesId}`);
}
// DELETE CoreTransactionTypes by ids  
export function deleteCoreTransactionTypes(ids) {
return axios.post(`${CORETRANSACTIONTYPES_URL}/deleteCoreTransactionTypes`, ids);
}
