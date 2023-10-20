
import axios from "axios";
export const USERSERVICEITEMS_URL = "UserServiceItem";
// CREATE = add a new userServiceItems to the server 
export function createUserServiceItem(userServiceItems) { 
  return axios.post(`${USERSERVICEITEMS_URL}/post`, userServiceItems); 
}
// READ  
export function getAllUserServiceItems() {
  return axios.get(`${USERSERVICEITEMS_URL}/get`);
}
export function getUserServiceItemById(userServiceItemsId) {
  return axios.get(`${USERSERVICEITEMS_URL}/get/${userServiceItemsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findUserServiceItems(queryParams) {
  return axios.post(`${USERSERVICEITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateUserServiceItem(id, userServiceItems) {
  return axios.put(`${USERSERVICEITEMS_URL}/put/${id}`, userServiceItems);
}
// UPDATE Status  
export function updateStatusForUserServiceItems(ids, status) {
  return axios.post(`${USERSERVICEITEMS_URL}/updateStatusForUserServiceItems`, {
    ids,
    status,
  });
}
// DELETE = the userServiceItems from the server  
export function deleteUserServiceItem(userServiceItemsId) {
  return axios.delete(`${USERSERVICEITEMS_URL}/delete/${userServiceItemsId}`);
}
// DELETE UserServiceItems by ids  
export function deleteUserServiceItems(ids) {
return axios.post(`${USERSERVICEITEMS_URL}/deleteUserServiceItems`, ids);
}