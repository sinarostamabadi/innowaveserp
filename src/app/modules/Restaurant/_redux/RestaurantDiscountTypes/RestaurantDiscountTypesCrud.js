import axios from "axios";
export const RESTAURANTDISCOUNTTYPES_URL = "RestaurantDiscountType";
// CREATE = add a new restaurantDiscountTypes to the server
export function createRestaurantDiscountType(restaurantDiscountTypes) {
  return axios.post(
    `${RESTAURANTDISCOUNTTYPES_URL}/post`,
    restaurantDiscountTypes
  );
}
// READ
export function getAllRestaurantDiscountTypes() {
  return axios.get(`${RESTAURANTDISCOUNTTYPES_URL}/get`);
}
export function getRestaurantDiscountTypeById(restaurantDiscountTypesId) {
  return axios.get(
    `${RESTAURANTDISCOUNTTYPES_URL}/get/${restaurantDiscountTypesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantDiscountTypes(queryParams) {
  return axios.post(`${RESTAURANTDISCOUNTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantDiscountType(id, restaurantDiscountTypes) {
  return axios.put(
    `${RESTAURANTDISCOUNTTYPES_URL}/put/${id}`,
    restaurantDiscountTypes
  );
}
// UPDATE Status
export function updateStatusForRestaurantDiscountTypes(ids, status) {
  return axios.post(
    `${RESTAURANTDISCOUNTTYPES_URL}/updateStatusForRestaurantDiscountTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantDiscountTypes from the server
export function deleteRestaurantDiscountType(restaurantDiscountTypesId) {
  return axios.delete(
    `${RESTAURANTDISCOUNTTYPES_URL}/delete/${restaurantDiscountTypesId}`
  );
}
// DELETE RestaurantDiscountTypes by ids
export function deleteRestaurantDiscountTypes(ids) {
  return axios.post(
    `${RESTAURANTDISCOUNTTYPES_URL}/deleteRestaurantDiscountTypes`,
    ids
  );
}
