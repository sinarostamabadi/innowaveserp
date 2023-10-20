
import axios from "axios";
export const DOCUMENTTYPES_URL = "DocumentType";
// CREATE = add a new documentTypes to the server 
export function createDocumentType(documentTypes) { 
  return axios.post(`${DOCUMENTTYPES_URL}/post`, documentTypes); 
}
// READ  
export function getAllDocumentTypes() {
  return axios.get(`${DOCUMENTTYPES_URL}/getAll`);
}
export function getDocumentTypeById(documentTypesId) {
  return axios.get(`${DOCUMENTTYPES_URL}/get/${documentTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findDocumentTypes(queryParams) {
  return axios.post(`${DOCUMENTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateDocumentType(id, documentTypes) {
  return axios.put(`${DOCUMENTTYPES_URL}/put/${id}`, documentTypes);
}
// UPDATE Status  
export function updateStatusForDocumentTypes(ids, status) {
  return axios.post(`${DOCUMENTTYPES_URL}/updateStatusForDocumentTypes`, {
    ids,
    status,
  });
}
// DELETE = the documentTypes from the server  
export function deleteDocumentType(documentTypesId) {
  return axios.delete(`${DOCUMENTTYPES_URL}/delete/${documentTypesId}`);
}
// DELETE DocumentTypes by ids  
export function deleteDocumentTypes(ids) {
return axios.post(`${DOCUMENTTYPES_URL}/deleteDocumentTypes`, ids);
}