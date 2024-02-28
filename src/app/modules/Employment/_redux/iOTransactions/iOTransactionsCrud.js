import axios from "axios";
export const IOTRANSACTIONS_URL = "IOTransaction";
// CREATE = add a new iOTransactions to the server
export function createIOTransaction(iOTransactions) {
  return axios.post(`${IOTRANSACTIONS_URL}/post`, iOTransactions);
}
// READ
export function getAllIOTransactions() {
  return axios.get(`${IOTRANSACTIONS_URL}/get`);
}
export function getIOTransactionById(iOTransactionsId) {
  return axios.get(`${IOTRANSACTIONS_URL}/get/${iOTransactionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findIOTransactions(queryParams) {
  return axios.post(`${IOTRANSACTIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateIOTransaction(id, iOTransactions) {
  return axios.put(`${IOTRANSACTIONS_URL}/put/${id}`, iOTransactions);
}
// UPDATE Status
export function updateStatusForIOTransactions(ids, status) {
  return axios.post(`${IOTRANSACTIONS_URL}/updateStatusForIOTransactions`, {
    ids,
    status,
  });
}
// DELETE = the iOTransactions from the server
export function deleteIOTransaction(iOTransactionsId) {
  return axios.delete(`${IOTRANSACTIONS_URL}/delete/${iOTransactionsId}`);
}
// DELETE IOTransactions by ids
export function deleteIOTransactions(ids) {
  return axios.post(`${IOTRANSACTIONS_URL}/deleteIOTransactions`, ids);
}
