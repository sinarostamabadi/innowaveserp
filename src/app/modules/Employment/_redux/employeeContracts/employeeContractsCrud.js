
import axios from "axios";
export const EMPLOYEECONTRACTS_URL = "EmployeeContract";
// CREATE = add a new employeeContracts to the server 
export function createEmployeeContract(employeeContracts) { 
  return axios.post(`${EMPLOYEECONTRACTS_URL}/post`, employeeContracts); 
}
// READ  
export function getAllEmployeeContracts() {
  return axios.get(`${EMPLOYEECONTRACTS_URL}/get`);
}
export function getEmployeeContractById(employeeContractsId) {
  return axios.get(`${EMPLOYEECONTRACTS_URL}/get/${employeeContractsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeContracts(queryParams) {
  return axios.post(`${EMPLOYEECONTRACTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeContract(id, employeeContracts) {
  return axios.put(`${EMPLOYEECONTRACTS_URL}/put/${id}`, employeeContracts);
}
// UPDATE Status  
export function updateStatusForEmployeeContracts(ids, status) {
  return axios.post(`${EMPLOYEECONTRACTS_URL}/updateStatusForEmployeeContracts`, {
    ids,
    status,
  });
}
// DELETE = the employeeContracts from the server  
export function deleteEmployeeContract(employeeContractsId) {
  return axios.delete(`${EMPLOYEECONTRACTS_URL}/delete/${employeeContractsId}`);
}
// DELETE EmployeeContracts by ids  
export function deleteEmployeeContracts(ids) {
return axios.post(`${EMPLOYEECONTRACTS_URL}/deleteEmployeeContracts`, ids);
}