
import axios from "axios";
export const WORKSHIFTCALENDERS_URL = "WorkShiftCalender";
// CREATE = add a new workShiftCalenders to the server 
export function createWorkShiftCalender(workShiftCalenders) { 
  return axios.post(`${WORKSHIFTCALENDERS_URL}/post`, workShiftCalenders); 
}
// READ  
export function getAllWorkShiftCalenders() {
  return axios.get(`${WORKSHIFTCALENDERS_URL}/get`);
}
export function getWorkShiftCalenderById(workShiftCalendersId) {
  return axios.get(`${WORKSHIFTCALENDERS_URL}/get/${workShiftCalendersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findWorkShiftCalenders(queryParams) {
  return axios.post(`${WORKSHIFTCALENDERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateWorkShiftCalender(id, workShiftCalenders) {
  return axios.put(`${WORKSHIFTCALENDERS_URL}/put/${id}`, workShiftCalenders);
}
// UPDATE Status  
export function updateStatusForWorkShiftCalenders(ids, status) {
  return axios.post(`${WORKSHIFTCALENDERS_URL}/updateStatusForWorkShiftCalenders`, {
    ids,
    status,
  });
}
// DELETE = the workShiftCalenders from the server  
export function deleteWorkShiftCalender(workShiftCalendersId) {
  return axios.delete(`${WORKSHIFTCALENDERS_URL}/delete/${workShiftCalendersId}`);
}
// DELETE WorkShiftCalenders by ids  
export function deleteWorkShiftCalenders(ids) {
return axios.post(`${WORKSHIFTCALENDERS_URL}/deleteWorkShiftCalenders`, ids);
}