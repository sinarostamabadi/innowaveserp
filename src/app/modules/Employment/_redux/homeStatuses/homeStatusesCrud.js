
import axios from "axios";
export const HOMESTATUSES_URL = "HomeStatus";
// CREATE = add a new homeStatuses to the server 
export function createHomeStatus(homeStatuses) { 
  return axios.post(`${HOMESTATUSES_URL}/post`, homeStatuses); 
}
// READ  
export function getAllHomeStatuses() {
  return axios.get(`${HOMESTATUSES_URL}/get`);
}
export function getHomeStatusById(homeStatusesId) {
  return axios.get(`${HOMESTATUSES_URL}/get/${homeStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findHomeStatuses(queryParams) {
  return axios.post(`${HOMESTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateHomeStatus(id, homeStatuses) {
  return axios.put(`${HOMESTATUSES_URL}/put/${id}`, homeStatuses);
}
// UPDATE Status  
export function updateStatusForHomeStatuses(ids, status) {
  return axios.post(`${HOMESTATUSES_URL}/updateStatusForHomeStatuses`, {
    ids,
    status,
  });
}
// DELETE = the homeStatuses from the server  
export function deleteHomeStatus(homeStatusesId) {
  return axios.delete(`${HOMESTATUSES_URL}/delete/${homeStatusesId}`);
}
// DELETE HomeStatuses by ids  
export function deleteHomeStatuses(ids) {
return axios.post(`${HOMESTATUSES_URL}/deleteHomeStatuses`, ids);
}