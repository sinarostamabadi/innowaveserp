
import axios from "axios";
export const FUTSALCENTERS_URL = "FutsalCenter";
// CREATE = add a new futsalCenters to the server 
export function createFutsalCenter(futsalCenters) { 
  return axios.post(`${FUTSALCENTERS_URL}/post`, futsalCenters); 
}
// READ  
export function getAllFutsalCenters() {
  return axios.get(`${FUTSALCENTERS_URL}/get`);
}
export function getFutsalCenterById(futsalCentersId) {
  return axios.get(`${FUTSALCENTERS_URL}/get/${futsalCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalCenters(queryParams) {
  return axios.post(`${FUTSALCENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalCenter(id, futsalCenters) {
  return axios.put(`${FUTSALCENTERS_URL}/put/${id}`, futsalCenters);
}
// UPDATE Status  
export function updateStatusForFutsalCenters(ids, status) {
  return axios.post(`${FUTSALCENTERS_URL}/updateStatusForFutsalCenters`, {
    ids,
    status,
  });
}
// DELETE = the futsalCenters from the server  
export function deleteFutsalCenter(futsalCentersId) {
  return axios.delete(`${FUTSALCENTERS_URL}/delete/${futsalCentersId}`);
}
// DELETE FutsalCenters by ids  
export function deleteFutsalCenters(ids) {
return axios.post(`${FUTSALCENTERS_URL}/deleteFutsalCenters`, ids);
}