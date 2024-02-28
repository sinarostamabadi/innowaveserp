import axios from "axios";
export const EMPLOYEEWORKEXPERIENCES_URL = "EmployeeWorkExperience";
// CREATE = add a new employeeWorkExperiences to the server
export function createEmployeeWorkExperience(employeeWorkExperiences) {
  return axios.post(
    `${EMPLOYEEWORKEXPERIENCES_URL}/post`,
    employeeWorkExperiences
  );
}
// READ
export function getAllEmployeeWorkExperiences() {
  return axios.get(`${EMPLOYEEWORKEXPERIENCES_URL}/get`);
}
export function getEmployeeWorkExperienceById(employeeWorkExperiencesId) {
  return axios.get(
    `${EMPLOYEEWORKEXPERIENCES_URL}/get/${employeeWorkExperiencesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeWorkExperiences(queryParams) {
  return axios.post(`${EMPLOYEEWORKEXPERIENCES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeWorkExperience(id, employeeWorkExperiences) {
  return axios.put(
    `${EMPLOYEEWORKEXPERIENCES_URL}/put/${id}`,
    employeeWorkExperiences
  );
}
// UPDATE Status
export function updateStatusForEmployeeWorkExperiences(ids, status) {
  return axios.post(
    `${EMPLOYEEWORKEXPERIENCES_URL}/updateStatusForEmployeeWorkExperiences`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeWorkExperiences from the server
export function deleteEmployeeWorkExperience(employeeWorkExperiencesId) {
  return axios.delete(
    `${EMPLOYEEWORKEXPERIENCES_URL}/delete/${employeeWorkExperiencesId}`
  );
}
// DELETE EmployeeWorkExperiences by ids
export function deleteEmployeeWorkExperiences(ids) {
  return axios.post(
    `${EMPLOYEEWORKEXPERIENCES_URL}/deleteEmployeeWorkExperiences`,
    ids
  );
}
