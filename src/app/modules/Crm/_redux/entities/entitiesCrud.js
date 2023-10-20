
import axios from "axios";
export const ENTITIES_URL = "Entity";
// CREATE = add a new entities to the server 
export function createEntity(entities) { 
  return axios.post(`${ENTITIES_URL}/post`, entities); 
}
// READ  
export function getAllEntities() {
  return axios.get(`${ENTITIES_URL}/getAll`);
}
export function getEntityById(entitiesId) {
  return axios.get(`${ENTITIES_URL}/get/${entitiesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEntities(queryParams) {
  return axios.post(`${ENTITIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEntity(id, entities) {
  return axios.put(`${ENTITIES_URL}/put/${id}`, entities);
}
// UPDATE Status  
export function updateStatusForEntities(ids, status) {
  return axios.post(`${ENTITIES_URL}/updateStatusForEntities`, {
    ids,
    status,
  });
}
// DELETE = the entities from the server  
export function deleteEntity(entitiesId) {
  return axios.delete(`${ENTITIES_URL}/delete/${entitiesId}`);
}
// DELETE Entities by ids  
export function deleteEntities(ids) {
return axios.post(`${ENTITIES_URL}/deleteEntities`, ids);
}

// SUGGESION Entities
export function suggestEntity(query) {
  return axios.post(`${ENTITIES_URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}