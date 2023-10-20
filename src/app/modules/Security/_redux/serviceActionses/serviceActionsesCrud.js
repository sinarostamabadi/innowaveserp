
import axios from "axios";
export const SERVICEACTIONSES_URL = "ServiceActions";
// CREATE = add a new serviceActionses to the server 
export function createServiceActions(serviceActionses) { 
  return axios.post(`${SERVICEACTIONSES_URL}/post`, serviceActionses); 
}
// READ  
export function getAllServiceActionses() {
  return axios.get(`${SERVICEACTIONSES_URL}/get`);
}
export function getServiceActionsById(serviceActionsesId) {
  return axios.get(`${SERVICEACTIONSES_URL}/get/${serviceActionsesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findServiceActionses(queryParams) {
  return axios.post(`${SERVICEACTIONSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateServiceActions(id, serviceActionses) {
  return axios.put(`${SERVICEACTIONSES_URL}/put/${id}`, serviceActionses);
}
// UPDATE Status  
export function updateStatusForServiceActionses(ids, status) {
  return axios.post(`${SERVICEACTIONSES_URL}/updateStatusForServiceActionses`, {
    ids,
    status,
  });
}
// DELETE = the serviceActionses from the server  
export function deleteServiceActions(serviceActionsesId) {
  return axios.delete(`${SERVICEACTIONSES_URL}/delete/${serviceActionsesId}`);
}
// DELETE ServiceActionses by ids  
export function deleteServiceActionses(ids) {
return axios.post(`${SERVICEACTIONSES_URL}/deleteServiceActionses`, ids);
}