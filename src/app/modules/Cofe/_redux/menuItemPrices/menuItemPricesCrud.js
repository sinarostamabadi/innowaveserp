import axios from "axios";
export const MENUITEMPRICES_URL = "MenuItemPrice";
// CREATE = add a new menuItemPrices to the server
export function createMenuItemPrice(menuItemPrices) {
  return axios.post(`${MENUITEMPRICES_URL}/post`, menuItemPrices);
}
// READ
export function getAllMenuItemPrices() {
  return axios.get(`${MENUITEMPRICES_URL}/get`);
}
export function getMenuItemPriceById(menuItemPricesId) {
  return axios.get(`${MENUITEMPRICES_URL}/get/${menuItemPricesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMenuItemPrices(queryParams) {
  return axios.post(`${MENUITEMPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMenuItemPrice(id, menuItemPrices) {
  return axios.put(`${MENUITEMPRICES_URL}/put/${id}`, menuItemPrices);
}
// UPDATE Status
export function updateStatusForMenuItemPrices(ids, status) {
  return axios.post(`${MENUITEMPRICES_URL}/updateStatusForMenuItemPrices`, {
    ids,
    status,
  });
}
// DELETE = the menuItemPrices from the server
export function deleteMenuItemPrice(menuItemPricesId) {
  return axios.delete(`${MENUITEMPRICES_URL}/delete/${menuItemPricesId}`);
}
// DELETE MenuItemPrices by ids
export function deleteMenuItemPrices(ids) {
  return axios.post(`${MENUITEMPRICES_URL}/deleteMenuItemPrices`, ids);
}
