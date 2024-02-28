import axios from "axios";
export const OPERATIONTYPES_URL = "OperationType";
// CREATE = add a new operationTypes to the server
export function createOperationType(operationTypes) {
  return axios.post(`${OPERATIONTYPES_URL}/post`, operationTypes);
}
// READ
export function getAllOperationTypes() {
  return axios.get(`${OPERATIONTYPES_URL}/get`);
}
export function getOperationTypeById(operationTypesId) {
  return axios.get(`${OPERATIONTYPES_URL}/get/${operationTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findOperationTypes(queryParams) {
  return axios.post(`${OPERATIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateOperationType(id, operationTypes) {
  return axios.put(`${OPERATIONTYPES_URL}/put/${id}`, operationTypes);
}
// UPDATE Status
export function updateStatusForOperationTypes(ids, status) {
  return axios.post(`${OPERATIONTYPES_URL}/updateStatusForOperationTypes`, {
    ids,
    status,
  });
}
// DELETE = the operationTypes from the server
export function deleteOperationType(operationTypesId) {
  return axios.delete(`${OPERATIONTYPES_URL}/delete/${operationTypesId}`);
}
// DELETE OperationTypes by ids
export function deleteOperationTypes(ids) {
  return axios.post(`${OPERATIONTYPES_URL}/deleteOperationTypes`, ids);
}
