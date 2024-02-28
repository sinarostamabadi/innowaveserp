import axios from "axios";
export const MENUITEMS_URL = "MenuItem";
// CREATE = add a new menuItems to the server
export function createMenuItem(menuItems) {
  return axios.post(`${MENUITEMS_URL}/post`, menuItems);
}
// READ
export function getAllMenuItems() {
  return axios.get(`${MENUITEMS_URL}/get`);
}
export function getMenuItemById(menuItemsId) {
  return axios.get(`${MENUITEMS_URL}/get/${menuItemsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMenuItems(queryParams) {
  return axios.post(`${MENUITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMenuItem(id, menuItems) {
  return axios.put(`${MENUITEMS_URL}/put/${id}`, menuItems);
}
// UPDATE Status
export function updateStatusForMenuItems(ids, status) {
  return axios.post(`${MENUITEMS_URL}/updateStatusForMenuItems`, {
    ids,
    status,
  });
}
// DELETE = the menuItems from the server
export function deleteMenuItem(menuItemsId) {
  return axios.delete(`${MENUITEMS_URL}/delete/${menuItemsId}`);
}
// DELETE MenuItems by ids
export function deleteMenuItems(ids) {
  return axios.post(`${MENUITEMS_URL}/deleteMenuItems`, ids);
}
