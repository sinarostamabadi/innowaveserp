import axios from "axios";
export const CONTRACTENDTYPES_URL = "ContractEndType";
// CREATE = add a new contractEndTypes to the server
export function createContractEndType(contractEndTypes) {
  return axios.post(`${CONTRACTENDTYPES_URL}/post`, contractEndTypes);
}
// READ
export function getAllContractEndTypes() {
  return axios.get(`${CONTRACTENDTYPES_URL}/get`);
}
export function getContractEndTypeById(contractEndTypesId) {
  return axios.get(`${CONTRACTENDTYPES_URL}/get/${contractEndTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findContractEndTypes(queryParams) {
  return axios.post(`${CONTRACTENDTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateContractEndType(id, contractEndTypes) {
  return axios.put(`${CONTRACTENDTYPES_URL}/put/${id}`, contractEndTypes);
}
// UPDATE Status
export function updateStatusForContractEndTypes(ids, status) {
  return axios.post(`${CONTRACTENDTYPES_URL}/updateStatusForContractEndTypes`, {
    ids,
    status,
  });
}
// DELETE = the contractEndTypes from the server
export function deleteContractEndType(contractEndTypesId) {
  return axios.delete(`${CONTRACTENDTYPES_URL}/delete/${contractEndTypesId}`);
}
// DELETE ContractEndTypes by ids
export function deleteContractEndTypes(ids) {
  return axios.post(`${CONTRACTENDTYPES_URL}/deleteContractEndTypes`, ids);
}
