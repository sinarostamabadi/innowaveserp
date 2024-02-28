import axios from "axios";
export const SOLDIERSHIPTYPES_URL = "SoldiershipType";
// CREATE = add a new soldiershipTypes to the server
export function createSoldiershipType(soldiershipTypes) {
  return axios.post(`${SOLDIERSHIPTYPES_URL}/post`, soldiershipTypes);
}
// READ
export function getAllSoldiershipTypes() {
  return axios.get(`${SOLDIERSHIPTYPES_URL}/get`);
}
export function getSoldiershipTypeById(soldiershipTypesId) {
  return axios.get(`${SOLDIERSHIPTYPES_URL}/get/${soldiershipTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findSoldiershipTypes(queryParams) {
  return axios.post(`${SOLDIERSHIPTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateSoldiershipType(id, soldiershipTypes) {
  return axios.put(`${SOLDIERSHIPTYPES_URL}/put/${id}`, soldiershipTypes);
}
// UPDATE Status
export function updateStatusForSoldiershipTypes(ids, status) {
  return axios.post(`${SOLDIERSHIPTYPES_URL}/updateStatusForSoldiershipTypes`, {
    ids,
    status,
  });
}
// DELETE = the soldiershipTypes from the server
export function deleteSoldiershipType(soldiershipTypesId) {
  return axios.delete(`${SOLDIERSHIPTYPES_URL}/delete/${soldiershipTypesId}`);
}
// DELETE SoldiershipTypes by ids
export function deleteSoldiershipTypes(ids) {
  return axios.post(`${SOLDIERSHIPTYPES_URL}/deleteSoldiershipTypes`, ids);
}
