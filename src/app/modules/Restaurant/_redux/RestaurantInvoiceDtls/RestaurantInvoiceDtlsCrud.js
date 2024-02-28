import axios from "axios";
export const RESTAURANTINVOICEDTLS_URL = "RestaurantInvoiceDtl";
// CREATE = add a new restaurantInvoiceDtls to the server
export function createRestaurantInvoiceDtl(restaurantInvoiceDtls) {
  return axios.post(`${RESTAURANTINVOICEDTLS_URL}/post`, restaurantInvoiceDtls);
}
// READ
export function getAllRestaurantInvoiceDtls() {
  return axios.get(`${RESTAURANTINVOICEDTLS_URL}/get`);
}
export function getRestaurantInvoiceDtlById(restaurantInvoiceDtlsId) {
  return axios.get(
    `${RESTAURANTINVOICEDTLS_URL}/get/${restaurantInvoiceDtlsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantInvoiceDtls(queryParams) {
  return axios.post(`${RESTAURANTINVOICEDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantInvoiceDtl(id, restaurantInvoiceDtls) {
  return axios.put(
    `${RESTAURANTINVOICEDTLS_URL}/put/${id}`,
    restaurantInvoiceDtls
  );
}
// UPDATE Status
export function updateStatusForRestaurantInvoiceDtls(ids, status) {
  return axios.post(
    `${RESTAURANTINVOICEDTLS_URL}/updateStatusForRestaurantInvoiceDtls`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantInvoiceDtls from the server
export function deleteRestaurantInvoiceDtl(restaurantInvoiceDtlsId) {
  return axios.delete(
    `${RESTAURANTINVOICEDTLS_URL}/delete/${restaurantInvoiceDtlsId}`
  );
}
// DELETE RestaurantInvoiceDtls by ids
export function deleteRestaurantInvoiceDtls(ids) {
  return axios.post(
    `${RESTAURANTINVOICEDTLS_URL}/deleteRestaurantInvoiceDtls`,
    ids
  );
}
