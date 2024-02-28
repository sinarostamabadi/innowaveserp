import axios from "axios";
export const COUNTRIES_URL = "Country";
// CREATE = add a new countries to the server
export function createCountry(countries) {
  return axios.post(`${COUNTRIES_URL}/post`, countries);
}
// READ
export function getAllCountries() {
  return axios.get(`${COUNTRIES_URL}/get`);
}
export function getCountryById(countriesId) {
  return axios.get(`${COUNTRIES_URL}/get/${countriesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCountries(queryParams) {
  return axios.post(`${COUNTRIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCountry(id, countries) {
  return axios.put(`${COUNTRIES_URL}/put/${id}`, countries);
}
// UPDATE Status
export function updateStatusForCountries(ids, status) {
  return axios.post(`${COUNTRIES_URL}/updateStatusForCountries`, {
    ids,
    status,
  });
}
// DELETE = the countries from the server
export function deleteCountry(countriesId) {
  return axios.delete(`${COUNTRIES_URL}/delete/${countriesId}`);
}
// DELETE Countries by ids
export function deleteCountries(ids) {
  return axios.post(`${COUNTRIES_URL}/deleteCountries`, ids);
}
