
import axios from "axios";
export const PACKAGETYPES_URL = "PackageType";
// CREATE = add a new packageTypes to the server 
export function createPackageType(packageTypes) { 
  return axios.post(`${PACKAGETYPES_URL}/post`, packageTypes); 
}
// READ  
export function getAllPackageTypes() {
  return axios.get(`${PACKAGETYPES_URL}/getAll`);
}
export function getPackageTypeById(packageTypesId) {
  return axios.get(`${PACKAGETYPES_URL}/get/${packageTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPackageTypes(queryParams) {
  return axios.post(`${PACKAGETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePackageType(id, packageTypes) {
  return axios.put(`${PACKAGETYPES_URL}/put/${id}`, packageTypes);
}
// UPDATE Status  
export function updateStatusForPackageTypes(ids, status) {
  return axios.post(`${PACKAGETYPES_URL}/updateStatusForPackageTypes`, {
    ids,
    status,
  });
}
// DELETE = the packageTypes from the server  
export function deletePackageType(packageTypesId) {
  return axios.delete(`${PACKAGETYPES_URL}/delete/${packageTypesId}`);
}
// DELETE PackageTypes by ids  
export function deletePackageTypes(ids) {
return axios.post(`${PACKAGETYPES_URL}/deletePackageTypes`, ids);
}