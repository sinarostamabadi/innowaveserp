
import axios from "axios";
export const RECEIPTS_URL = "Receipt";
// CREATE = add a new receipts to the server 
export function createReceipt(receipts) { 
  return axios.post(`${RECEIPTS_URL}/post`, receipts); 
}
// READ  
export function getAllReceipts() {
  return axios.get(`${RECEIPTS_URL}/get`);
}
export function getReceiptById(receiptsId) {
  return axios.get(`${RECEIPTS_URL}/get/${receiptsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findReceipts(queryParams) {
  return axios.post(`${RECEIPTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateReceipt(id, receipts) {
  return axios.put(`${RECEIPTS_URL}/put/${id}`, receipts);
}
// UPDATE Status  
export function updateStatusForReceipts(ids, status) {
  return axios.post(`${RECEIPTS_URL}/updateStatusForReceipts`, {
    ids,
    status,
  });
}
// DELETE = the receipts from the server  
export function deleteReceipt(receiptsId) {
  return axios.delete(`${RECEIPTS_URL}/delete/${receiptsId}`);
}
// DELETE Receipts by ids  
export function deleteReceipts(ids) {
return axios.post(`${RECEIPTS_URL}/deleteReceipts`, ids);
}