import axios from "axios";
export const CITIES_URL = "City";
// CREATE = add a new cities to the server 
export function createCity(cities) { 
  return axios.post(`${CITIES_URL}/post`, cities); 
}
// READ  
export function getAllCities() {
  return axios.get(`${CITIES_URL}/get`);
}
export function getCityById(citiesId) {
  return axios.get(`${CITIES_URL}/get/${citiesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCities(queryParams) {
  return axios.post(`${CITIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCity(id, cities) {
  return axios.put(`${CITIES_URL}/put/${id}`, cities);
}
// UPDATE Status  
export function updateStatusForCities(ids, status) {
  return axios.post(`${CITIES_URL}/updateStatusForCities`, {
    ids,
    status,
  });
}
// DELETE = the cities from the server  
export function deleteCity(citiesId) {
  return axios.delete(`${CITIES_URL}/delete/${citiesId}`);
}
// DELETE Cities by ids  
export function deleteCities(ids) {
return axios.post(`${CITIES_URL}/deleteCities`, ids);
}
