
import axios from "axios";
export const RESTAURANTCOSTTYPES_URL = "RestaurantCostType";
// CREATE = add a new restaurantCostTypes to the server 
export function createRestaurantCostType(restaurantCostTypes) { 
  return axios.post(`${RESTAURANTCOSTTYPES_URL}/post`, restaurantCostTypes); 
}
// READ  
export function getAllRestaurantCostTypes() {
  return axios.get(`${RESTAURANTCOSTTYPES_URL}/get`);
}
export function getRestaurantCostTypeById(restaurantCostTypesId) {
  return axios.get(`${RESTAURANTCOSTTYPES_URL}/get/${restaurantCostTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantCostTypes(queryParams) {
  return axios.post(`${RESTAURANTCOSTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantCostType(id, restaurantCostTypes) {
  return axios.put(`${RESTAURANTCOSTTYPES_URL}/put/${id}`, restaurantCostTypes);
}
// UPDATE Status  
export function updateStatusForRestaurantCostTypes(ids, status) {
  return axios.post(`${RESTAURANTCOSTTYPES_URL}/updateStatusForRestaurantCostTypes`, {
    ids,
    status,
  });
}
// DELETE = the restaurantCostTypes from the server  
export function deleteRestaurantCostType(restaurantCostTypesId) {
  return axios.delete(`${RESTAURANTCOSTTYPES_URL}/delete/${restaurantCostTypesId}`);
}
// DELETE RestaurantCostTypes by ids  
export function deleteRestaurantCostTypes(ids) {
return axios.post(`${RESTAURANTCOSTTYPES_URL}/deleteRestaurantCostTypes`, ids);
}