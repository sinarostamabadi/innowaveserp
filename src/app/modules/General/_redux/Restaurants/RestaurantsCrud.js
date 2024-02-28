import axios from "axios";
export const REATAURANTS_URL = "Restaurant";
// CREATE = add a new restaurants to the server
export function createRestaurant(restaurants) {
  return axios.post(`${REATAURANTS_URL}/post`, restaurants);
}
// READ
export function getAllRestaurants() {
  return axios.get(`${REATAURANTS_URL}/getAll`);
}
export function getRestaurantById(restaurantsId) {
  return axios.get(`${REATAURANTS_URL}/get/${restaurantsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurants(queryParams) {
  return axios.post(`${REATAURANTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurant(id, restaurants) {
  return axios.put(`${REATAURANTS_URL}/put/${id}`, restaurants);
}
// UPDATE Status
export function updateStatusForRestaurants(ids, status) {
  return axios.post(`${REATAURANTS_URL}/updateStatusForRestaurants`, {
    ids,
    status,
  });
}
// DELETE = the restaurants from the server
export function deleteRestaurant(restaurantsId) {
  return axios.delete(`${REATAURANTS_URL}/delete/${restaurantsId}`);
}
// DELETE Restaurants by ids
export function deleteRestaurants(ids) {
  return axios.post(`${REATAURANTS_URL}/deleteRestaurants`, ids);
}
