
import axios from "axios";
export const MASSEURS_URL = "Masseur";
// CREATE = add a new masseurs to the server 
export function createMasseur(masseurs) { 
  return axios.post(`${MASSEURS_URL}/post`, masseurs); 
}
// READ  
export function getAllMasseurs() {
  return axios.get(`${MASSEURS_URL}/get`);
}
export function getMasseurById(masseursId) {
  return axios.get(`${MASSEURS_URL}/get/${masseursId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMasseurs(queryParams) {
  return axios.post(`${MASSEURS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMasseur(id, masseurs) {
  return axios.put(`${MASSEURS_URL}/put/${id}`, masseurs);
}
// UPDATE Status  
export function updateStatusForMasseurs(ids, status) {
  return axios.post(`${MASSEURS_URL}/updateStatusForMasseurs`, {
    ids,
    status,
  });
}
// DELETE = the masseurs from the server  
export function deleteMasseur(masseursId) {
  return axios.delete(`${MASSEURS_URL}/delete/${masseursId}`);
}
// DELETE Masseurs by ids  
export function deleteMasseurs(ids) {
return axios.post(`${MASSEURS_URL}/deleteMasseurs`, ids);
}