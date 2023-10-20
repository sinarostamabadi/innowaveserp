
import axios from "axios";
export const COSTCENTERS_URL = "CostCenter";
// CREATE = add a new costCenters to the server 
export function createCostCenter(costCenters) { 
  return axios.post(`${COSTCENTERS_URL}/post`, costCenters); 
}
// READ  
export function getAllCostCenters() {
  return axios.get(`${COSTCENTERS_URL}/getAll`);
}
export function getCostCenterById(costCentersId) {
  return axios.get(`${COSTCENTERS_URL}/get/${costCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCostCenters(queryParams) {
  return axios.post(`${COSTCENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCostCenter(id, costCenters) {
  return axios.put(`${COSTCENTERS_URL}/put/${id}`, costCenters);
}
// UPDATE Status  
export function updateStatusForCostCenters(ids, status) {
  return axios.post(`${COSTCENTERS_URL}/updateStatusForCostCenters`, {
    ids,
    status,
  });
}
// DELETE = the costCenters from the server  
export function deleteCostCenter(costCentersId) {
  return axios.delete(`${COSTCENTERS_URL}/delete/${costCentersId}`);
}
// DELETE CostCenters by ids  
export function deleteCostCenters(ids) {
return axios.post(`${COSTCENTERS_URL}/deleteCostCenters`, ids);
}