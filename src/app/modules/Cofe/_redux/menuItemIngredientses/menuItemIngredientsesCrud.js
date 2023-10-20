
import axios from "axios";
export const MENUITEMINGREDIENTSES_URL = "MenuItemIngredients";
// CREATE = add a new menuItemIngredientses to the server 
export function createMenuItemIngredients(menuItemIngredientses) { 
  return axios.post(`${MENUITEMINGREDIENTSES_URL}/post`, menuItemIngredientses); 
}
// READ  
export function getAllMenuItemIngredientses() {
  return axios.get(`${MENUITEMINGREDIENTSES_URL}/get`);
}
export function getMenuItemIngredientsById(menuItemIngredientsesId) {
  return axios.get(`${MENUITEMINGREDIENTSES_URL}/get/${menuItemIngredientsesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMenuItemIngredientses(queryParams) {
  return axios.post(`${MENUITEMINGREDIENTSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMenuItemIngredients(id, menuItemIngredientses) {
  return axios.put(`${MENUITEMINGREDIENTSES_URL}/put/${id}`, menuItemIngredientses);
}
// UPDATE Status  
export function updateStatusForMenuItemIngredientses(ids, status) {
  return axios.post(`${MENUITEMINGREDIENTSES_URL}/updateStatusForMenuItemIngredientses`, {
    ids,
    status,
  });
}
// DELETE = the menuItemIngredientses from the server  
export function deleteMenuItemIngredients(menuItemIngredientsesId) {
  return axios.delete(`${MENUITEMINGREDIENTSES_URL}/delete/${menuItemIngredientsesId}`);
}
// DELETE MenuItemIngredientses by ids  
export function deleteMenuItemIngredientses(ids) {
return axios.post(`${MENUITEMINGREDIENTSES_URL}/deleteMenuItemIngredientses`, ids);
}