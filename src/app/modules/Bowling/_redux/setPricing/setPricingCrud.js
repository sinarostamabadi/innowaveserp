
import axios from "axios";
export const SETPRICING_URL = "SetPricing";
// CREATE = add a new setPricing to the server 
export function createSetPricing(setPricing) { 
  return axios.post(`${SETPRICING_URL}/post`, setPricing); 
}
// READ  
export function getAllSetPricing() {
  return axios.get(`${SETPRICING_URL}/get`);
}
export function getSetPricingById(setPricingId) {
  return axios.get(`${SETPRICING_URL}/get/${setPricingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSetPricings(queryParams) {
  return axios.post(`${SETPRICING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSetPricing(id, setPricing) {
  
  return axios.put(`${SETPRICING_URL}/put/${id}`, setPricing);
}
// UPDATE Status  
export function updateStatusForSetPricing(ids, status) {
  return axios.post(`${SETPRICING_URL}/updateStatusForSetPricing`, {
    ids,
    status,
  });
}
// DELETE = the setPricing from the server  
export function deleteSetPricing(setPricingId) {
  return axios.delete(`${SETPRICING_URL}/delete/${setPricingId}`);
}
// DELETE SetPricing by ids  
export function deleteSetPricings(ids) {
return axios.post(`${SETPRICING_URL}/deleteSetPricing`, ids);
}