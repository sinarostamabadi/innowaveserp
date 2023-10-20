
import axios from "axios";
export const DOCUMENTDTLS_URL = "DocumentDtl";
// CREATE = add a new documentDtls to the server 
export function createDocumentDtl(documentDtls) { 
  return axios.post(`${DOCUMENTDTLS_URL}/post`, documentDtls); 
}
// READ  
export function getAllDocumentDtls() {
  return axios.get(`${DOCUMENTDTLS_URL}/get`);
}
export function getDocumentDtlById(documentDtlsId) {
  return axios.get(`${DOCUMENTDTLS_URL}/get/${documentDtlsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findDocumentDtls(queryParams) {
  return axios.post(`${DOCUMENTDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateDocumentDtl(id, documentDtls) {
  return axios.put(`${DOCUMENTDTLS_URL}/put/${id}`, documentDtls);
}
// UPDATE Status  
export function updateStatusForDocumentDtls(ids, status) {
  return axios.post(`${DOCUMENTDTLS_URL}/updateStatusForDocumentDtls`, {
    ids,
    status,
  });
}
// DELETE = the documentDtls from the server  
export function deleteDocumentDtl(documentDtlsId) {
  return axios.delete(`${DOCUMENTDTLS_URL}/delete/${documentDtlsId}`);
}
// DELETE DocumentDtls by ids  
export function deleteDocumentDtls(ids) {
return axios.post(`${DOCUMENTDTLS_URL}/deleteDocumentDtls`, ids);
}