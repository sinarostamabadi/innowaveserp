
import axios from "axios";
export const WAREHOUSES_URL = "Warehouse";
// CREATE = add a new warehouses to the server 
export function createWarehouse(warehouses) { 
  return axios.post(`${WAREHOUSES_URL}/post`, warehouses); 
}
// READ  
export function getAllWarehouses() {
  return axios.get(`${WAREHOUSES_URL}/getall`);
}
export function getWarehouseById(warehousesId) {
  return axios.get(`${WAREHOUSES_URL}/get/${warehousesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findWarehouses(queryParams) {
  return axios.post(`${WAREHOUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateWarehouse(id, warehouses) {
  return axios.put(`${WAREHOUSES_URL}/put/${id}`, warehouses);
}
// UPDATE Status  
export function updateStatusForWarehouses(ids, status) {
  return axios.post(`${WAREHOUSES_URL}/updateStatusForWarehouses`, {
    ids,
    status,
  });
}
// DELETE = the warehouses from the server  
export function deleteWarehouse(warehousesId) {
  return axios.delete(`${WAREHOUSES_URL}/delete/${warehousesId}`);
}
// DELETE Warehouses by ids  
export function deleteWarehouses(ids) {
return axios.post(`${WAREHOUSES_URL}/deleteWarehouses`, ids);
}