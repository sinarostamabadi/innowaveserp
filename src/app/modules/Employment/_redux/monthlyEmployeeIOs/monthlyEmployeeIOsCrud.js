import axios from "axios";
export const MONTHLYEMPLOYEEIOS_URL = "MonthlyEmployeeIO";
// CREATE = add a new monthlyEmployeeIOs to the server
export function createMonthlyEmployeeIO(monthlyEmployeeIOs) {
  return axios.post(`${MONTHLYEMPLOYEEIOS_URL}/post`, monthlyEmployeeIOs);
}
// READ
export function getAllMonthlyEmployeeIOs() {
  return axios.get(`${MONTHLYEMPLOYEEIOS_URL}/get`);
}
export function getMonthlyEmployeeIOById(monthlyEmployeeIOsId) {
  return axios.get(`${MONTHLYEMPLOYEEIOS_URL}/get/${monthlyEmployeeIOsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMonthlyEmployeeIOs(queryParams) {
  return axios.post(`${MONTHLYEMPLOYEEIOS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMonthlyEmployeeIO(id, monthlyEmployeeIOs) {
  return axios.put(`${MONTHLYEMPLOYEEIOS_URL}/put/${id}`, monthlyEmployeeIOs);
}
// UPDATE Status
export function updateStatusForMonthlyEmployeeIOs(ids, status) {
  return axios.post(
    `${MONTHLYEMPLOYEEIOS_URL}/updateStatusForMonthlyEmployeeIOs`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the monthlyEmployeeIOs from the server
export function deleteMonthlyEmployeeIO(monthlyEmployeeIOsId) {
  return axios.delete(
    `${MONTHLYEMPLOYEEIOS_URL}/delete/${monthlyEmployeeIOsId}`
  );
}
// DELETE MonthlyEmployeeIOs by ids
export function deleteMonthlyEmployeeIOs(ids) {
  return axios.post(`${MONTHLYEMPLOYEEIOS_URL}/deleteMonthlyEmployeeIOs`, ids);
}
