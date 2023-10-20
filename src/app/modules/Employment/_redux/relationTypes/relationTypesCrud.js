
import axios from "axios";
export const RELATIONTYPES_URL = "RelationType";
// CREATE = add a new relationTypes to the server 
export function createRelationType(relationTypes) { 
  return axios.post(`${RELATIONTYPES_URL}/post`, relationTypes); 
}
// READ  
export function getAllRelationTypes() {
  return axios.get(`${RELATIONTYPES_URL}/get`);
}
export function getRelationTypeById(relationTypesId) {
  return axios.get(`${RELATIONTYPES_URL}/get/${relationTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRelationTypes(queryParams) {
  return axios.post(`${RELATIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRelationType(id, relationTypes) {
  return axios.put(`${RELATIONTYPES_URL}/put/${id}`, relationTypes);
}
// UPDATE Status  
export function updateStatusForRelationTypes(ids, status) {
  return axios.post(`${RELATIONTYPES_URL}/updateStatusForRelationTypes`, {
    ids,
    status,
  });
}
// DELETE = the relationTypes from the server  
export function deleteRelationType(relationTypesId) {
  return axios.delete(`${RELATIONTYPES_URL}/delete/${relationTypesId}`);
}
// DELETE RelationTypes by ids  
export function deleteRelationTypes(ids) {
return axios.post(`${RELATIONTYPES_URL}/deleteRelationTypes`, ids);
}