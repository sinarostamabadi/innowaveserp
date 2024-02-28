import axios from "axios";
export const COFFEEINVOICEDISCOUNTS_URL = "CoffeeInvoiceDiscount";
// CREATE = add a new coffeeInvoiceDiscounts to the server
export function createCoffeeInvoiceDiscount(coffeeInvoiceDiscounts) {
  return axios.post(
    `${COFFEEINVOICEDISCOUNTS_URL}/post`,
    coffeeInvoiceDiscounts
  );
}
// READ
export function getAllCoffeeInvoiceDiscounts() {
  return axios.get(`${COFFEEINVOICEDISCOUNTS_URL}/get`);
}
export function getCoffeeInvoiceDiscountById(coffeeInvoiceDiscountsId) {
  return axios.get(
    `${COFFEEINVOICEDISCOUNTS_URL}/get/${coffeeInvoiceDiscountsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoffeeInvoiceDiscounts(queryParams) {
  return axios.post(`${COFFEEINVOICEDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoffeeInvoiceDiscount(id, coffeeInvoiceDiscounts) {
  return axios.put(
    `${COFFEEINVOICEDISCOUNTS_URL}/put/${id}`,
    coffeeInvoiceDiscounts
  );
}
// UPDATE Status
export function updateStatusForCoffeeInvoiceDiscounts(ids, status) {
  return axios.post(
    `${COFFEEINVOICEDISCOUNTS_URL}/updateStatusForCoffeeInvoiceDiscounts`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the coffeeInvoiceDiscounts from the server
export function deleteCoffeeInvoiceDiscount(coffeeInvoiceDiscountsId) {
  return axios.delete(
    `${COFFEEINVOICEDISCOUNTS_URL}/delete/${coffeeInvoiceDiscountsId}`
  );
}
// DELETE CoffeeInvoiceDiscounts by ids
export function deleteCoffeeInvoiceDiscounts(ids) {
  return axios.post(
    `${COFFEEINVOICEDISCOUNTS_URL}/deleteCoffeeInvoiceDiscounts`,
    ids
  );
}
