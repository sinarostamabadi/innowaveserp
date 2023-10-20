
import axios from "axios";
export const USERINROLESES_URL = "UserInRoles";
// CREATE = add a new userInRoleses to the server 
export function createUserInRoles(userInRoleses) { 
  return axios.post(`${USERINROLESES_URL}/post`, userInRoleses); 
}
// READ  
export function getAllUserInRoleses() {
  return axios.get(`${USERINROLESES_URL}/get`);
}
export function getUserInRolesById(userInRolesesId) {
  return axios.get(`${USERINROLESES_URL}/get/${userInRolesesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findUserInRoleses(queryParams) {
  return axios.post(`${USERINROLESES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateUserInRoles(id, userInRoleses) {
  return axios.put(`${USERINROLESES_URL}/put/${id}`, userInRoleses);
}
// UPDATE Status  
export function updateStatusForUserInRoleses(ids, status) {
  return axios.post(`${USERINROLESES_URL}/updateStatusForUserInRoleses`, {
    ids,
    status,
  });
}
// DELETE = the userInRoleses from the server  
export function deleteUserInRoles(userInRolesesId) {
  return axios.delete(`${USERINROLESES_URL}/delete/${userInRolesesId}`);
}
// DELETE UserInRoleses by ids  
export function deleteUserInRoleses(ids) {
return axios.post(`${USERINROLESES_URL}/deleteUserInRoleses`, ids);
}