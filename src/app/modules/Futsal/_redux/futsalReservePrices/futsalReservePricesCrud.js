
import axios from "axios";
export const FUTSALRESERVEPRICES_URL = "FutsalReservePrice";
// CREATE = add a new futsalReservePrices to the server 
export function createFutsalReservePrice(futsalReservePrices) { 
  return axios.post(`${FUTSALRESERVEPRICES_URL}/post`, futsalReservePrices); 
}
// READ  
export function getAllFutsalReservePrices() {
  return axios.get(`${FUTSALRESERVEPRICES_URL}/get`);
}
export function getFutsalReservePriceById(futsalReservePricesId) {
  return axios.get(`${FUTSALRESERVEPRICES_URL}/get/${futsalReservePricesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalReservePrices(queryParams) {
  return axios.post(`${FUTSALRESERVEPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalReservePrice(id, futsalReservePrices) {
  return axios.put(`${FUTSALRESERVEPRICES_URL}/put/${id}`, futsalReservePrices);
}
// UPDATE Status  
export function updateStatusForFutsalReservePrices(ids, status) {
  return axios.post(`${FUTSALRESERVEPRICES_URL}/updateStatusForFutsalReservePrices`, {
    ids,
    status,
  });
}
// DELETE = the futsalReservePrices from the server  
export function deleteFutsalReservePrice(futsalReservePricesId) {
  return axios.delete(`${FUTSALRESERVEPRICES_URL}/delete/${futsalReservePricesId}`);
}
// DELETE FutsalReservePrices by ids  
export function deleteFutsalReservePrices(ids) {
return axios.post(`${FUTSALRESERVEPRICES_URL}/deleteFutsalReservePrices`, ids);
}