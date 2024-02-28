import axios from "axios";
export const MENUGROUPS_URL = "MenuGroup";
// CREATE = add a new menuGroups to the server
export function createMenuGroup(menuGroups) {
  return axios.post(`${MENUGROUPS_URL}/post`, menuGroups);
}
// READ
export function getAllMenuGroups() {
  return axios.get(`${MENUGROUPS_URL}/get`);
}
export function getMenuGroupById(menuGroupsId) {
  return axios.get(`${MENUGROUPS_URL}/get/${menuGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMenuGroups(queryParams) {
  return axios.post(`${MENUGROUPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMenuGroup(id, menuGroups) {
  return axios.put(`${MENUGROUPS_URL}/put/${id}`, menuGroups);
}
// UPDATE Status
export function updateStatusForMenuGroups(ids, status) {
  return axios.post(`${MENUGROUPS_URL}/updateStatusForMenuGroups`, {
    ids,
    status,
  });
}
// DELETE = the menuGroups from the server
export function deleteMenuGroup(menuGroupsId) {
  return axios.delete(`${MENUGROUPS_URL}/delete/${menuGroupsId}`);
}
// DELETE MenuGroups by ids
export function deleteMenuGroups(ids) {
  return axios.post(`${MENUGROUPS_URL}/deleteMenuGroups`, ids);
}
