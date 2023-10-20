
import axios from "axios";
export const ASSIGNMENTDTLS_URL = "AssignmentDtl";
// CREATE = add a new assignmentDtls to the server 
export function createAssignmentDtl(assignmentDtls) { 
  return axios.post(`${ASSIGNMENTDTLS_URL}/post`, assignmentDtls); 
}
// READ  
export function getAllAssignmentDtls() {
  return axios.get(`${ASSIGNMENTDTLS_URL}/get`);
}
export function getAssignmentDtlById(assignmentDtlsId) {
  return axios.get(`${ASSIGNMENTDTLS_URL}/get/${assignmentDtlsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAssignmentDtls(queryParams) {
  return axios.post(`${ASSIGNMENTDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAssignmentDtl(id, assignmentDtls) {
  return axios.put(`${ASSIGNMENTDTLS_URL}/put/${id}`, assignmentDtls);
}
// UPDATE Status  
export function updateStatusForAssignmentDtls(ids, status) {
  return axios.post(`${ASSIGNMENTDTLS_URL}/updateStatusForAssignmentDtls`, {
    ids,
    status,
  });
}
// DELETE = the assignmentDtls from the server  
export function deleteAssignmentDtl(assignmentDtlsId) {
  return axios.delete(`${ASSIGNMENTDTLS_URL}/delete/${assignmentDtlsId}`);
}
// DELETE AssignmentDtls by ids  
export function deleteAssignmentDtls(ids) {
return axios.post(`${ASSIGNMENTDTLS_URL}/deleteAssignmentDtls`, ids);
}