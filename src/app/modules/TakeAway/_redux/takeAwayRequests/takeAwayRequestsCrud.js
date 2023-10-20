
import axios from "axios";
export const SELLDISCOUNTS_URL = "TakeAwayRequest";
// CREATE = add a new takeAwayRequests to the server 
export function createTakeAwayRequest(takeAwayRequests) { 
  return axios.post(`${SELLDISCOUNTS_URL}/post`, takeAwayRequests); 
}
// READ  
export function getAllTakeAwayRequests() {
  return axios.get(`${SELLDISCOUNTS_URL}/get`);
}
export function getTakeAwayRequestById(takeAwayRequestsId) {
  return axios.get(`${SELLDISCOUNTS_URL}/get/${takeAwayRequestsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findTakeAwayRequests(queryParams) {
  return axios.post(`${SELLDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateTakeAwayRequest(id, takeAwayRequests) {
  return axios.put(`${SELLDISCOUNTS_URL}/put/${id}`, takeAwayRequests);
}
// UPDATE Status  
export function updateStatusForTakeAwayRequests(ids, status) {
  return axios.post(`${SELLDISCOUNTS_URL}/updateStatusForTakeAwayRequests`, {
    ids,
    status,
  });
}
// DELETE = the takeAwayRequests from the server  
export function deleteTakeAwayRequest(takeAwayRequestsId) {
  return axios.delete(`${SELLDISCOUNTS_URL}/delete/${takeAwayRequestsId}`);
}
// DELETE TakeAwayRequests by ids  
export function deleteTakeAwayRequests(ids) {
return axios.post(`${SELLDISCOUNTS_URL}/deleteTakeAwayRequests`, ids);
}