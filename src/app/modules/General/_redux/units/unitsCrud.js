
import axios from "axios";
export const UNITS_URL = "Unit";
// CREATE = add a new units to the server 
export function createUnit(units) { 
  return axios.post(`${UNITS_URL}/post`, units); 
}
// READ  
export function getAllUnits() {
  return axios.get(`${UNITS_URL}/getAll`);
}
export function getUnitById(unitsId) {
  return axios.get(`${UNITS_URL}/get/${unitsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findUnits(queryParams) {
  return axios.post(`${UNITS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateUnit(id, units) {
  return axios.put(`${UNITS_URL}/put/${id}`, units);
}
// UPDATE Status  
export function updateStatusForUnits(ids, status) {
  return axios.post(`${UNITS_URL}/updateStatusForUnits`, {
    ids,
    status,
  });
}
// DELETE = the units from the server  
export function deleteUnit(unitsId) {
  return axios.delete(`${UNITS_URL}/delete/${unitsId}`);
}
// DELETE Units by ids  
export function deleteUnits(ids) {
return axios.post(`${UNITS_URL}/deleteUnits`, ids);
}