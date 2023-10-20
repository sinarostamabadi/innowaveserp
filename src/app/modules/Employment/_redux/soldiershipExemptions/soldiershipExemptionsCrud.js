
import axios from "axios";
export const SOLDIERSHIPEXEMPTIONS_URL = "SoldiershipExemption";
// CREATE = add a new soldiershipExemptions to the server 
export function createSoldiershipExemption(soldiershipExemptions) { 
  return axios.post(`${SOLDIERSHIPEXEMPTIONS_URL}/post`, soldiershipExemptions); 
}
// READ  
export function getAllSoldiershipExemptions() {
  return axios.get(`${SOLDIERSHIPEXEMPTIONS_URL}/get`);
}
export function getSoldiershipExemptionById(soldiershipExemptionsId) {
  return axios.get(`${SOLDIERSHIPEXEMPTIONS_URL}/get/${soldiershipExemptionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSoldiershipExemptions(queryParams) {
  return axios.post(`${SOLDIERSHIPEXEMPTIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSoldiershipExemption(id, soldiershipExemptions) {
  return axios.put(`${SOLDIERSHIPEXEMPTIONS_URL}/put/${id}`, soldiershipExemptions);
}
// UPDATE Status  
export function updateStatusForSoldiershipExemptions(ids, status) {
  return axios.post(`${SOLDIERSHIPEXEMPTIONS_URL}/updateStatusForSoldiershipExemptions`, {
    ids,
    status,
  });
}
// DELETE = the soldiershipExemptions from the server  
export function deleteSoldiershipExemption(soldiershipExemptionsId) {
  return axios.delete(`${SOLDIERSHIPEXEMPTIONS_URL}/delete/${soldiershipExemptionsId}`);
}
// DELETE SoldiershipExemptions by ids  
export function deleteSoldiershipExemptions(ids) {
return axios.post(`${SOLDIERSHIPEXEMPTIONS_URL}/deleteSoldiershipExemptions`, ids);
}