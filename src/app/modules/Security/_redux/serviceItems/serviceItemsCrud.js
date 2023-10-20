
import axios from "axios";
export const SERVICEITEMS_URL = "ServiceItem";
// CREATE = add a new serviceItems to the server 
export function createServiceItem(serviceItems) { 
  return axios.post(`${SERVICEITEMS_URL}/post`, serviceItems); 
}
// READ  
export function getAllServiceItems() {
  return axios.get(`${SERVICEITEMS_URL}/get`);
}
export function getServiceItemById(serviceItemsId) {
  return axios.get(`${SERVICEITEMS_URL}/get/${serviceItemsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findServiceItems(queryParams) {
  return axios.post(`${SERVICEITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateServiceItem(id, serviceItems) {
  return axios.put(`${SERVICEITEMS_URL}/put/${id}`, serviceItems);
}
// UPDATE Status  
export function updateStatusForServiceItems(ids, status) {
  return axios.post(`${SERVICEITEMS_URL}/updateStatusForServiceItems`, {
    ids,
    status,
  });
}
// DELETE = the serviceItems from the server  
export function deleteServiceItem(serviceItemsId) {
  return axios.delete(`${SERVICEITEMS_URL}/delete/${serviceItemsId}`);
}
// DELETE ServiceItems by ids  
export function deleteServiceItems(ids) {
return axios.post(`${SERVICEITEMS_URL}/deleteServiceItems`, ids);
}