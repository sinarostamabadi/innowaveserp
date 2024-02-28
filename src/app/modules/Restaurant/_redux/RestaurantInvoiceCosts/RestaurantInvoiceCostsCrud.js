import axios from "axios";
export const RESTAURANTINVOICECOSTS_URL = "RestaurantInvoiceCost";
// CREATE = add a new restaurantInvoiceCosts to the server
export function createRestaurantInvoiceCost(restaurantInvoiceCosts) {
  return axios.post(
    `${RESTAURANTINVOICECOSTS_URL}/post`,
    restaurantInvoiceCosts
  );
}
// READ
export function getAllRestaurantInvoiceCosts() {
  return axios.get(`${RESTAURANTINVOICECOSTS_URL}/get`);
}
export function getRestaurantInvoiceCostById(restaurantInvoiceCostsId) {
  return axios.get(
    `${RESTAURANTINVOICECOSTS_URL}/get/${restaurantInvoiceCostsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantInvoiceCosts(queryParams) {
  return axios.post(`${RESTAURANTINVOICECOSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantInvoiceCost(id, restaurantInvoiceCosts) {
  return axios.put(
    `${RESTAURANTINVOICECOSTS_URL}/put/${id}`,
    restaurantInvoiceCosts
  );
}
// UPDATE Status
export function updateStatusForRestaurantInvoiceCosts(ids, status) {
  return axios.post(
    `${RESTAURANTINVOICECOSTS_URL}/updateStatusForRestaurantInvoiceCosts`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantInvoiceCosts from the server
export function deleteRestaurantInvoiceCost(restaurantInvoiceCostsId) {
  return axios.delete(
    `${RESTAURANTINVOICECOSTS_URL}/delete/${restaurantInvoiceCostsId}`
  );
}
// DELETE RestaurantInvoiceCosts by ids
export function deleteRestaurantInvoiceCosts(ids) {
  return axios.post(
    `${RESTAURANTINVOICECOSTS_URL}/deleteRestaurantInvoiceCosts`,
    ids
  );
}
