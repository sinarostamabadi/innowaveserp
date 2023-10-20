
import axios from "axios";
export const FUTSALDISCOUNTS_URL = "FutsalDiscount";
// CREATE = add a new futsalDiscounts to the server 
export function createFutsalDiscount(futsalDiscounts) { 
  return axios.post(`${FUTSALDISCOUNTS_URL}/post`, futsalDiscounts); 
}
// READ  
export function getAllFutsalDiscounts() {
  return axios.get(`${FUTSALDISCOUNTS_URL}/get`);
}
export function getFutsalDiscountById(futsalDiscountsId) {
  return axios.get(`${FUTSALDISCOUNTS_URL}/get/${futsalDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findFutsalDiscounts(queryParams) {
  return axios.post(`${FUTSALDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateFutsalDiscount(id, futsalDiscounts) {
  return axios.put(`${FUTSALDISCOUNTS_URL}/put/${id}`, futsalDiscounts);
}
// UPDATE Status  
export function updateStatusForFutsalDiscounts(ids, status) {
  return axios.post(`${FUTSALDISCOUNTS_URL}/updateStatusForFutsalDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the futsalDiscounts from the server  
export function deleteFutsalDiscount(futsalDiscountsId) {
  return axios.delete(`${FUTSALDISCOUNTS_URL}/delete/${futsalDiscountsId}`);
}
// DELETE FutsalDiscounts by ids  
export function deleteFutsalDiscounts(ids) {
return axios.post(`${FUTSALDISCOUNTS_URL}/deleteFutsalDiscounts`, ids);
}