import axios from "axios";
export const PHONES_URL = "Phone";
// CREATE = add a new phones to the server 
export function createPhone(phones) { 
  return axios.post(`${PHONES_URL}/post`, phones); 
}
// READ  
export function getAllPhones() {
  return axios.get(`${PHONES_URL}/get`);
}
export function getPhoneById(phonesId) {
  return axios.get(`${PHONES_URL}/${phonesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPhones(queryParams) {
  return axios.post(`${PHONES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePhone(phones) {
  return axios.put(`${PHONES_URL}`, phones);
}
// UPDATE Status  
export function updateStatusForPhones(ids, status) {
  return axios.post(`${PHONES_URL}/updateStatusForPhones`, {
    ids,
    status,
  });
}
// DELETE = the phones from the server  
export function deletePhone(phonesId) {
  return axios.delete(`${PHONES_URL}/${phonesId}`);
}
// DELETE Phones by ids  
export function deletePhones(ids) {
return axios.post(`${PHONES_URL}/deletePhones`, ids);
}
