
import axios from "axios";
export const USERS_URL = "User";
// CREATE = add a new users to the server 
export function createUser(users) { 
  return axios.post(`${USERS_URL}/post`, users); 
}
// READ  
export function getAllUsers() {
  return axios.get(`${USERS_URL}/get`);
}
export function getUserById(usersId) {
  return axios.get(`${USERS_URL}/get/${usersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findUsers(queryParams) {
  return axios.post(`${USERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateUser(id, users) {
  return axios.put(`${USERS_URL}/put/${id}`, users);
}
// UPDATE Status  
export function updateStatusForUsers(ids, status) {
  return axios.post(`${USERS_URL}/updateStatusForUsers`, {
    ids,
    status,
  });
}
// DELETE = the users from the server  
export function deleteUser(usersId) {
  return axios.delete(`${USERS_URL}/delete/${usersId}`);
}
// DELETE Users by ids  
export function deleteUsers(ids) {
return axios.post(`${USERS_URL}/deleteUsers`, ids);
}