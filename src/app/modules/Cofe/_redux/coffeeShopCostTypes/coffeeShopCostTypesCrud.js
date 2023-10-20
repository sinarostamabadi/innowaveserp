
import axios from "axios";
export const COFFEESHOPCOSTTYPES_URL = "CoffeeShopCostType";
// CREATE = add a new coffeeShopCostTypes to the server 
export function createCoffeeShopCostType(coffeeShopCostTypes) { 
  return axios.post(`${COFFEESHOPCOSTTYPES_URL}/post`, coffeeShopCostTypes); 
}
// READ  
export function getAllCoffeeShopCostTypes() {
  return axios.get(`${COFFEESHOPCOSTTYPES_URL}/get`);
}
export function getCoffeeShopCostTypeById(coffeeShopCostTypesId) {
  return axios.get(`${COFFEESHOPCOSTTYPES_URL}/get/${coffeeShopCostTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCoffeeShopCostTypes(queryParams) {
  return axios.post(`${COFFEESHOPCOSTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCoffeeShopCostType(id, coffeeShopCostTypes) {
  return axios.put(`${COFFEESHOPCOSTTYPES_URL}/put/${id}`, coffeeShopCostTypes);
}
// UPDATE Status  
export function updateStatusForCoffeeShopCostTypes(ids, status) {
  return axios.post(`${COFFEESHOPCOSTTYPES_URL}/updateStatusForCoffeeShopCostTypes`, {
    ids,
    status,
  });
}
// DELETE = the coffeeShopCostTypes from the server  
export function deleteCoffeeShopCostType(coffeeShopCostTypesId) {
  return axios.delete(`${COFFEESHOPCOSTTYPES_URL}/delete/${coffeeShopCostTypesId}`);
}
// DELETE CoffeeShopCostTypes by ids  
export function deleteCoffeeShopCostTypes(ids) {
return axios.post(`${COFFEESHOPCOSTTYPES_URL}/deleteCoffeeShopCostTypes`, ids);
}