import axios from "axios";
export const COFFEESHOPDISCOUNTTYPES_URL = "CoffeeShopDiscountType";
// CREATE = add a new coffeeShopDiscountTypes to the server
export function createCoffeeShopDiscountType(coffeeShopDiscountTypes) {
  return axios.post(
    `${COFFEESHOPDISCOUNTTYPES_URL}/post`,
    coffeeShopDiscountTypes
  );
}
// READ
export function getAllCoffeeShopDiscountTypes() {
  return axios.get(`${COFFEESHOPDISCOUNTTYPES_URL}/get`);
}
export function getCoffeeShopDiscountTypeById(coffeeShopDiscountTypesId) {
  return axios.get(
    `${COFFEESHOPDISCOUNTTYPES_URL}/get/${coffeeShopDiscountTypesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoffeeShopDiscountTypes(queryParams) {
  return axios.post(`${COFFEESHOPDISCOUNTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoffeeShopDiscountType(id, coffeeShopDiscountTypes) {
  return axios.put(
    `${COFFEESHOPDISCOUNTTYPES_URL}/put/${id}`,
    coffeeShopDiscountTypes
  );
}
// UPDATE Status
export function updateStatusForCoffeeShopDiscountTypes(ids, status) {
  return axios.post(
    `${COFFEESHOPDISCOUNTTYPES_URL}/updateStatusForCoffeeShopDiscountTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the coffeeShopDiscountTypes from the server
export function deleteCoffeeShopDiscountType(coffeeShopDiscountTypesId) {
  return axios.delete(
    `${COFFEESHOPDISCOUNTTYPES_URL}/delete/${coffeeShopDiscountTypesId}`
  );
}
// DELETE CoffeeShopDiscountTypes by ids
export function deleteCoffeeShopDiscountTypes(ids) {
  return axios.post(
    `${COFFEESHOPDISCOUNTTYPES_URL}/deleteCoffeeShopDiscountTypes`,
    ids
  );
}
