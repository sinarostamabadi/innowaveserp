import axios from "axios";
export const REALPERSONS_URL = "RealPerson";
export const PERSONS_URL = "Person";
// CREATE = add a new realPersons to the server 
export function createRealPerson(realPersons) { 
  return axios.post(`${PERSONS_URL}/post`, realPersons); 
}
// READ  
export function getAllRealPersons() {
  return axios.get(`${REALPERSONS_URL}/get`);
}
export function getRealPersonById(realPersonsId) {
  return axios.get(`${PERSONS_URL}/Get/${realPersonsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRealPersons(queryParams) {
  return axios.post(`${REALPERSONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRealPerson(id, realPersons) {
  return axios.put(`${PERSONS_URL}/put/${id}`, realPersons);
}
// UPDATE Status  
export function updateStatusForRealPersons(ids, status) {
  return axios.post(`${REALPERSONS_URL}/updateStatusForRealPersons`, {
    ids,
    status,
  });
}
// DELETE = the realPersons from the server  
export function deleteRealPerson(realPersonsId) {
  return axios.delete(`${PERSONS_URL}/Delete/${realPersonsId}`);
}
// DELETE RealPersons by ids  
export function deleteRealPersons(ids) {
return axios.post(`${PERSONS_URL}/deleteRealPersons`, ids);
}
