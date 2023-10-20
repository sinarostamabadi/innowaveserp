
import axios from "axios";
export const EMPLOYEEPROMISSORYNOTES_URL = "EmployeePromissoryNote";
// CREATE = add a new employeePromissoryNotes to the server 
export function createEmployeePromissoryNote(employeePromissoryNotes) { 
  return axios.post(`${EMPLOYEEPROMISSORYNOTES_URL}/post`, employeePromissoryNotes); 
}
// READ  
export function getAllEmployeePromissoryNotes() {
  return axios.get(`${EMPLOYEEPROMISSORYNOTES_URL}/get`);
}
export function getEmployeePromissoryNoteById(employeePromissoryNotesId) {
  return axios.get(`${EMPLOYEEPROMISSORYNOTES_URL}/get/${employeePromissoryNotesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeePromissoryNotes(queryParams) {
  return axios.post(`${EMPLOYEEPROMISSORYNOTES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeePromissoryNote(id, employeePromissoryNotes) {
  return axios.put(`${EMPLOYEEPROMISSORYNOTES_URL}/put/${id}`, employeePromissoryNotes);
}
// UPDATE Status  
export function updateStatusForEmployeePromissoryNotes(ids, status) {
  return axios.post(`${EMPLOYEEPROMISSORYNOTES_URL}/updateStatusForEmployeePromissoryNotes`, {
    ids,
    status,
  });
}
// DELETE = the employeePromissoryNotes from the server  
export function deleteEmployeePromissoryNote(employeePromissoryNotesId) {
  return axios.delete(`${EMPLOYEEPROMISSORYNOTES_URL}/delete/${employeePromissoryNotesId}`);
}
// DELETE EmployeePromissoryNotes by ids  
export function deleteEmployeePromissoryNotes(ids) {
return axios.post(`${EMPLOYEEPROMISSORYNOTES_URL}/deleteEmployeePromissoryNotes`, ids);
}