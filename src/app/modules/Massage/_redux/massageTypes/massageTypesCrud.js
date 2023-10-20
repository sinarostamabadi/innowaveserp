
import axios from "axios";
export const MASSAGETYPES_URL = "MassageType";
// CREATE = add a new massageTypes to the server 
export function createMassageType(massageTypes) { 
  return axios.post(`${MASSAGETYPES_URL}/post`, massageTypes); 
}
// READ  
export function getAllMassageTypes() {
  return axios.get(`${MASSAGETYPES_URL}/get`);
}
export function getMassageTypeById(massageTypesId) {
  return axios.get(`${MASSAGETYPES_URL}/get/${massageTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMassageTypes(queryParams) {
  return axios.post(`${MASSAGETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMassageType(id, massageTypes) {
  return axios.put(`${MASSAGETYPES_URL}/put/${id}`, massageTypes);
}
// UPDATE Status  
export function updateStatusForMassageTypes(ids, status) {
  return axios.post(`${MASSAGETYPES_URL}/updateStatusForMassageTypes`, {
    ids,
    status,
  });
}
// DELETE = the massageTypes from the server  
export function deleteMassageType(massageTypesId) {
  return axios.delete(`${MASSAGETYPES_URL}/delete/${massageTypesId}`);
}
// DELETE MassageTypes by ids  
export function deleteMassageTypes(ids) {
return axios.post(`${MASSAGETYPES_URL}/deleteMassageTypes`, ids);
}