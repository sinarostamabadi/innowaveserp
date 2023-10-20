
import axios from "axios";
export const ROLEPERMISSIONSES_URL = "RolePermissions";
// CREATE = add a new rolePermissionses to the server 
export function createRolePermissions(rolePermissionses) { 
  return axios.post(`${ROLEPERMISSIONSES_URL}/post`, rolePermissionses); 
}
// READ  
export function getAllRolePermissionses() {
  return axios.get(`${ROLEPERMISSIONSES_URL}/get`);
}
export function getRolePermissionsById(rolePermissionsesId) {
  return axios.get(`${ROLEPERMISSIONSES_URL}/get/${rolePermissionsesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRolePermissionses(queryParams) {
  return axios.post(`${ROLEPERMISSIONSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRolePermissions(id, rolePermissionses) {
  return axios.put(`${ROLEPERMISSIONSES_URL}/put/${id}`, rolePermissionses);
}
// UPDATE Status  
export function updateStatusForRolePermissionses(ids, status) {
  return axios.post(`${ROLEPERMISSIONSES_URL}/updateStatusForRolePermissionses`, {
    ids,
    status,
  });
}
// DELETE = the rolePermissionses from the server  
export function deleteRolePermissions(rolePermissionsesId) {
  return axios.delete(`${ROLEPERMISSIONSES_URL}/delete/${rolePermissionsesId}`);
}
// DELETE RolePermissionses by ids  
export function deleteRolePermissionses(ids) {
return axios.post(`${ROLEPERMISSIONSES_URL}/deleteRolePermissionses`, ids);
}