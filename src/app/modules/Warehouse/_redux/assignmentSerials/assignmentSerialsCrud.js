
import axios from "axios";
export const ASSIGNMENTSERIALS_URL = "AssignmentSerial";
// CREATE = add a new assignmentSerials to the server 
export function createAssignmentSerial(assignmentSerials) { 
  return axios.post(`${ASSIGNMENTSERIALS_URL}/post`, assignmentSerials); 
}
// READ  
export function getAllAssignmentSerials() {
  return axios.get(`${ASSIGNMENTSERIALS_URL}/get`);
}
export function getAssignmentSerialById(assignmentSerialsId) {
  return axios.get(`${ASSIGNMENTSERIALS_URL}/get/${assignmentSerialsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAssignmentSerials(queryParams) {
  return axios.post(`${ASSIGNMENTSERIALS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAssignmentSerial(id, assignmentSerials) {
  return axios.put(`${ASSIGNMENTSERIALS_URL}/put/${id}`, assignmentSerials);
}
// UPDATE Status  
export function updateStatusForAssignmentSerials(ids, status) {
  return axios.post(`${ASSIGNMENTSERIALS_URL}/updateStatusForAssignmentSerials`, {
    ids,
    status,
  });
}
// DELETE = the assignmentSerials from the server  
export function deleteAssignmentSerial(assignmentSerialsId) {
  return axios.delete(`${ASSIGNMENTSERIALS_URL}/delete/${assignmentSerialsId}`);
}
// DELETE AssignmentSerials by ids  
export function deleteAssignmentSerials(ids) {
return axios.post(`${ASSIGNMENTSERIALS_URL}/deleteAssignmentSerials`, ids);
}