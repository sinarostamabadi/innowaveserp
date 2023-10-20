
import axios from "axios";
export const ASSIGNMENTS_URL = "Assignment";
// CREATE = add a new assignments to the server 
export function createAssignment(assignments) { 
  return axios.post(`${ASSIGNMENTS_URL}/post`, assignments); 
}
// READ  
export function getAllAssignments() {
  return axios.get(`${ASSIGNMENTS_URL}/get`);
}
export function getAssignmentById(assignmentsId) {
  return axios.get(`${ASSIGNMENTS_URL}/get/${assignmentsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAssignments(queryParams) {
  return axios.post(`${ASSIGNMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAssignment(id, assignments) {
  return axios.put(`${ASSIGNMENTS_URL}/put/${id}`, assignments);
}
// UPDATE Status  
export function updateStatusForAssignments(ids, status) {
  return axios.post(`${ASSIGNMENTS_URL}/updateStatusForAssignments`, {
    ids,
    status,
  });
}
// DELETE = the assignments from the server  
export function deleteAssignment(assignmentsId) {
  return axios.delete(`${ASSIGNMENTS_URL}/delete/${assignmentsId}`);
}
// DELETE Assignments by ids  
export function deleteAssignments(ids) {
return axios.post(`${ASSIGNMENTS_URL}/deleteAssignments`, ids);
}