
import axios from "axios";
export const MASSAGERESERVES_URL = "MassageReserve";
// CREATE = add a new massageReserves to the server 
export function createMassageReserve(massageReserves) { 
  return axios.post(`${MASSAGERESERVES_URL}/post`, massageReserves); 
}
// READ  
export function getAllMassageReserves() {
  return axios.get(`${MASSAGERESERVES_URL}/get`);
}
export function getMassageReserveById(massageReservesId) {
  return axios.get(`${MASSAGERESERVES_URL}/get/${massageReservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMassageReserves(queryParams) {
  return axios.post(`${MASSAGERESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMassageReserve(id, massageReserves) {
  return axios.put(`${MASSAGERESERVES_URL}/put/${id}`, massageReserves);
}
// UPDATE Status  
export function updateStatusForMassageReserves(ids, status) {
  return axios.post(`${MASSAGERESERVES_URL}/updateStatusForMassageReserves`, {
    ids,
    status,
  });
}
// DELETE = the massageReserves from the server  
export function deleteMassageReserve(massageReservesId) {
  return axios.delete(`${MASSAGERESERVES_URL}/delete/${massageReservesId}`);
}
// DELETE MassageReserves by ids  
export function deleteMassageReserves(ids) {
return axios.post(`${MASSAGERESERVES_URL}/deleteMassageReserves`, ids);
}