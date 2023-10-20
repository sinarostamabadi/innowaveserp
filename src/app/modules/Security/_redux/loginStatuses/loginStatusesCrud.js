
import axios from "axios";
export const LOGINSTATUSES_URL = "LoginStatus";
// CREATE = add a new loginStatuses to the server 
export function createLoginStatus(loginStatuses) { 
  return axios.post(`${LOGINSTATUSES_URL}/post`, loginStatuses); 
}
// READ  
export function getAllLoginStatuses() {
  return axios.get(`${LOGINSTATUSES_URL}/get`);
}
export function getLoginStatusById(loginStatusesId) {
  return axios.get(`${LOGINSTATUSES_URL}/get/${loginStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findLoginStatuses(queryParams) {
  return axios.post(`${LOGINSTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateLoginStatus(id, loginStatuses) {
  return axios.put(`${LOGINSTATUSES_URL}/put/${id}`, loginStatuses);
}
// UPDATE Status  
export function updateStatusForLoginStatuses(ids, status) {
  return axios.post(`${LOGINSTATUSES_URL}/updateStatusForLoginStatuses`, {
    ids,
    status,
  });
}
// DELETE = the loginStatuses from the server  
export function deleteLoginStatus(loginStatusesId) {
  return axios.delete(`${LOGINSTATUSES_URL}/delete/${loginStatusesId}`);
}
// DELETE LoginStatuses by ids  
export function deleteLoginStatuses(ids) {
return axios.post(`${LOGINSTATUSES_URL}/deleteLoginStatuses`, ids);
}