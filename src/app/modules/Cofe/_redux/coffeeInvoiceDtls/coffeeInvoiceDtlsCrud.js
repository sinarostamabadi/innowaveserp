import axios from "axios";
export const COFFEEINVOICEDTLS_URL = "CoffeeInvoiceDtl";
// CREATE = add a new coffeeInvoiceDtls to the server
export function createCoffeeInvoiceDtl(coffeeInvoiceDtls) {
  return axios.post(`${COFFEEINVOICEDTLS_URL}/post`, coffeeInvoiceDtls);
}
// READ
export function getAllCoffeeInvoiceDtls() {
  return axios.get(`${COFFEEINVOICEDTLS_URL}/get`);
}
export function getCoffeeInvoiceDtlById(coffeeInvoiceDtlsId) {
  return axios.get(`${COFFEEINVOICEDTLS_URL}/get/${coffeeInvoiceDtlsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoffeeInvoiceDtls(queryParams) {
  return axios.post(`${COFFEEINVOICEDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoffeeInvoiceDtl(id, coffeeInvoiceDtls) {
  return axios.put(`${COFFEEINVOICEDTLS_URL}/put/${id}`, coffeeInvoiceDtls);
}
// UPDATE Status
export function updateStatusForCoffeeInvoiceDtls(ids, status) {
  return axios.post(
    `${COFFEEINVOICEDTLS_URL}/updateStatusForCoffeeInvoiceDtls`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the coffeeInvoiceDtls from the server
export function deleteCoffeeInvoiceDtl(coffeeInvoiceDtlsId) {
  return axios.delete(`${COFFEEINVOICEDTLS_URL}/delete/${coffeeInvoiceDtlsId}`);
}
// DELETE CoffeeInvoiceDtls by ids
export function deleteCoffeeInvoiceDtls(ids) {
  return axios.post(`${COFFEEINVOICEDTLS_URL}/deleteCoffeeInvoiceDtls`, ids);
}
