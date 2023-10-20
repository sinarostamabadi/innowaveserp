import axios from "axios";
export const COSTS_URL = "Cost";
// CREATE = add a new costs to the server 
export function createCost(costs) { 
  return axios.post(`${COSTS_URL}/post`, costs); 
}
// READ  
export function getAllCosts() {
  return axios.get(`${COSTS_URL}/get`);
}
export function getCostById(costsId) {
  return axios.get(`${COSTS_URL}/get/${costsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCosts(queryParams) {
  return axios.post(`${COSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCost(id, costs) {
  return axios.put(`${COSTS_URL}/put/${id}`, costs);
}
// UPDATE Status  
export function updateStatusForCosts(ids, status) {
  return axios.post(`${COSTS_URL}/updateStatusForCosts`, {
    ids,
    status,
  });
}
// DELETE = the costs from the server  
export function deleteCost(costsId) {
  return axios.delete(`${COSTS_URL}/delete/${costsId}`);
}
// DELETE Costs by ids  
export function deleteCosts(ids) {
return axios.post(`${COSTS_URL}/deleteCosts`, ids);
}