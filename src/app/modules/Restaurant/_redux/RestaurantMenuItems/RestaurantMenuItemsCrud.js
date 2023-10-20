
import axios from "axios";
export const RESTAURANTMENUITEMS_URL = "RestaurantMenuItem";
// CREATE = add a new restaurantMenuItems to the server 
export function createRestaurantMenuItem(restaurantMenuItems) { 
  return axios.post(`${RESTAURANTMENUITEMS_URL}/post`, restaurantMenuItems); 
}
// READ  
export function getAllRestaurantMenuItems() {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, {"Filters":[],"OrderBy":"NameFa asc","PageNumber":1,"PageSize":200});
}
export function getRestaurantMenuItemById(restaurantMenuItemsId) {
  return axios.get(`${RESTAURANTMENUITEMS_URL}/get/${restaurantMenuItemsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantMenuItems(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantMenuItem(id, restaurantMenuItems) {
  return axios.put(`${RESTAURANTMENUITEMS_URL}/put/${id}`, restaurantMenuItems);
}
// UPDATE Status  
export function updateStatusForRestaurantMenuItems(ids, status) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/updateStatusForRestaurantMenuItems`, {
    ids,
    status,
  });
}
// DELETE = the restaurantMenuItems from the server  
export function deleteRestaurantMenuItem(restaurantMenuItemsId) {
  return axios.delete(`${RESTAURANTMENUITEMS_URL}/delete/${restaurantMenuItemsId}`);
}
// DELETE RestaurantMenuItems by ids  
export function deleteRestaurantMenuItems(ids) {
return axios.post(`${RESTAURANTMENUITEMS_URL}/deleteRestaurantMenuItems`, ids);
}

// SUGGESTION MenuItem  
export function suggestionMenuItem(code) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/Suggestion`, {term: code});
}