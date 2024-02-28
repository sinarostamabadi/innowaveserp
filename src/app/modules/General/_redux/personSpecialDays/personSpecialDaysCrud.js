import axios from "axios";
export const PERSONSPECIALDAIES_URL = "PersonSpecialDay";
// CREATE = add a new personSpecialDays to the server
export function createPersonSpecialDay(personSpecialDays) {
  return axios.post(`${PERSONSPECIALDAIES_URL}/post`, personSpecialDays);
}
// READ
export function getAllPersonSpecialDays() {
  return axios.get(`${PERSONSPECIALDAIES_URL}/get`);
}
export function getPersonSpecialDayById(personSpecialDaysId) {
  return axios.get(`${PERSONSPECIALDAIES_URL}/${personSpecialDaysId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPersonSpecialDays(queryParams) {
  return axios.post(`${PERSONSPECIALDAIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePersonSpecialDay(personSpecialDays) {
  return axios.put(`${PERSONSPECIALDAIES_URL}`, personSpecialDays);
}
// UPDATE Status
export function updateStatusForPersonSpecialDays(ids, status) {
  return axios.post(
    `${PERSONSPECIALDAIES_URL}/updateStatusForPersonSpecialDays`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the personSpecialDays from the server
export function deletePersonSpecialDay(personSpecialDaysId) {
  return axios.delete(`${PERSONSPECIALDAIES_URL}/${personSpecialDaysId}`);
}
// DELETE PersonSpecialDays by ids
export function deletePersonSpecialDays(ids) {
  return axios.post(`${PERSONSPECIALDAIES_URL}/deletePersonSpecialDays`, ids);
}
