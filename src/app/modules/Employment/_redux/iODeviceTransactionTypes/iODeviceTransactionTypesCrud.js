
import axios from "axios";
export const IODEVICETRANSACTIONTYPES_URL = "IODeviceTransactionType";
// CREATE = add a new iODeviceTransactionTypes to the server 
export function createIODeviceTransactionType(iODeviceTransactionTypes) { 
  return axios.post(`${IODEVICETRANSACTIONTYPES_URL}/post`, iODeviceTransactionTypes); 
}
// READ  
export function getAllIODeviceTransactionTypes() {
  return axios.get(`${IODEVICETRANSACTIONTYPES_URL}/get`);
}
export function getIODeviceTransactionTypeById(iODeviceTransactionTypesId) {
  return axios.get(`${IODEVICETRANSACTIONTYPES_URL}/get/${iODeviceTransactionTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findIODeviceTransactionTypes(queryParams) {
  return axios.post(`${IODEVICETRANSACTIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateIODeviceTransactionType(id, iODeviceTransactionTypes) {
  return axios.put(`${IODEVICETRANSACTIONTYPES_URL}/put/${id}`, iODeviceTransactionTypes);
}
// UPDATE Status  
export function updateStatusForIODeviceTransactionTypes(ids, status) {
  return axios.post(`${IODEVICETRANSACTIONTYPES_URL}/updateStatusForIODeviceTransactionTypes`, {
    ids,
    status,
  });
}
// DELETE = the iODeviceTransactionTypes from the server  
export function deleteIODeviceTransactionType(iODeviceTransactionTypesId) {
  return axios.delete(`${IODEVICETRANSACTIONTYPES_URL}/delete/${iODeviceTransactionTypesId}`);
}
// DELETE IODeviceTransactionTypes by ids  
export function deleteIODeviceTransactionTypes(ids) {
return axios.post(`${IODEVICETRANSACTIONTYPES_URL}/deleteIODeviceTransactionTypes`, ids);
}