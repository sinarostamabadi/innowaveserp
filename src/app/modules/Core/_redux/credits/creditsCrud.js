import axios from "axios";
export const PHONES_URL = "Credit";
// CREATE = add a new credits to the server 
export function createCredit(credits) { 
  return axios.post(`${PHONES_URL}/post`, credits); 
}
// READ  
export function getAllCredits() {
  return axios.get(`${PHONES_URL}/get`);
}
export function getCreditById(creditsId) {
  return axios.get(`${PHONES_URL}/${creditsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCredits(queryParams) {
  return axios.post(`${PHONES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCredit(credits) {
  return axios.put(`${PHONES_URL}`, credits);
}
// UPDATE Status  
export function updateStatusForCredits(ids, status) {
  return axios.post(`${PHONES_URL}/updateStatusForCredits`, {
    ids,
    status,
  });
}
// DELETE = the credits from the server  
export function deleteCredit(creditsId) {
  return axios.delete(`${PHONES_URL}/${creditsId}`);
}
// DELETE Credits by ids  
export function deleteCredits(ids) {
return axios.post(`${PHONES_URL}/deleteCredits`, ids);
}
