import axios from "axios";
export const RESTAURANTMENUITEMRATES_URL = "RestaurantMenuItemRate";
// CREATE = add a new restaurantMenuItemRates to the server
export function createRestaurantMenuItemRate(restaurantMenuItemRates) {
  return axios.post(
    `${RESTAURANTMENUITEMRATES_URL}/post`,
    restaurantMenuItemRates
  );
}
// READ
export function getAllRestaurantMenuItemRates() {
  return axios.get(`${RESTAURANTMENUITEMRATES_URL}/get`);
}
export function getRestaurantMenuItemRateById(restaurantMenuItemRatesId) {
  return axios.get(
    `${RESTAURANTMENUITEMRATES_URL}/get/${restaurantMenuItemRatesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantMenuItemRates(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMRATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantMenuItemRate(id, restaurantMenuItemRates) {
  return axios.put(
    `${RESTAURANTMENUITEMRATES_URL}/put/${id}`,
    restaurantMenuItemRates
  );
}
// UPDATE Status
export function updateStatusForRestaurantMenuItemRates(ids, status) {
  return axios.post(
    `${RESTAURANTMENUITEMRATES_URL}/updateStatusForRestaurantMenuItemRates`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantMenuItemRates from the server
export function deleteRestaurantMenuItemRate(restaurantMenuItemRatesId) {
  return axios.delete(
    `${RESTAURANTMENUITEMRATES_URL}/delete/${restaurantMenuItemRatesId}`
  );
}
// DELETE RestaurantMenuItemRates by ids
export function deleteRestaurantMenuItemRates(ids) {
  return axios.post(
    `${RESTAURANTMENUITEMRATES_URL}/deleteRestaurantMenuItemRates`,
    ids
  );
}
