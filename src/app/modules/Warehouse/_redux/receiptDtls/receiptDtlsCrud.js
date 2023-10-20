
import axios from "axios";
export const RECEIPTDTLS_URL = "ReceiptDtl";
// CREATE = add a new receiptDtls to the server 
export function createReceiptDtl(receiptDtls) { 
  return axios.post(`${RECEIPTDTLS_URL}/post`, receiptDtls); 
}
// READ  
export function getAllReceiptDtls() {
  return axios.get(`${RECEIPTDTLS_URL}/get`);
}
export function getReceiptDtlById(receiptDtlsId) {
  return axios.get(`${RECEIPTDTLS_URL}/get/${receiptDtlsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findReceiptDtls(queryParams) {
  return axios.post(`${RECEIPTDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateReceiptDtl(id, receiptDtls) {
  return axios.put(`${RECEIPTDTLS_URL}/put/${id}`, receiptDtls);
}
// UPDATE Status  
export function updateStatusForReceiptDtls(ids, status) {
  return axios.post(`${RECEIPTDTLS_URL}/updateStatusForReceiptDtls`, {
    ids,
    status,
  });
}
// DELETE = the receiptDtls from the server  
export function deleteReceiptDtl(receiptDtlsId) {
  return axios.delete(`${RECEIPTDTLS_URL}/delete/${receiptDtlsId}`);
}
// DELETE ReceiptDtls by ids  
export function deleteReceiptDtls(ids) {
return axios.post(`${RECEIPTDTLS_URL}/deleteReceiptDtls`, ids);
}