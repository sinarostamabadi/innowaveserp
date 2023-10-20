
import axios from "axios";
export const CODING_URL = "Coding";
// CREATE = add a new coding to the server 
export function createCoding(coding) { 
  return axios.post(`${CODING_URL}/post`, coding); 
}
// READ  
export function getAllCoding() {
  return axios.get(`${CODING_URL}/get`);
}
export function getCodingById(codingId) {
  return axios.get(`${CODING_URL}/get/${codingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCoding(queryParams) {
  return axios.post(`${CODING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCoding(id, coding) {
  return axios.put(`${CODING_URL}/put/${id}`, coding);
}
// UPDATE Status  
export function updateStatusForCoding(ids, status) {
  return axios.post(`${CODING_URL}/updateStatusForCoding`, {
    ids,
    status,
  });
}
// DELETE = the coding from the server  
export function deleteCoding(codingId) {
  return axios.delete(`${CODING_URL}/delete/${codingId}`);
}
// DELETE Coding by ids  
export function deleteCoding(ids) {
return axios.post(`${CODING_URL}/deleteCoding`, ids);
}