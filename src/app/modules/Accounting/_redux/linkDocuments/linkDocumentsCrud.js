
import axios from "axios";
export const LINKDOCUMENTS_URL = "LinkDocument";
// CREATE = add a new linkDocuments to the server 
export function createLinkDocument(linkDocuments) { 
  return axios.post(`${LINKDOCUMENTS_URL}/post`, linkDocuments); 
}
// READ  
export function getAllLinkDocuments() {
  return axios.get(`${LINKDOCUMENTS_URL}/get`);
}
export function getLinkDocumentById(linkDocumentsId) {
  return axios.get(`${LINKDOCUMENTS_URL}/get/${linkDocumentsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findLinkDocuments(queryParams) {
  return axios.post(`${LINKDOCUMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateLinkDocument(id, linkDocuments) {
  return axios.put(`${LINKDOCUMENTS_URL}/put/${id}`, linkDocuments);
}
// UPDATE Status  
export function updateStatusForLinkDocuments(ids, status) {
  return axios.post(`${LINKDOCUMENTS_URL}/updateStatusForLinkDocuments`, {
    ids,
    status,
  });
}
// DELETE = the linkDocuments from the server  
export function deleteLinkDocument(linkDocumentsId) {
  return axios.delete(`${LINKDOCUMENTS_URL}/delete/${linkDocumentsId}`);
}
// DELETE LinkDocuments by ids  
export function deleteLinkDocuments(ids) {
return axios.post(`${LINKDOCUMENTS_URL}/deleteLinkDocuments`, ids);
}