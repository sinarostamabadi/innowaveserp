import axios from "axios";
export const YEARS_URL = "Year";
// CREATE = add a new years to the server
export function createYear(years) {
  return axios.post(`${YEARS_URL}/post`, years);
}
// READ
export function getAllYears() {
  return axios.get(`${YEARS_URL}/getAll`);
}
export function getYearById(yearsId) {
  return axios.get(`${YEARS_URL}/get/${yearsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findYears(queryParams) {
  return axios.post(`${YEARS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateYear(id, years) {
  return axios.put(`${YEARS_URL}/put/${id}`, years);
}
// UPDATE Status
export function updateStatusForYears(ids, status) {
  return axios.post(`${YEARS_URL}/updateStatusForYears`, {
    ids,
    status,
  });
}
// DELETE = the years from the server
export function deleteYear(yearsId) {
  return axios.delete(`${YEARS_URL}/delete/${yearsId}`);
}
// DELETE Years by ids
export function deleteYears(ids) {
  return axios.post(`${YEARS_URL}/deleteYears`, ids);
}
