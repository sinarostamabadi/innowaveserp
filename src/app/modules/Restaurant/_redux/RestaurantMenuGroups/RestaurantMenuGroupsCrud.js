import axios from "axios";
export const RESTAURANTMENUGROUPS_URL = "RestaurantMenuGroup";
// CREATE = add a new restaurantMenuGroups to the server
export function createRestaurantMenuGroup(restaurantMenuGroups) {
  return axios.post(`${RESTAURANTMENUGROUPS_URL}/post`, restaurantMenuGroups);
}
// READ
export function getAllRestaurantMenuGroups() {
  return axios.get(`${RESTAURANTMENUGROUPS_URL}/get`);
}
export function getRestaurantMenuGroupById(restaurantMenuGroupsId) {
  return axios.get(`${RESTAURANTMENUGROUPS_URL}/get/${restaurantMenuGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantMenuGroups(queryParams) {
  return axios.post(`${RESTAURANTMENUGROUPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantMenuGroup(id, restaurantMenuGroups) {
  return axios.put(
    `${RESTAURANTMENUGROUPS_URL}/put/${id}`,
    restaurantMenuGroups
  );
}
// UPDATE Status
export function updateStatusForRestaurantMenuGroups(ids, status) {
  return axios.post(
    `${RESTAURANTMENUGROUPS_URL}/updateStatusForRestaurantMenuGroups`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantMenuGroups from the server
export function deleteRestaurantMenuGroup(restaurantMenuGroupsId) {
  return axios.delete(
    `${RESTAURANTMENUGROUPS_URL}/delete/${restaurantMenuGroupsId}`
  );
}
// DELETE RestaurantMenuGroups by ids
export function deleteRestaurantMenuGroups(ids) {
  return axios.post(
    `${RESTAURANTMENUGROUPS_URL}/deleteRestaurantMenuGroups`,
    ids
  );
}
