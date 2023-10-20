
import axios from "axios";
export const BODYBUILDINGPRICEING_URL = "BodyBuildingPriceing";
// CREATE = add a new bodyBuildingPriceing to the server 
export function createBodyBuildingPriceing(bodyBuildingPriceing) { 
  return axios.post(`${BODYBUILDINGPRICEING_URL}/post`, bodyBuildingPriceing); 
}
// READ  
export function getAllBodyBuildingPriceing() {
  return axios.get(`${BODYBUILDINGPRICEING_URL}/get`);
}
export function getBodyBuildingPriceingById(bodyBuildingPriceingId) {
  return axios.get(`${BODYBUILDINGPRICEING_URL}/get/${bodyBuildingPriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBodyBuildingPriceing(queryParams) {
  return axios.post(`${BODYBUILDINGPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBodyBuildingPriceing(id, bodyBuildingPriceing) {
  return axios.put(`${BODYBUILDINGPRICEING_URL}/put/${id}`, bodyBuildingPriceing);
}
// UPDATE Status  
export function updateStatusForBodyBuildingPriceing(ids, status) {
  return axios.post(`${BODYBUILDINGPRICEING_URL}/updateStatusForBodyBuildingPriceing`, {
    ids,
    status,
  });
}
// DELETE = the bodyBuildingPriceing from the server  
export function deleteBodyBuildingPriceing(bodyBuildingPriceingId) {
  return axios.delete(`${BODYBUILDINGPRICEING_URL}/delete/${bodyBuildingPriceingId}`);
}
// DELETE BodyBuildingPriceing by ids  
export function deleteBodyBuildingPriceing(ids) {
return axios.post(`${BODYBUILDINGPRICEING_URL}/deleteBodyBuildingPriceing`, ids);
}