import axios from "axios";
export const TECHNICALTYPES_URL = "TechnicalType";
// CREATE = add a new technicalTypes to the server
export function createTechnicalType(technicalTypes) {
  return axios.post(`${TECHNICALTYPES_URL}/post`, technicalTypes);
}
// READ
export function getAllTechnicalTypes() {
  return axios.get(`${TECHNICALTYPES_URL}/get`);
}
export function getTechnicalTypeById(technicalTypesId) {
  return axios.get(`${TECHNICALTYPES_URL}/get/${technicalTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findTechnicalTypes(queryParams) {
  return axios.post(`${TECHNICALTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateTechnicalType(id, technicalTypes) {
  return axios.put(`${TECHNICALTYPES_URL}/put/${id}`, technicalTypes);
}
// UPDATE Status
export function updateStatusForTechnicalTypes(ids, status) {
  return axios.post(`${TECHNICALTYPES_URL}/updateStatusForTechnicalTypes`, {
    ids,
    status,
  });
}
// DELETE = the technicalTypes from the server
export function deleteTechnicalType(technicalTypesId) {
  return axios.delete(`${TECHNICALTYPES_URL}/delete/${technicalTypesId}`);
}
// DELETE TechnicalTypes by ids
export function deleteTechnicalTypes(ids) {
  return axios.post(`${TECHNICALTYPES_URL}/deleteTechnicalTypes`, ids);
}
