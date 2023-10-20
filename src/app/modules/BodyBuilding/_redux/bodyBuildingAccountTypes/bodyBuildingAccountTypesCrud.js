
import axios from "axios";
export const BODYBUILDINGACCOUNTTYPES_URL = "BodyBuildingAccountType";
// CREATE = add a new bodyBuildingAccountTypes to the server 
export function createBodyBuildingAccountType(bodyBuildingAccountTypes) { 
  return axios.post(`${BODYBUILDINGACCOUNTTYPES_URL}/post`, bodyBuildingAccountTypes); 
}
// READ  
export function getAllBodyBuildingAccountTypes() {
  return axios.get(`${BODYBUILDINGACCOUNTTYPES_URL}/get`);
}
export function getBodyBuildingAccountTypeById(bodyBuildingAccountTypesId) {
  return axios.get(`${BODYBUILDINGACCOUNTTYPES_URL}/get/${bodyBuildingAccountTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBodyBuildingAccountTypes(queryParams) {
  return axios.post(`${BODYBUILDINGACCOUNTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBodyBuildingAccountType(id, bodyBuildingAccountTypes) {
  return axios.put(`${BODYBUILDINGACCOUNTTYPES_URL}/put/${id}`, bodyBuildingAccountTypes);
}
// UPDATE Status  
export function updateStatusForBodyBuildingAccountTypes(ids, status) {
  return axios.post(`${BODYBUILDINGACCOUNTTYPES_URL}/updateStatusForBodyBuildingAccountTypes`, {
    ids,
    status,
  });
}
// DELETE = the bodyBuildingAccountTypes from the server  
export function deleteBodyBuildingAccountType(bodyBuildingAccountTypesId) {
  return axios.delete(`${BODYBUILDINGACCOUNTTYPES_URL}/delete/${bodyBuildingAccountTypesId}`);
}
// DELETE BodyBuildingAccountTypes by ids  
export function deleteBodyBuildingAccountTypes(ids) {
return axios.post(`${BODYBUILDINGACCOUNTTYPES_URL}/deleteBodyBuildingAccountTypes`, ids);
}