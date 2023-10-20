
import axios from "axios";
export const SELLPRICINGDETAILS_URL = "SellPricingDetail";
// CREATE = add a new sellPricingDetails to the server 
export function createSellPricingDetail(sellPricingDetails) { 
  return axios.post(`${SELLPRICINGDETAILS_URL}/post`, sellPricingDetails); 
}
// READ  
export function getAllSellPricingDetails() {
  return axios.get(`${SELLPRICINGDETAILS_URL}/get`);
}
export function getSellPricingDetailById(sellPricingDetailsId) {
  return axios.get(`${SELLPRICINGDETAILS_URL}/get/${sellPricingDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellPricingDetails(queryParams) {
  return axios.post(`${SELLPRICINGDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellPricingDetail(id, sellPricingDetails) {
  return axios.put(`${SELLPRICINGDETAILS_URL}/put/${id}`, sellPricingDetails);
}
// UPDATE Status  
export function updateStatusForSellPricingDetails(ids, status) {
  return axios.post(`${SELLPRICINGDETAILS_URL}/updateStatusForSellPricingDetails`, {
    ids,
    status,
  });
}
// DELETE = the sellPricingDetails from the server  
export function deleteSellPricingDetail(sellPricingDetailsId) {
  return axios.delete(`${SELLPRICINGDETAILS_URL}/delete/${sellPricingDetailsId}`);
}
// DELETE SellPricingDetails by ids  
export function deleteSellPricingDetails(ids) {
return axios.post(`${SELLPRICINGDETAILS_URL}/deleteSellPricingDetails`, ids);
}