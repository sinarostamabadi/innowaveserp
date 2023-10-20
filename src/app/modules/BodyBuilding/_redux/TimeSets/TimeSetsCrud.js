
import axios from "axios";
export const BRANDS_URL = "BodyBuildingTimeSet";
// CREATE = add a new timeSets to the server 
export function createTimeSet(timeSets) { 
  return axios.post(`${BRANDS_URL}/post`, timeSets); 
}
// READ  
export function getAll() {
  return axios.get(`${BRANDS_URL}/getAll`);
}
export function getTimeSetById(timeSetsId) {
  return axios.get(`${BRANDS_URL}/get/${timeSetsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findTimeSets(queryParams) {
  return axios.post(`${BRANDS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateTimeSet(id, timeSets) {
  return axios.put(`${BRANDS_URL}/put/${id}`, timeSets);
}
// UPDATE Status  
export function updateStatusForTimeSets(ids, status) {
  return axios.post(`${BRANDS_URL}/updateStatusForTimeSets`, {
    ids,
    status,
  });
}
// DELETE = the timeSets from the server  
export function deleteTimeSet(timeSetsId) {
  return axios.delete(`${BRANDS_URL}/delete/${timeSetsId}`);
}
// DELETE TimeSets by ids  
export function deleteTimeSets(ids) {
return axios.post(`${BRANDS_URL}/deleteTimeSets`, ids);
}

// SUGGESION BRAND
export function suggestTimeSet(query) {
  return axios.post(`${BRANDS_URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}