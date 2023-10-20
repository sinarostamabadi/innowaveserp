
import axios from "axios";
export const DOCUMENTREQUESTS_URL = "DocumentRequest";
// CREATE = add a new documentRequests to the server 
export function createDocumentRequest(documentRequests) { 
  return axios.post(`${DOCUMENTREQUESTS_URL}/post`, documentRequests); 
}
// READ  
export function getAllDocumentRequests() {
  return axios.get(`${DOCUMENTREQUESTS_URL}/get`);
}
export function getDocumentRequestById(documentRequestsId) {
  return axios.get(`${DOCUMENTREQUESTS_URL}/get/${documentRequestsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findDocumentRequests(queryParams) {
  return axios.post(`${DOCUMENTREQUESTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateDocumentRequest(id, documentRequests) {
  return axios.put(`${DOCUMENTREQUESTS_URL}/put/${id}`, documentRequests);
}
// UPDATE Status  
export function updateStatusForDocumentRequests(ids, status) {
  return axios.post(`${DOCUMENTREQUESTS_URL}/updateStatusForDocumentRequests`, {
    ids,
    status,
  });
}
// DELETE = the documentRequests from the server  
export function deleteDocumentRequest(documentRequestsId) {
  return axios.delete(`${DOCUMENTREQUESTS_URL}/delete/${documentRequestsId}`);
}
// DELETE DocumentRequests by ids  
export function deleteDocumentRequests(ids) {
return axios.post(`${DOCUMENTREQUESTS_URL}/deleteDocumentRequests`, ids);
}