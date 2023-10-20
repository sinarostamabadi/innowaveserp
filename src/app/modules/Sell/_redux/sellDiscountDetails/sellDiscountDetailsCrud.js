
import axios from "axios";
export const SELLDISCOUNTDETAILS_URL = "SellDiscountDetail";
// CREATE = add a new sellDiscountDetails to the server 
export function createSellDiscountDetail(sellDiscountDetails) { 
  return axios.post(`${SELLDISCOUNTDETAILS_URL}/post`, sellDiscountDetails); 
}
// READ  
export function getAllSellDiscountDetails() {
  return axios.get(`${SELLDISCOUNTDETAILS_URL}/get`);
}
export function getSellDiscountDetailById(sellDiscountDetailsId) {
  return axios.get(`${SELLDISCOUNTDETAILS_URL}/get/${sellDiscountDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDiscountDetails(queryParams) {
  return axios.post(`${SELLDISCOUNTDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDiscountDetail(id, sellDiscountDetails) {
  return axios.put(`${SELLDISCOUNTDETAILS_URL}/put/${id}`, sellDiscountDetails);
}
// UPDATE Status  
export function updateStatusForSellDiscountDetails(ids, status) {
  return axios.post(`${SELLDISCOUNTDETAILS_URL}/updateStatusForSellDiscountDetails`, {
    ids,
    status,
  });
}
// DELETE = the sellDiscountDetails from the server  
export function deleteSellDiscountDetail(sellDiscountDetailsId) {
  return axios.delete(`${SELLDISCOUNTDETAILS_URL}/delete/${sellDiscountDetailsId}`);
}
// DELETE SellDiscountDetails by ids  
export function deleteSellDiscountDetails(ids) {
return axios.post(`${SELLDISCOUNTDETAILS_URL}/deleteSellDiscountDetails`, ids);
}