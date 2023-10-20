
import axios from "axios";
export const CHEQUEPAPERS_URL = "ChequePaper";
// CREATE = add a new chequePapers to the server 
export function createChequePaper(chequePapers) { 
  return axios.post(`${CHEQUEPAPERS_URL}/post`, chequePapers); 
}
// READ  
export function getAllChequePapers() {
  return axios.get(`${CHEQUEPAPERS_URL}/getAll`);
}
export function getChequePaperById(chequePapersId) {
  return axios.get(`${CHEQUEPAPERS_URL}/get/${chequePapersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findChequePapers(queryParams) {
  return axios.post(`${CHEQUEPAPERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateChequePaper(id, chequePapers) {
  return axios.put(`${CHEQUEPAPERS_URL}/put/${id}`, chequePapers);
}
// UPDATE Status  
export function updateStatusForChequePapers(ids, status) {
  return axios.post(`${CHEQUEPAPERS_URL}/updateStatusForChequePapers`, {
    ids,
    status,
  });
}
// DELETE = the chequePapers from the server  
export function deleteChequePaper(chequePapersId) {
  return axios.delete(`${CHEQUEPAPERS_URL}/delete/${chequePapersId}`);
}
// DELETE ChequePapers by ids  
export function deleteChequePapers(ids) {
return axios.post(`${CHEQUEPAPERS_URL}/deleteChequePapers`, ids);
}