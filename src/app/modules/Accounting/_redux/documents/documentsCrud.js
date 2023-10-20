
import axios from "axios";
export const DOCUMENTS_URL = "Document";
// CREATE = add a new documents to the server 
export function createDocument(documents) { 
  return axios.post(`${DOCUMENTS_URL}/post`, documents); 
}
// READ  
export function getAllDocuments() {
  return axios.get(`${DOCUMENTS_URL}/get`);
}
export function getDocumentById(documentsId) {
  return axios.get(`${DOCUMENTS_URL}/get/${documentsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findDocuments(queryParams) {
  return axios.post(`${DOCUMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateDocument(id, documents) {
  return axios.put(`${DOCUMENTS_URL}/put/${id}`, documents);
}
// UPDATE Status  
export function updateStatusForDocuments(ids, status) {
  return axios.post(`${DOCUMENTS_URL}/updateStatusForDocuments`, {
    ids,
    status,
  });
}
// DELETE = the documents from the server  
export function deleteDocument(documentsId) {
  return axios.delete(`${DOCUMENTS_URL}/delete/${documentsId}`);
}
// DELETE Documents by ids  
export function deleteDocuments(ids) {
return axios.post(`${DOCUMENTS_URL}/deleteDocuments`, ids);
}