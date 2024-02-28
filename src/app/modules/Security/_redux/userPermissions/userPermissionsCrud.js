import axios from "axios";
export const USERPERMISSIONS_URL = "UserPermission";
// CREATE = add a new userPermissions to the server
export function createUserPermission(userPermissions) {
  return axios.post(`${USERPERMISSIONS_URL}/post`, userPermissions);
}
// READ
export function getAllUserPermissions() {
  return axios.get(`${USERPERMISSIONS_URL}/get`);
}
export function getUserPermissionById(userPermissionsId) {
  return axios.get(`${USERPERMISSIONS_URL}/get/${userPermissionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findUserPermissions(queryParams) {
  return axios.post(`${USERPERMISSIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateUserPermission(id, userPermissions) {
  return axios.put(`${USERPERMISSIONS_URL}/put/${id}`, userPermissions);
}
// UPDATE Status
export function updateStatusForUserPermissions(ids, status) {
  return axios.post(`${USERPERMISSIONS_URL}/updateStatusForUserPermissions`, {
    ids,
    status,
  });
}
// DELETE = the userPermissions from the server
export function deleteUserPermission(userPermissionsId) {
  return axios.delete(`${USERPERMISSIONS_URL}/delete/${userPermissionsId}`);
}
// DELETE UserPermissions by ids
export function deleteUserPermissions(ids) {
  return axios.post(`${USERPERMISSIONS_URL}/deleteUserPermissions`, ids);
}
