import axios from "axios";
export const COFFEEINVOICECOSTS_URL = "CoffeeInvoiceCost";
// CREATE = add a new coffeeInvoiceCosts to the server
export function createCoffeeInvoiceCost(coffeeInvoiceCosts) {
  return axios.post(`${COFFEEINVOICECOSTS_URL}/post`, coffeeInvoiceCosts);
}
// READ
export function getAllCoffeeInvoiceCosts() {
  return axios.get(`${COFFEEINVOICECOSTS_URL}/get`);
}
export function getCoffeeInvoiceCostById(coffeeInvoiceCostsId) {
  return axios.get(`${COFFEEINVOICECOSTS_URL}/get/${coffeeInvoiceCostsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoffeeInvoiceCosts(queryParams) {
  return axios.post(`${COFFEEINVOICECOSTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoffeeInvoiceCost(id, coffeeInvoiceCosts) {
  return axios.put(`${COFFEEINVOICECOSTS_URL}/put/${id}`, coffeeInvoiceCosts);
}
// UPDATE Status
export function updateStatusForCoffeeInvoiceCosts(ids, status) {
  return axios.post(
    `${COFFEEINVOICECOSTS_URL}/updateStatusForCoffeeInvoiceCosts`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the coffeeInvoiceCosts from the server
export function deleteCoffeeInvoiceCost(coffeeInvoiceCostsId) {
  return axios.delete(
    `${COFFEEINVOICECOSTS_URL}/delete/${coffeeInvoiceCostsId}`
  );
}
// DELETE CoffeeInvoiceCosts by ids
export function deleteCoffeeInvoiceCosts(ids) {
  return axios.post(`${COFFEEINVOICECOSTS_URL}/deleteCoffeeInvoiceCosts`, ids);
}
