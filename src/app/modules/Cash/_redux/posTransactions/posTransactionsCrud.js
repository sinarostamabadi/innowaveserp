
import axios from "axios";
export const POSTRANSACTIONS_URL = "PosTransaction";
// CREATE = add a new posTransactions to the server 
export function createPosTransaction(posTransactions) { 
  return axios.post(`${POSTRANSACTIONS_URL}/post`, posTransactions); 
}
// READ  
export function getAllPosTransactions() {
  return axios.get(`${POSTRANSACTIONS_URL}/get`);
}
export function getPosTransactionById(posTransactionsId) {
  return axios.get(`${POSTRANSACTIONS_URL}/get/${posTransactionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPosTransactions(queryParams) {
  return axios.post(`${POSTRANSACTIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePosTransaction(id, posTransactions) {
  return axios.put(`${POSTRANSACTIONS_URL}/put/${id}`, posTransactions);
}
// UPDATE Status  
export function updateStatusForPosTransactions(ids, status) {
  return axios.post(`${POSTRANSACTIONS_URL}/updateStatusForPosTransactions`, {
    ids,
    status,
  });
}
// DELETE = the posTransactions from the server  
export function deletePosTransaction(posTransactionsId) {
  return axios.delete(`${POSTRANSACTIONS_URL}/delete/${posTransactionsId}`);
}
// DELETE PosTransactions by ids  
export function deletePosTransactions(ids) {
return axios.post(`${POSTRANSACTIONS_URL}/deletePosTransactions`, ids);
}