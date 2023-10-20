
import axios from "axios";
export const FUTSALRESERVES_URL = "FutsalReserve";
// CREATE = add a new futsalReserves to the server 
export function createFutsalReserve(futsalReserves) { 
  return axios.post(`${FUTSALRESERVES_URL}/post`, futsalReserves); 
}
// READ  
export function getAllFutsalReserves() {
  return axios.get(`${FUTSALRESERVES_URL}/get`);
}
export function getFutsalReserveById(futsalReservesId) {
  return axios.get(`${FUTSALRESERVES_URL}/get/${futsalReservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalReserves(queryParams) {
  return axios.post(`${FUTSALRESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalReserve(id, futsalReserves) {
  return axios.put(`${FUTSALRESERVES_URL}/put/${id}`, futsalReserves);
}
// UPDATE Status  
export function updateStatusForFutsalReserves(ids, status) {
  return axios.post(`${FUTSALRESERVES_URL}/updateStatusForFutsalReserves`, {
    ids,
    status,
  });
}
// DELETE = the futsalReserves from the server  
export function deleteFutsalReserve(futsalReservesId) {
  return axios.delete(`${FUTSALRESERVES_URL}/delete/${futsalReservesId}`);
}
// DELETE FutsalReserves by ids  
export function deleteFutsalReserves(ids) {
return axios.post(`${FUTSALRESERVES_URL}/deleteFutsalReserves`, ids);
}