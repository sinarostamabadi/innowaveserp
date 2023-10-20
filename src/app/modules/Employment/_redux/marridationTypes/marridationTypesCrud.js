
import axios from "axios";
export const MARRIDATIONTYPES_URL = "MarridationType";
// CREATE = add a new marridationTypes to the server 
export function createMarridationType(marridationTypes) { 
  return axios.post(`${MARRIDATIONTYPES_URL}/post`, marridationTypes); 
}
// READ  
export function getAllMarridationTypes() {
  return axios.get(`${MARRIDATIONTYPES_URL}/get`);
}
export function getMarridationTypeById(marridationTypesId) {
  return axios.get(`${MARRIDATIONTYPES_URL}/get/${marridationTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMarridationTypes(queryParams) {
  return axios.post(`${MARRIDATIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMarridationType(id, marridationTypes) {
  return axios.put(`${MARRIDATIONTYPES_URL}/put/${id}`, marridationTypes);
}
// UPDATE Status  
export function updateStatusForMarridationTypes(ids, status) {
  return axios.post(`${MARRIDATIONTYPES_URL}/updateStatusForMarridationTypes`, {
    ids,
    status,
  });
}
// DELETE = the marridationTypes from the server  
export function deleteMarridationType(marridationTypesId) {
  return axios.delete(`${MARRIDATIONTYPES_URL}/delete/${marridationTypesId}`);
}
// DELETE MarridationTypes by ids  
export function deleteMarridationTypes(ids) {
return axios.post(`${MARRIDATIONTYPES_URL}/deleteMarridationTypes`, ids);
}