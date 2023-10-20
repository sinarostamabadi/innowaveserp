
import axios from "axios";
export const BILLIARDRESERVES_URL = "BilliardReserve";
// CREATE = add a new billiardReserves to the server 
export function createBilliardReserve(billiardReserves) { 
  return axios.post(`${BILLIARDRESERVES_URL}/post`, billiardReserves); 
}
// READ  
export function getAllBilliardReserves() {
  return axios.get(`${BILLIARDRESERVES_URL}/get`);
}
export function getBilliardReserveById(billiardReservesId) {
  return axios.get(`${BILLIARDRESERVES_URL}/get/${billiardReservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBilliardReserves(queryParams) {
  return axios.post(`${BILLIARDRESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBilliardReserve(id, billiardReserves) {
  return axios.put(`${BILLIARDRESERVES_URL}/put/${id}`, billiardReserves);
}
// UPDATE Status  
export function updateStatusForBilliardReserves(ids, status) {
  return axios.post(`${BILLIARDRESERVES_URL}/updateStatusForBilliardReserves`, {
    ids,
    status,
  });
}
// DELETE = the billiardReserves from the server  
export function deleteBilliardReserve(billiardReservesId) {
  return axios.delete(`${BILLIARDRESERVES_URL}/delete/${billiardReservesId}`);
}
// DELETE BilliardReserves by ids  
export function deleteBilliardReserves(ids) {
return axios.post(`${BILLIARDRESERVES_URL}/deleteBilliardReserves`, ids);
}