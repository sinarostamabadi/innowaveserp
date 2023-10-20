
import axios from "axios";
export const RESTAURANTMENUITEMINGREDIENTS_URL = "RestaurantMenuItemIngredient";
// CREATE = add a new restaurantMenuItemIngredients to the server 
export function createRestaurantMenuItemIngredient(restaurantMenuItemIngredients) { 
  return axios.post(`${RESTAURANTMENUITEMINGREDIENTS_URL}/post`, restaurantMenuItemIngredients); 
}
// READ  
export function getAllRestaurantMenuItemIngredients() {
  return axios.get(`${RESTAURANTMENUITEMINGREDIENTS_URL}/get`);
}
export function getRestaurantMenuItemIngredientById(restaurantMenuItemIngredientsId) {
  return axios.get(`${RESTAURANTMENUITEMINGREDIENTS_URL}/get/${restaurantMenuItemIngredientsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantMenuItemIngredients(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMINGREDIENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantMenuItemIngredient(id, restaurantMenuItemIngredients) {
  return axios.put(`${RESTAURANTMENUITEMINGREDIENTS_URL}/put/${id}`, restaurantMenuItemIngredients);
}
// UPDATE Status  
export function updateStatusForRestaurantMenuItemIngredients(ids, status) {
  return axios.post(`${RESTAURANTMENUITEMINGREDIENTS_URL}/updateStatusForRestaurantMenuItemIngredients`, {
    ids,
    status,
  });
}
// DELETE = the restaurantMenuItemIngredients from the server  
export function deleteRestaurantMenuItemIngredient(restaurantMenuItemIngredientsId) {
  return axios.delete(`${RESTAURANTMENUITEMINGREDIENTS_URL}/delete/${restaurantMenuItemIngredientsId}`);
}
// DELETE RestaurantMenuItemIngredients by ids  
export function deleteRestaurantMenuItemIngredients(ids) {
return axios.post(`${RESTAURANTMENUITEMINGREDIENTS_URL}/deleteRestaurantMenuItemIngredients`, ids);
}