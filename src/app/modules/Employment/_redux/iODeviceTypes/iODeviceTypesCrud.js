
import axios from "axios";
export const IODEVICETYPES_URL = "IODeviceType";
// CREATE = add a new iODeviceTypes to the server 
export function createIODeviceType(iODeviceTypes) { 
  return axios.post(`${IODEVICETYPES_URL}/post`, iODeviceTypes); 
}
// READ  
export function getAllIODeviceTypes() {
  return axios.get(`${IODEVICETYPES_URL}/get`);
}
export function getIODeviceTypeById(iODeviceTypesId) {
  return axios.get(`${IODEVICETYPES_URL}/get/${iODeviceTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findIODeviceTypes(queryParams) {
  return axios.post(`${IODEVICETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateIODeviceType(id, iODeviceTypes) {
  return axios.put(`${IODEVICETYPES_URL}/put/${id}`, iODeviceTypes);
}
// UPDATE Status  
export function updateStatusForIODeviceTypes(ids, status) {
  return axios.post(`${IODEVICETYPES_URL}/updateStatusForIODeviceTypes`, {
    ids,
    status,
  });
}
// DELETE = the iODeviceTypes from the server  
export function deleteIODeviceType(iODeviceTypesId) {
  return axios.delete(`${IODEVICETYPES_URL}/delete/${iODeviceTypesId}`);
}
// DELETE IODeviceTypes by ids  
export function deleteIODeviceTypes(ids) {
return axios.post(`${IODEVICETYPES_URL}/deleteIODeviceTypes`, ids);
}