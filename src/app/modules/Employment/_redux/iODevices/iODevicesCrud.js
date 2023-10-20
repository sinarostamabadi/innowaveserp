
import axios from "axios";
export const IODEVICES_URL = "IODevice";
// CREATE = add a new iODevices to the server 
export function createIODevice(iODevices) { 
  return axios.post(`${IODEVICES_URL}/post`, iODevices); 
}
// READ  
export function getAllIODevices() {
  return axios.get(`${IODEVICES_URL}/get`);
}
export function getIODeviceById(iODevicesId) {
  return axios.get(`${IODEVICES_URL}/get/${iODevicesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findIODevices(queryParams) {
  return axios.post(`${IODEVICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateIODevice(id, iODevices) {
  return axios.put(`${IODEVICES_URL}/put/${id}`, iODevices);
}
// UPDATE Status  
export function updateStatusForIODevices(ids, status) {
  return axios.post(`${IODEVICES_URL}/updateStatusForIODevices`, {
    ids,
    status,
  });
}
// DELETE = the iODevices from the server  
export function deleteIODevice(iODevicesId) {
  return axios.delete(`${IODEVICES_URL}/delete/${iODevicesId}`);
}
// DELETE IODevices by ids  
export function deleteIODevices(ids) {
return axios.post(`${IODEVICES_URL}/deleteIODevices`, ids);
}