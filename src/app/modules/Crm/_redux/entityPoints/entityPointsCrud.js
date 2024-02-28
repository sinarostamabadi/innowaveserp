import axios from "axios";
export const PACKAGETYPES_URL = "EntityPoint";
// CREATE = add a new entityPoints to the server
export function createEntityPoint(entityPoints) {
  return axios.post(`${PACKAGETYPES_URL}/post`, entityPoints);
}
// READ
export function getAllEntityPoints() {
  return axios.get(`${PACKAGETYPES_URL}/getAll`);
}
export function getEntityPointById(entityPointsId) {
  return axios.get(`${PACKAGETYPES_URL}/get/${entityPointsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEntityPoints(queryParams) {
  return axios.post(`${PACKAGETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEntityPoint(id, entityPoints) {
  return axios.put(`${PACKAGETYPES_URL}/put/${id}`, entityPoints);
}
// UPDATE Status
export function updateStatusForEntityPoints(ids, status) {
  return axios.post(`${PACKAGETYPES_URL}/updateStatusForEntityPoints`, {
    ids,
    status,
  });
}
// DELETE = the entityPoints from the server
export function deleteEntityPoint(entityPointsId) {
  return axios.delete(`${PACKAGETYPES_URL}/delete/${entityPointsId}`);
}
// DELETE EntityPoints by ids
export function deleteEntityPoints(ids) {
  return axios.post(`${PACKAGETYPES_URL}/deleteEntityPoints`, ids);
}
