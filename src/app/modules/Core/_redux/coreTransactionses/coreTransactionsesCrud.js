import axios from "axios";
export const CORETRANSACTIONSES_URL = "CoreTransactions";
// CREATE = add a new coreTransactionses to the server 
export function createCoreTransactions(coreTransactionses) { 
  return axios.post(`${CORETRANSACTIONSES_URL}/post`, coreTransactionses); 
}
// READ  
export function getAllCoreTransactionses() {
  return axios.get(`${CORETRANSACTIONSES_URL}/get`);
}
export function getCoreTransactionsById(coreTransactionsesId) {
  return axios.get(`${CORETRANSACTIONSES_URL}/${coreTransactionsesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCoreTransactionses(queryParams) {
  return axios.post(`${CORETRANSACTIONSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCoreTransactions(coreTransactionses) {
  return axios.put(`${CORETRANSACTIONSES_URL}`, coreTransactionses);
}
// UPDATE Status  
export function updateStatusForCoreTransactionses(ids, status) {
  return axios.post(`${CORETRANSACTIONSES_URL}/updateStatusForCoreTransactionses`, {
    ids,
    status,
  });
}
// DELETE = the coreTransactionses from the server  
export function deleteCoreTransactions(coreTransactionsesId) {
  return axios.delete(`${CORETRANSACTIONSES_URL}/${coreTransactionsesId}`);
}
// DELETE CoreTransactionses by ids  
export function deleteCoreTransactionses(ids) {
return axios.post(`${CORETRANSACTIONSES_URL}/deleteCoreTransactionses`, ids);
}
