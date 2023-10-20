
import axios from "axios";
export const WORKSHIFTS_URL = "WorkShift";
// CREATE = add a new workShifts to the server 
export function createWorkShift(workShifts) { 
  return axios.post(`${WORKSHIFTS_URL}/post`, workShifts); 
}
// READ  
export function getAllWorkShifts() {
  return axios.get(`${WORKSHIFTS_URL}/get`);
}
export function getWorkShiftById(workShiftsId) {
  return axios.get(`${WORKSHIFTS_URL}/get/${workShiftsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findWorkShifts(queryParams) {
  return axios.post(`${WORKSHIFTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateWorkShift(id, workShifts) {
  return axios.put(`${WORKSHIFTS_URL}/put/${id}`, workShifts);
}
// UPDATE Status  
export function updateStatusForWorkShifts(ids, status) {
  return axios.post(`${WORKSHIFTS_URL}/updateStatusForWorkShifts`, {
    ids,
    status,
  });
}
// DELETE = the workShifts from the server  
export function deleteWorkShift(workShiftsId) {
  return axios.delete(`${WORKSHIFTS_URL}/delete/${workShiftsId}`);
}
// DELETE WorkShifts by ids  
export function deleteWorkShifts(ids) {
return axios.post(`${WORKSHIFTS_URL}/deleteWorkShifts`, ids);
}