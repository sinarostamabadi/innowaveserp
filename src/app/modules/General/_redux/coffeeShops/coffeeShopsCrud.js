import axios from "axios";
export const COFFEESHOPS_URL = "CoffeeShop";
// CREATE = add a new coffeeShops to the server
export function createCoffeeShop(coffeeShops) {
  return axios.post(`${COFFEESHOPS_URL}/post`, coffeeShops);
}
// READ
export function getAllCoffeeShops() {
  return axios.get(`${COFFEESHOPS_URL}/get`);
}
export function getCoffeeShopById(coffeeShopsId) {
  return axios.get(`${COFFEESHOPS_URL}/get/${coffeeShopsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoffeeShops(queryParams) {
  return axios.post(`${COFFEESHOPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoffeeShop(id, coffeeShops) {
  return axios.put(`${COFFEESHOPS_URL}/put/${id}`, coffeeShops);
}
// UPDATE Status
export function updateStatusForCoffeeShops(ids, status) {
  return axios.post(`${COFFEESHOPS_URL}/updateStatusForCoffeeShops`, {
    ids,
    status,
  });
}
// DELETE = the coffeeShops from the server
export function deleteCoffeeShop(coffeeShopsId) {
  return axios.delete(`${COFFEESHOPS_URL}/delete/${coffeeShopsId}`);
}
// DELETE CoffeeShops by ids
export function deleteCoffeeShops(ids) {
  return axios.post(`${COFFEESHOPS_URL}/deleteCoffeeShops`, ids);
}
