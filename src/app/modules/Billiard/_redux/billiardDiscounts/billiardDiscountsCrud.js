
import axios from "axios";
export const BILLIARDDISCOUNTS_URL = "BilliardDiscount";
// CREATE = add a new billiardDiscounts to the server 
export function createBilliardDiscount(billiardDiscounts) { 
  return axios.post(`${BILLIARDDISCOUNTS_URL}/post`, billiardDiscounts); 
}
// READ  
export function getAllBilliardDiscounts() {
  return axios.get(`${BILLIARDDISCOUNTS_URL}/get`);
}
export function getBilliardDiscountById(billiardDiscountsId) {
  return axios.get(`${BILLIARDDISCOUNTS_URL}/get/${billiardDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBilliardDiscounts(queryParams) {
  return axios.post(`${BILLIARDDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBilliardDiscount(id, billiardDiscounts) {
  return axios.put(`${BILLIARDDISCOUNTS_URL}/put/${id}`, billiardDiscounts);
}
// UPDATE Status  
export function updateStatusForBilliardDiscounts(ids, status) {
  return axios.post(`${BILLIARDDISCOUNTS_URL}/updateStatusForBilliardDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the billiardDiscounts from the server  
export function deleteBilliardDiscount(billiardDiscountsId) {
  return axios.delete(`${BILLIARDDISCOUNTS_URL}/delete/${billiardDiscountsId}`);
}
// DELETE BilliardDiscounts by ids  
export function deleteBilliardDiscounts(ids) {
return axios.post(`${BILLIARDDISCOUNTS_URL}/deleteBilliardDiscounts`, ids);
}