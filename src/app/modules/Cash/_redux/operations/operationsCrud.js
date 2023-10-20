
import axios from "axios";
export const OPERATIONS_URL = "Operation";
// CREATE = add a new operations to the server 
export function createOperation(operations) { 
  return axios.post(`${OPERATIONS_URL}/post`, operations); 
}
// READ  
export function getAllOperations() {
  return axios.get(`${OPERATIONS_URL}/get`);
}
export function getOperationById(operationsId) {
  return axios.get(`${OPERATIONS_URL}/get/${operationsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findOperations(queryParams) {
  return axios.post(`${OPERATIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateOperation(id, operations) {
  return axios.put(`${OPERATIONS_URL}/put/${id}`, operations);
}
// UPDATE Status  
export function updateStatusForOperations(ids, status) {
  return axios.post(`${OPERATIONS_URL}/updateStatusForOperations`, {
    ids,
    status,
  });
}
// DELETE = the operations from the server  
export function deleteOperation(operationsId) {
  return axios.delete(`${OPERATIONS_URL}/delete/${operationsId}`);
}
// DELETE Operations by ids  
export function deleteOperations(ids) {
return axios.post(`${OPERATIONS_URL}/deleteOperations`, ids);
}