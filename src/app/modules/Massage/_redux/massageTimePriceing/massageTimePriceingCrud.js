
import axios from "axios";
export const MASSAGETIMEPRICEING_URL = "MassageTimePriceing";
// CREATE = add a new massageTimePriceing to the server 
export function createMassageTimePriceing(massageTimePriceing) { 
  return axios.post(`${MASSAGETIMEPRICEING_URL}/post`, massageTimePriceing); 
}
// READ  
export function getAllMassageTimePriceing() {
  return axios.get(`${MASSAGETIMEPRICEING_URL}/get`);
}
export function getMassageTimePriceingById(massageTimePriceingId) {
  return axios.get(`${MASSAGETIMEPRICEING_URL}/get/${massageTimePriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMassageTimePriceing(queryParams) {
  return axios.post(`${MASSAGETIMEPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMassageTimePriceing(id, massageTimePriceing) {
  return axios.put(`${MASSAGETIMEPRICEING_URL}/put/${id}`, massageTimePriceing);
}
// UPDATE Status  
export function updateStatusForMassageTimePriceing(ids, status) {
  return axios.post(`${MASSAGETIMEPRICEING_URL}/updateStatusForMassageTimePriceing`, {
    ids,
    status,
  });
}
// DELETE = the massageTimePriceing from the server  
export function deleteMassageTimePriceing(massageTimePriceingId) {
  return axios.delete(`${MASSAGETIMEPRICEING_URL}/delete/${massageTimePriceingId}`);
}
// DELETE MassageTimePriceing by ids  
export function deleteMassageTimePriceing(ids) {
return axios.post(`${MASSAGETIMEPRICEING_URL}/deleteMassageTimePriceing`, ids);
}