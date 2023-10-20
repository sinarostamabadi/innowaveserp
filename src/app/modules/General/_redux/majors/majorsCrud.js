
import axios from "axios";
export const MAJORS_URL = "Major";
// CREATE = add a new majors to the server 
export function createMajor(majors) { 
  return axios.post(`${MAJORS_URL}/post`, majors); 
}
// READ  
export function getAllMajors() {
  return axios.get(`${MAJORS_URL}/get`);
}
export function getMajorById(majorsId) {
  return axios.get(`${MAJORS_URL}/get/${majorsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMajors(queryParams) {
  return axios.post(`${MAJORS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMajor(id, majors) {
  return axios.put(`${MAJORS_URL}/put/${id}`, majors);
}
// UPDATE Status  
export function updateStatusForMajors(ids, status) {
  return axios.post(`${MAJORS_URL}/updateStatusForMajors`, {
    ids,
    status,
  });
}
// DELETE = the majors from the server  
export function deleteMajor(majorsId) {
  return axios.delete(`${MAJORS_URL}/delete/${majorsId}`);
}
// DELETE Majors by ids  
export function deleteMajors(ids) {
return axios.post(`${MAJORS_URL}/deleteMajors`, ids);
}