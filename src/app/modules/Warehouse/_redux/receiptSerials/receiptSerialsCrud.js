
import axios from "axios";
export const RECEIPTSERIALS_URL = "ReceiptSerial";
// CREATE = add a new receiptSerials to the server 
export function createReceiptSerial(receiptSerials) { 
  return axios.post(`${RECEIPTSERIALS_URL}/post`, receiptSerials); 
}
// READ  
export function getAllReceiptSerials() {
  return axios.get(`${RECEIPTSERIALS_URL}/get`);
}
export function getReceiptSerialById(receiptSerialsId) {
  return axios.get(`${RECEIPTSERIALS_URL}/get/${receiptSerialsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findReceiptSerials(queryParams) {
  return axios.post(`${RECEIPTSERIALS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateReceiptSerial(id, receiptSerials) {
  return axios.put(`${RECEIPTSERIALS_URL}/put/${id}`, receiptSerials);
}
// UPDATE Status  
export function updateStatusForReceiptSerials(ids, status) {
  return axios.post(`${RECEIPTSERIALS_URL}/updateStatusForReceiptSerials`, {
    ids,
    status,
  });
}
// DELETE = the receiptSerials from the server  
export function deleteReceiptSerial(receiptSerialsId) {
  return axios.delete(`${RECEIPTSERIALS_URL}/delete/${receiptSerialsId}`);
}
// DELETE ReceiptSerials by ids  
export function deleteReceiptSerials(ids) {
return axios.post(`${RECEIPTSERIALS_URL}/deleteReceiptSerials`, ids);
}