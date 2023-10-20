
import axios from "axios";
export const FUTSALRESERVEDATES_URL = "FutsalReserveDate";
// CREATE = add a new futsalReserveDates to the server 
export function createFutsalReserveDate(futsalReserveDates) { 
  return axios.post(`${FUTSALRESERVEDATES_URL}/post`, futsalReserveDates); 
}
// READ  
export function getAllFutsalReserveDates() {
  return axios.get(`${FUTSALRESERVEDATES_URL}/get`);
}
export function getFutsalReserveDateById(futsalReserveDatesId) {
  return axios.get(`${FUTSALRESERVEDATES_URL}/get/${futsalReserveDatesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalReserveDates(queryParams) {
  return axios.post(`${FUTSALRESERVEDATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalReserveDate(id, futsalReserveDates) {
  return axios.put(`${FUTSALRESERVEDATES_URL}/put/${id}`, futsalReserveDates);
}
// UPDATE Status  
export function updateStatusForFutsalReserveDates(ids, status) {
  return axios.post(`${FUTSALRESERVEDATES_URL}/updateStatusForFutsalReserveDates`, {
    ids,
    status,
  });
}
// DELETE = the futsalReserveDates from the server  
export function deleteFutsalReserveDate(futsalReserveDatesId) {
  return axios.delete(`${FUTSALRESERVEDATES_URL}/delete/${futsalReserveDatesId}`);
}
// DELETE FutsalReserveDates by ids  
export function deleteFutsalReserveDates(ids) {
return axios.post(`${FUTSALRESERVEDATES_URL}/deleteFutsalReserveDates`, ids);
}