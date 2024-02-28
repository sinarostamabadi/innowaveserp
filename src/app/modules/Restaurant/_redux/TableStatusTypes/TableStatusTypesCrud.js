import axios from "axios";
export const TABLESTATUSTYPES_URL = "TableStatusType";
// CREATE = add a new tableStatusTypes to the server
export function createTableStatusType(tableStatusTypes) {
  return axios.post(`${TABLESTATUSTYPES_URL}/post`, tableStatusTypes);
}
// READ
export function getAllTableStatusTypes() {
  return axios.get(`${TABLESTATUSTYPES_URL}/get`);
}
export function getTableStatusTypeById(tableStatusTypesId) {
  return axios.get(`${TABLESTATUSTYPES_URL}/get/${tableStatusTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findTableStatusTypes(queryParams) {
  return axios.post(`${TABLESTATUSTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateTableStatusType(id, tableStatusTypes) {
  return axios.put(`${TABLESTATUSTYPES_URL}/put/${id}`, tableStatusTypes);
}
// UPDATE Status
export function updateStatusForTableStatusTypes(ids, status) {
  return axios.post(`${TABLESTATUSTYPES_URL}/updateStatusForTableStatusTypes`, {
    ids,
    status,
  });
}
// DELETE = the tableStatusTypes from the server
export function deleteTableStatusType(tableStatusTypesId) {
  return axios.delete(`${TABLESTATUSTYPES_URL}/delete/${tableStatusTypesId}`);
}
// DELETE TableStatusTypes by ids
export function deleteTableStatusTypes(ids) {
  return axios.post(`${TABLESTATUSTYPES_URL}/deleteTableStatusTypes`, ids);
}
