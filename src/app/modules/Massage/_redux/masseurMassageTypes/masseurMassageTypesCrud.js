
import axios from "axios";
export const MASSEURMASSAGETYPES_URL = "MasseurMassageType";
// CREATE = add a new masseurMassageTypes to the server 
export function createMasseurMassageType(masseurMassageTypes) { 
  return axios.post(`${MASSEURMASSAGETYPES_URL}/post`, masseurMassageTypes); 
}
// READ  
export function getAllMasseurMassageTypes() {
  return axios.get(`${MASSEURMASSAGETYPES_URL}/get`);
}
export function getMasseurMassageTypeById(masseurMassageTypesId) {
  return axios.get(`${MASSEURMASSAGETYPES_URL}/get/${masseurMassageTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMasseurMassageTypes(queryParams) {
  return axios.post(`${MASSEURMASSAGETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMasseurMassageType(id, masseurMassageTypes) {
  return axios.put(`${MASSEURMASSAGETYPES_URL}/put/${id}`, masseurMassageTypes);
}
// UPDATE Status  
export function updateStatusForMasseurMassageTypes(ids, status) {
  return axios.post(`${MASSEURMASSAGETYPES_URL}/updateStatusForMasseurMassageTypes`, {
    ids,
    status,
  });
}
// DELETE = the masseurMassageTypes from the server  
export function deleteMasseurMassageType(masseurMassageTypesId) {
  return axios.delete(`${MASSEURMASSAGETYPES_URL}/delete/${masseurMassageTypesId}`);
}
// DELETE MasseurMassageTypes by ids  
export function deleteMasseurMassageTypes(ids) {
return axios.post(`${MASSEURMASSAGETYPES_URL}/deleteMasseurMassageTypes`, ids);
}