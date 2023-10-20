
import axios from "axios";
export const NEXTOPERATIONS_URL = "NextOperation";
// CREATE = add a new nextOperations to the server 
export function createNextOperation(nextOperations) { 
  return axios.post(`${NEXTOPERATIONS_URL}/post`, nextOperations); 
}
// READ  
export function getAllNextOperations() {
  return axios.get(`${NEXTOPERATIONS_URL}/get`);
}
export function getNextOperationById(nextOperationsId) {
  return axios.get(`${NEXTOPERATIONS_URL}/get/${nextOperationsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findNextOperations(queryParams) {
  return axios.post(`${NEXTOPERATIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateNextOperation(id, nextOperations) {
  return axios.put(`${NEXTOPERATIONS_URL}/put/${id}`, nextOperations);
}
// UPDATE Status  
export function updateStatusForNextOperations(ids, status) {
  return axios.post(`${NEXTOPERATIONS_URL}/updateStatusForNextOperations`, {
    ids,
    status,
  });
}
// DELETE = the nextOperations from the server  
export function deleteNextOperation(nextOperationsId) {
  return axios.delete(`${NEXTOPERATIONS_URL}/delete/${nextOperationsId}`);
}
// DELETE NextOperations by ids  
export function deleteNextOperations(ids) {
return axios.post(`${NEXTOPERATIONS_URL}/deleteNextOperations`, ids);
}