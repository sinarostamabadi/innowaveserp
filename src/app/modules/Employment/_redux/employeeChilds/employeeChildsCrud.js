
import axios from "axios";
export const EMPLOYEECHILDS_URL = "EmployeeChild";
// CREATE = add a new employeeChilds to the server 
export function createEmployeeChild(employeeChilds) { 
  return axios.post(`${EMPLOYEECHILDS_URL}/post`, employeeChilds); 
}
// READ  
export function getAllEmployeeChilds() {
  return axios.get(`${EMPLOYEECHILDS_URL}/get`);
}
export function getEmployeeChildById(employeeChildsId) {
  return axios.get(`${EMPLOYEECHILDS_URL}/get/${employeeChildsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeChilds(queryParams) {
  return axios.post(`${EMPLOYEECHILDS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeChild(id, employeeChilds) {
  return axios.put(`${EMPLOYEECHILDS_URL}/put/${id}`, employeeChilds);
}
// UPDATE Status  
export function updateStatusForEmployeeChilds(ids, status) {
  return axios.post(`${EMPLOYEECHILDS_URL}/updateStatusForEmployeeChilds`, {
    ids,
    status,
  });
}
// DELETE = the employeeChilds from the server  
export function deleteEmployeeChild(employeeChildsId) {
  return axios.delete(`${EMPLOYEECHILDS_URL}/delete/${employeeChildsId}`);
}
// DELETE EmployeeChilds by ids  
export function deleteEmployeeChilds(ids) {
return axios.post(`${EMPLOYEECHILDS_URL}/deleteEmployeeChilds`, ids);
}