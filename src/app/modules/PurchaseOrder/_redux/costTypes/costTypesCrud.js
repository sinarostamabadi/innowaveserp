import axios from "axios";
export const COSTTYPES_URL = "CostType";
// CREATE = add a new costTypes to the server
export function createCostType(costTypes) {
  return axios.post(`${COSTTYPES_URL}/post`, costTypes);
}
// READ
export function getAllCostTypes() {
  return axios.get(`${COSTTYPES_URL}/getAll`);
}
export function getCostTypeById(costTypesId) {
  return axios.get(`${COSTTYPES_URL}/get/${costTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCostTypes(queryParams) {
  return axios.post(`${COSTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCostType(id, costTypes) {
  return axios.put(`${COSTTYPES_URL}/put/${id}`, costTypes);
}
// UPDATE Status
export function updateStatusForCostTypes(ids, status) {
  return axios.post(`${COSTTYPES_URL}/updateStatusForCostTypes`, {
    ids,
    status,
  });
}
// DELETE = the costTypes from the server
export function deleteCostType(costTypesId) {
  return axios.delete(`${COSTTYPES_URL}/delete/${costTypesId}`);
}
// DELETE CostTypes by ids
export function deleteCostTypes(ids) {
  return axios.post(`${COSTTYPES_URL}/deleteCostTypes`, ids);
}
