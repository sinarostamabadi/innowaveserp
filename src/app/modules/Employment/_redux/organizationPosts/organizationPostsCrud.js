
import axios from "axios";
export const ORGANIZATIONPOSTS_URL = "OrganizationPost";
// CREATE = add a new organizationPosts to the server 
export function createOrganizationPost(organizationPosts) { 
  return axios.post(`${ORGANIZATIONPOSTS_URL}/post`, organizationPosts); 
}
// READ  
export function getAllOrganizationPosts() {
  return axios.get(`${ORGANIZATIONPOSTS_URL}/get`);
}
export function getOrganizationPostById(organizationPostsId) {
  return axios.get(`${ORGANIZATIONPOSTS_URL}/get/${organizationPostsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findOrganizationPosts(queryParams) {
  return axios.post(`${ORGANIZATIONPOSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateOrganizationPost(id, organizationPosts) {
  return axios.put(`${ORGANIZATIONPOSTS_URL}/put/${id}`, organizationPosts);
}
// UPDATE Status  
export function updateStatusForOrganizationPosts(ids, status) {
  return axios.post(`${ORGANIZATIONPOSTS_URL}/updateStatusForOrganizationPosts`, {
    ids,
    status,
  });
}
// DELETE = the organizationPosts from the server  
export function deleteOrganizationPost(organizationPostsId) {
  return axios.delete(`${ORGANIZATIONPOSTS_URL}/delete/${organizationPostsId}`);
}
// DELETE OrganizationPosts by ids  
export function deleteOrganizationPosts(ids) {
return axios.post(`${ORGANIZATIONPOSTS_URL}/deleteOrganizationPosts`, ids);
}