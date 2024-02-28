import axios from "axios";
export const EMPLOYEEINIODEVICES_URL = "EmployeeInIODevice";
// CREATE = add a new employeeInIODevices to the server
export function createEmployeeInIODevice(employeeInIODevices) {
  return axios.post(`${EMPLOYEEINIODEVICES_URL}/post`, employeeInIODevices);
}
// READ
export function getAllEmployeeInIODevices() {
  return axios.get(`${EMPLOYEEINIODEVICES_URL}/get`);
}
export function getEmployeeInIODeviceById(employeeInIODevicesId) {
  return axios.get(`${EMPLOYEEINIODEVICES_URL}/get/${employeeInIODevicesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeInIODevices(queryParams) {
  return axios.post(`${EMPLOYEEINIODEVICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeInIODevice(id, employeeInIODevices) {
  return axios.put(`${EMPLOYEEINIODEVICES_URL}/put/${id}`, employeeInIODevices);
}
// UPDATE Status
export function updateStatusForEmployeeInIODevices(ids, status) {
  return axios.post(
    `${EMPLOYEEINIODEVICES_URL}/updateStatusForEmployeeInIODevices`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeInIODevices from the server
export function deleteEmployeeInIODevice(employeeInIODevicesId) {
  return axios.delete(
    `${EMPLOYEEINIODEVICES_URL}/delete/${employeeInIODevicesId}`
  );
}
// DELETE EmployeeInIODevices by ids
export function deleteEmployeeInIODevices(ids) {
  return axios.post(
    `${EMPLOYEEINIODEVICES_URL}/deleteEmployeeInIODevices`,
    ids
  );
}
