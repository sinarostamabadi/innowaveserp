
import axios from "axios";
export const MENUITEMRATES_URL = "MenuItemRate";
// CREATE = add a new menuItemRates to the server 
export function createMenuItemRate(menuItemRates) { 
  return axios.post(`${MENUITEMRATES_URL}/post`, menuItemRates); 
}
// READ  
export function getAllMenuItemRates() {
  return axios.get(`${MENUITEMRATES_URL}/get`);
}
export function getMenuItemRateById(menuItemRatesId) {
  return axios.get(`${MENUITEMRATES_URL}/get/${menuItemRatesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMenuItemRates(queryParams) {
  return axios.post(`${MENUITEMRATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMenuItemRate(id, menuItemRates) {
  return axios.put(`${MENUITEMRATES_URL}/put/${id}`, menuItemRates);
}
// UPDATE Status  
export function updateStatusForMenuItemRates(ids, status) {
  return axios.post(`${MENUITEMRATES_URL}/updateStatusForMenuItemRates`, {
    ids,
    status,
  });
}
// DELETE = the menuItemRates from the server  
export function deleteMenuItemRate(menuItemRatesId) {
  return axios.delete(`${MENUITEMRATES_URL}/delete/${menuItemRatesId}`);
}
// DELETE MenuItemRates by ids  
export function deleteMenuItemRates(ids) {
return axios.post(`${MENUITEMRATES_URL}/deleteMenuItemRates`, ids);
}