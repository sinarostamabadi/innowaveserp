
import axios from "axios";
export const MASSAGERESERVEPRICES_URL = "MassageReservePrice";
// CREATE = add a new massageReservePrices to the server 
export function createMassageReservePrice(massageReservePrices) { 
  return axios.post(`${MASSAGERESERVEPRICES_URL}/post`, massageReservePrices); 
}
// READ  
export function getAllMassageReservePrices() {
  return axios.get(`${MASSAGERESERVEPRICES_URL}/get`);
}
export function getMassageReservePriceById(massageReservePricesId) {
  return axios.get(`${MASSAGERESERVEPRICES_URL}/get/${massageReservePricesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMassageReservePrices(queryParams) {
  return axios.post(`${MASSAGERESERVEPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMassageReservePrice(id, massageReservePrices) {
  return axios.put(`${MASSAGERESERVEPRICES_URL}/put/${id}`, massageReservePrices);
}
// UPDATE Status  
export function updateStatusForMassageReservePrices(ids, status) {
  return axios.post(`${MASSAGERESERVEPRICES_URL}/updateStatusForMassageReservePrices`, {
    ids,
    status,
  });
}
// DELETE = the massageReservePrices from the server  
export function deleteMassageReservePrice(massageReservePricesId) {
  return axios.delete(`${MASSAGERESERVEPRICES_URL}/delete/${massageReservePricesId}`);
}
// DELETE MassageReservePrices by ids  
export function deleteMassageReservePrices(ids) {
return axios.post(`${MASSAGERESERVEPRICES_URL}/deleteMassageReservePrices`, ids);
}