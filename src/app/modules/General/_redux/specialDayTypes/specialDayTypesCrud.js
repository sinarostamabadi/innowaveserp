
import axios from "axios";
export const SPECIALDAYTYPES_URL = "SpecialDayType";
// CREATE = add a new specialDayTypes to the server 
export function createSpecialDayType(specialDayTypes) { 
  return axios.post(`${SPECIALDAYTYPES_URL}/post`, specialDayTypes); 
}
// READ  
export function getAllSpecialDayTypes() {
  return axios.get(`${SPECIALDAYTYPES_URL}/getall`);
}
export function getSpecialDayTypeById(specialDayTypesId) {
  return axios.get(`${SPECIALDAYTYPES_URL}/get/${specialDayTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSpecialDayTypes(queryParams) {
  return axios.post(`${SPECIALDAYTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSpecialDayType(id, specialDayTypes) {
  return axios.put(`${SPECIALDAYTYPES_URL}/put/${id}`, specialDayTypes);
}
// UPDATE Status  
export function updateStatusForSpecialDayTypes(ids, status) {
  return axios.post(`${SPECIALDAYTYPES_URL}/updateStatusForSpecialDayTypes`, {
    ids,
    status,
  });
}
// DELETE = the specialDayTypes from the server  
export function deleteSpecialDayType(specialDayTypesId) {
  return axios.delete(`${SPECIALDAYTYPES_URL}/delete/${specialDayTypesId}`);
}
// DELETE SpecialDayTypes by ids  
export function deleteSpecialDayTypes(ids) {
return axios.post(`${SPECIALDAYTYPES_URL}/deleteSpecialDayTypes`, ids);
}