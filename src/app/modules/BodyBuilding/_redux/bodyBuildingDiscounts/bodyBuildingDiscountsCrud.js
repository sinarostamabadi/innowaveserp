
import axios from "axios";
export const BODYBUILDINGDISCOUNTS_URL = "BodyBuildingDiscount";
// CREATE = add a new bodyBuildingDiscounts to the server 
export function createBodyBuildingDiscount(bodyBuildingDiscounts) { 
  return axios.post(`${BODYBUILDINGDISCOUNTS_URL}/post`, bodyBuildingDiscounts); 
}
// READ  
export function getAllBodyBuildingDiscounts() {
  return axios.get(`${BODYBUILDINGDISCOUNTS_URL}/get`);
}
export function getBodyBuildingDiscountById(bodyBuildingDiscountsId) {
  return axios.get(`${BODYBUILDINGDISCOUNTS_URL}/get/${bodyBuildingDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBodyBuildingDiscounts(queryParams) {
  return axios.post(`${BODYBUILDINGDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBodyBuildingDiscount(id, bodyBuildingDiscounts) {
  return axios.put(`${BODYBUILDINGDISCOUNTS_URL}/put/${id}`, bodyBuildingDiscounts);
}
// UPDATE Status  
export function updateStatusForBodyBuildingDiscounts(ids, status) {
  return axios.post(`${BODYBUILDINGDISCOUNTS_URL}/updateStatusForBodyBuildingDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the bodyBuildingDiscounts from the server  
export function deleteBodyBuildingDiscount(bodyBuildingDiscountsId) {
  return axios.delete(`${BODYBUILDINGDISCOUNTS_URL}/delete/${bodyBuildingDiscountsId}`);
}
// DELETE BodyBuildingDiscounts by ids  
export function deleteBodyBuildingDiscounts(ids) {
return axios.post(`${BODYBUILDINGDISCOUNTS_URL}/deleteBodyBuildingDiscounts`, ids);
}