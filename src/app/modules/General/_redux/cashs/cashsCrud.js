
import axios from "axios";
export const CASHS_URL = "Cash";
// CREATE = add a new cashs to the server 
export function createCash(cashs) { 
  return axios.post(`${CASHS_URL}/post`, cashs); 
}
// READ  
export function getAll() {
  return axios.get(`${CASHS_URL}/getAll`);
}
export function getCashById(cashsId) {
  return axios.get(`${CASHS_URL}/get/${cashsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCashs(queryParams) {
  return axios.post(`${CASHS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCash(id, cashs) {
  return axios.put(`${CASHS_URL}/put/${id}`, cashs);
}
// UPDATE Status  
export function updateStatusForCashs(ids, status) {
  return axios.post(`${CASHS_URL}/updateStatusForCashs`, {
    ids,
    status,
  });
}
// DELETE = the cashs from the server  
export function deleteCash(cashsId) {
  return axios.delete(`${CASHS_URL}/delete/${cashsId}`);
}
// DELETE Cashs by ids  
export function deleteCashs(ids) {
return axios.post(`${CASHS_URL}/deleteCashs`, ids);
}
