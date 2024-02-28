import axios from "axios";
export const EMPLOYEEINSURANCES_URL = "EmployeeInsurance";
// CREATE = add a new employeeInsurances to the server
export function createEmployeeInsurance(employeeInsurances) {
  return axios.post(`${EMPLOYEEINSURANCES_URL}/post`, employeeInsurances);
}
// READ
export function getAllEmployeeInsurances() {
  return axios.get(`${EMPLOYEEINSURANCES_URL}/get`);
}
export function getEmployeeInsuranceById(employeeInsurancesId) {
  return axios.get(`${EMPLOYEEINSURANCES_URL}/get/${employeeInsurancesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeInsurances(queryParams) {
  return axios.post(`${EMPLOYEEINSURANCES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeInsurance(id, employeeInsurances) {
  return axios.put(`${EMPLOYEEINSURANCES_URL}/put/${id}`, employeeInsurances);
}
// UPDATE Status
export function updateStatusForEmployeeInsurances(ids, status) {
  return axios.post(
    `${EMPLOYEEINSURANCES_URL}/updateStatusForEmployeeInsurances`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeInsurances from the server
export function deleteEmployeeInsurance(employeeInsurancesId) {
  return axios.delete(
    `${EMPLOYEEINSURANCES_URL}/delete/${employeeInsurancesId}`
  );
}
// DELETE EmployeeInsurances by ids
export function deleteEmployeeInsurances(ids) {
  return axios.post(`${EMPLOYEEINSURANCES_URL}/deleteEmployeeInsurances`, ids);
}
