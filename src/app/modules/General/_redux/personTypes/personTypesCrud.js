import axios from "axios";
export const PERSONTYPES_URL = "PersonType";
// CREATE = add a new personTypes to the server
export function createPersonType(personTypes) {
  return axios.post(`${PERSONTYPES_URL}/post`, personTypes);
}
// READ
export function getAllPersonTypes() {
  return axios.get(`${PERSONTYPES_URL}/getall`);
}
export function getPersonTypeById(personTypesId) {
  return axios.get(`${PERSONTYPES_URL}/get/${personTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPersonTypes(queryParams) {
  return axios.post(`${PERSONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePersonType(id, personTypes) {
  return axios.put(`${PERSONTYPES_URL}/put/${id}`, personTypes);
}
// UPDATE Status
export function updateStatusForPersonTypes(ids, status) {
  return axios.post(`${PERSONTYPES_URL}/updateStatusForPersonTypes`, {
    ids,
    status,
  });
}
// DELETE = the personTypes from the server
export function deletePersonType(personTypesId) {
  return axios.delete(`${PERSONTYPES_URL}/delete/${personTypesId}`);
}
// DELETE PersonTypes by ids
export function deletePersonTypes(ids) {
  return axios.post(`${PERSONTYPES_URL}/deletePersonTypes`, ids);
}
