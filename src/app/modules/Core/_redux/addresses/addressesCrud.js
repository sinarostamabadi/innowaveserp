import axios from "axios";
export const ADDRESSES_URL = "Address";
// CREATE = add a new addresses to the server 
export function createAddress(addresses) { 
  return axios.post(`${ADDRESSES_URL}/post`, addresses); 
}
// READ  
export function getAllAddresses() {
  return axios.get(`${ADDRESSES_URL}/get`);
}
export function getAddressById(addressesId) {
  return axios.get(`${ADDRESSES_URL}/${addressesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAddresses(queryParams) {
  return axios.post(`${ADDRESSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAddress(addresses) {
  return axios.put(`${ADDRESSES_URL}`, addresses);
}
// UPDATE Status  
export function updateStatusForAddresses(ids, status) {
  return axios.post(`${ADDRESSES_URL}/updateStatusForAddresses`, {
    ids,
    status,
  });
}
// DELETE = the addresses from the server  
export function deleteAddress(addressesId) {
  return axios.delete(`${ADDRESSES_URL}/${addressesId}`);
}
// DELETE Addresses by ids  
export function deleteAddresses(ids) {
return axios.post(`${ADDRESSES_URL}/deleteAddresses`, ids);
}
