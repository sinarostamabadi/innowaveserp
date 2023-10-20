
import axios from "axios";
export const LEAVETYPES_URL = "LeaveType";
// CREATE = add a new leaveTypes to the server 
export function createLeaveType(leaveTypes) { 
  return axios.post(`${LEAVETYPES_URL}/post`, leaveTypes); 
}
// READ  
export function getAllLeaveTypes() {
  return axios.get(`${LEAVETYPES_URL}/get`);
}
export function getLeaveTypeById(leaveTypesId) {
  return axios.get(`${LEAVETYPES_URL}/get/${leaveTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findLeaveTypes(queryParams) {
  return axios.post(`${LEAVETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateLeaveType(id, leaveTypes) {
  return axios.put(`${LEAVETYPES_URL}/put/${id}`, leaveTypes);
}
// UPDATE Status  
export function updateStatusForLeaveTypes(ids, status) {
  return axios.post(`${LEAVETYPES_URL}/updateStatusForLeaveTypes`, {
    ids,
    status,
  });
}
// DELETE = the leaveTypes from the server  
export function deleteLeaveType(leaveTypesId) {
  return axios.delete(`${LEAVETYPES_URL}/delete/${leaveTypesId}`);
}
// DELETE LeaveTypes by ids  
export function deleteLeaveTypes(ids) {
return axios.post(`${LEAVETYPES_URL}/deleteLeaveTypes`, ids);
}