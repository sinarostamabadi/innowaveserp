
import axios from "axios";
export const ORGANIZATIONUNITS_URL = "OrganizationUnit";
// CREATE = add a new organizationUnits to the server 
export function createOrganizationUnit(organizationUnits) { 
  return axios.post(`${ORGANIZATIONUNITS_URL}/post`, organizationUnits); 
}
// READ  
export function getAllOrganizationUnits() {
  return axios.get(`${ORGANIZATIONUNITS_URL}/get`);
}
export function getOrganizationUnitById(organizationUnitsId) {
  return axios.get(`${ORGANIZATIONUNITS_URL}/get/${organizationUnitsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findOrganizationUnits(queryParams) {
  return axios.post(`${ORGANIZATIONUNITS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateOrganizationUnit(id, organizationUnits) {
  return axios.put(`${ORGANIZATIONUNITS_URL}/put/${id}`, organizationUnits);
}
// UPDATE Status  
export function updateStatusForOrganizationUnits(ids, status) {
  return axios.post(`${ORGANIZATIONUNITS_URL}/updateStatusForOrganizationUnits`, {
    ids,
    status,
  });
}
// DELETE = the organizationUnits from the server  
export function deleteOrganizationUnit(organizationUnitsId) {
  return axios.delete(`${ORGANIZATIONUNITS_URL}/delete/${organizationUnitsId}`);
}
// DELETE OrganizationUnits by ids  
export function deleteOrganizationUnits(ids) {
return axios.post(`${ORGANIZATIONUNITS_URL}/deleteOrganizationUnits`, ids);
}