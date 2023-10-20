
import axios from "axios";
export const FUTSALTIMING_URL = "FutsalTiming";
// CREATE = add a new futsalTiming to the server 
export function createFutsalTiming(futsalTiming) { 
  return axios.post(`${FUTSALTIMING_URL}/post`, futsalTiming); 
}
// READ  
export function getAllFutsalTiming() {
  return axios.get(`${FUTSALTIMING_URL}/getall`);
}
export function getFutsalTimingById(futsalTimingId) {
  return axios.get(`${FUTSALTIMING_URL}/get/${futsalTimingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalTimings(queryParams) {
  return axios.post(`${FUTSALTIMING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalTiming(id, futsalTiming) {
  return axios.put(`${FUTSALTIMING_URL}/put/${id}`, futsalTiming);
}
// UPDATE Status  
export function updateStatusForFutsalTiming(ids, status) {
  return axios.post(`${FUTSALTIMING_URL}/updateStatusForFutsalTiming`, {
    ids,
    status,
  });
}
// DELETE = the futsalTiming from the server  
export function deleteFutsalTiming(futsalTimingId) {
  return axios.delete(`${FUTSALTIMING_URL}/delete/${futsalTimingId}`);
}
// DELETE FutsalTiming by ids  
export function deleteFutsalTimings(ids) {
return axios.post(`${FUTSALTIMING_URL}/deleteFutsalTiming`, ids);
}