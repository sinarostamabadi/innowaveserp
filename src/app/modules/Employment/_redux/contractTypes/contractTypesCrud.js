
import axios from "axios";
export const CONTRACTTYPES_URL = "ContractType";
// CREATE = add a new contractTypes to the server 
export function createContractType(contractTypes) { 
  return axios.post(`${CONTRACTTYPES_URL}/post`, contractTypes); 
}
// READ  
export function getAllContractTypes() {
  return axios.get(`${CONTRACTTYPES_URL}/get`);
}
export function getContractTypeById(contractTypesId) {
  return axios.get(`${CONTRACTTYPES_URL}/get/${contractTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findContractTypes(queryParams) {
  return axios.post(`${CONTRACTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateContractType(id, contractTypes) {
  return axios.put(`${CONTRACTTYPES_URL}/put/${id}`, contractTypes);
}
// UPDATE Status  
export function updateStatusForContractTypes(ids, status) {
  return axios.post(`${CONTRACTTYPES_URL}/updateStatusForContractTypes`, {
    ids,
    status,
  });
}
// DELETE = the contractTypes from the server  
export function deleteContractType(contractTypesId) {
  return axios.delete(`${CONTRACTTYPES_URL}/delete/${contractTypesId}`);
}
// DELETE ContractTypes by ids  
export function deleteContractTypes(ids) {
return axios.post(`${CONTRACTTYPES_URL}/deleteContractTypes`, ids);
}