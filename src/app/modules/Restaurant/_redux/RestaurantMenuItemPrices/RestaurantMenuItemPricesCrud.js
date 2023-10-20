
import axios from "axios";
export const RESTAURANTMENUITEMPRICES_URL = "RestaurantMenuItemPrice";
// CREATE = add a new restaurantMenuItemPrices to the server 
export function createRestaurantMenuItemPrice(restaurantMenuItemPrices) { 
  return axios.post(`${RESTAURANTMENUITEMPRICES_URL}/post`, restaurantMenuItemPrices); 
}
// READ  
export function getAllRestaurantMenuItemPrices() {
  return axios.get(`${RESTAURANTMENUITEMPRICES_URL}/get`);
}
export function getRestaurantMenuItemPriceById(restaurantMenuItemPricesId) {
  return axios.get(`${RESTAURANTMENUITEMPRICES_URL}/get/${restaurantMenuItemPricesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantMenuItemPrices(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantMenuItemPrice(id, restaurantMenuItemPrices) {
  return axios.put(`${RESTAURANTMENUITEMPRICES_URL}/put/${id}`, restaurantMenuItemPrices);
}
// UPDATE Status  
export function updateStatusForRestaurantMenuItemPrices(ids, status) {
  return axios.post(`${RESTAURANTMENUITEMPRICES_URL}/updateStatusForRestaurantMenuItemPrices`, {
    ids,
    status,
  });
}
// DELETE = the restaurantMenuItemPrices from the server  
export function deleteRestaurantMenuItemPrice(restaurantMenuItemPricesId) {
  return axios.delete(`${RESTAURANTMENUITEMPRICES_URL}/delete/${restaurantMenuItemPricesId}`);
}
// DELETE RestaurantMenuItemPrices by ids  
export function deleteRestaurantMenuItemPrices(ids) {
return axios.post(`${RESTAURANTMENUITEMPRICES_URL}/deleteRestaurantMenuItemPrices`, ids);
}