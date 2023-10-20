
import axios from "axios";
export const PRODUCTWAREHOUSES_URL = "ProductWarehouse";
// CREATE = add a new productWarehouses to the server 
export function createProductWarehouse(productWarehouses) { 
  return axios.post(`${PRODUCTWAREHOUSES_URL}/post`, productWarehouses); 
}
// READ  
export function getAllProductWarehouses() {
  return axios.get(`${PRODUCTWAREHOUSES_URL}/get`);
}
export function getProductWarehouseById(productWarehousesId) {
  return axios.get(`${PRODUCTWAREHOUSES_URL}/get/${productWarehousesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findProductWarehouses(queryParams) {
  return axios.post(`${PRODUCTWAREHOUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateProductWarehouse(id, productWarehouses) {
  return axios.put(`${PRODUCTWAREHOUSES_URL}/put/${id}`, productWarehouses);
}
// UPDATE Status  
export function updateStatusForProductWarehouses(ids, status) {
  return axios.post(`${PRODUCTWAREHOUSES_URL}/updateStatusForProductWarehouses`, {
    ids,
    status,
  });
}
// DELETE = the productWarehouses from the server  
export function deleteProductWarehouse(productWarehousesId) {
  return axios.delete(`${PRODUCTWAREHOUSES_URL}/delete/${productWarehousesId}`);
}
// DELETE ProductWarehouses by ids  
export function deleteProductWarehouses(ids) {
return axios.post(`${PRODUCTWAREHOUSES_URL}/deleteProductWarehouses`, ids);
}