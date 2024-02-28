import axios from "axios";
export const EMPLOYEEREWARDPENALTIES_URL = "EmployeeRewardPenalty";
// CREATE = add a new employeeRewardPenalties to the server
export function createEmployeeRewardPenalty(employeeRewardPenalties) {
  return axios.post(
    `${EMPLOYEEREWARDPENALTIES_URL}/post`,
    employeeRewardPenalties
  );
}
// READ
export function getAllEmployeeRewardPenalties() {
  return axios.get(`${EMPLOYEEREWARDPENALTIES_URL}/get`);
}
export function getEmployeeRewardPenaltyById(employeeRewardPenaltiesId) {
  return axios.get(
    `${EMPLOYEEREWARDPENALTIES_URL}/get/${employeeRewardPenaltiesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeRewardPenalties(queryParams) {
  return axios.post(`${EMPLOYEEREWARDPENALTIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeRewardPenalty(id, employeeRewardPenalties) {
  return axios.put(
    `${EMPLOYEEREWARDPENALTIES_URL}/put/${id}`,
    employeeRewardPenalties
  );
}
// UPDATE Status
export function updateStatusForEmployeeRewardPenalties(ids, status) {
  return axios.post(
    `${EMPLOYEEREWARDPENALTIES_URL}/updateStatusForEmployeeRewardPenalties`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeRewardPenalties from the server
export function deleteEmployeeRewardPenalty(employeeRewardPenaltiesId) {
  return axios.delete(
    `${EMPLOYEEREWARDPENALTIES_URL}/delete/${employeeRewardPenaltiesId}`
  );
}
// DELETE EmployeeRewardPenalties by ids
export function deleteEmployeeRewardPenalties(ids) {
  return axios.post(
    `${EMPLOYEEREWARDPENALTIES_URL}/deleteEmployeeRewardPenalties`,
    ids
  );
}
