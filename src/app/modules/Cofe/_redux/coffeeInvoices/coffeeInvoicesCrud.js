
import axios from "axios";
export const COFFEEINVOICES_URL = "CoffeeInvoice";
// CREATE = add a new coffeeInvoices to the server 
export function createCoffeeInvoice(coffeeInvoices) { 
  return axios.post(`${COFFEEINVOICES_URL}/post`, coffeeInvoices); 
}
// READ  
export function getAllCoffeeInvoices() {
  return axios.get(`${COFFEEINVOICES_URL}/get`);
}
export function getCoffeeInvoiceById(coffeeInvoicesId) {
  return axios.get(`${COFFEEINVOICES_URL}/get/${coffeeInvoicesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCoffeeInvoices(queryParams) {
  return axios.post(`${COFFEEINVOICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCoffeeInvoice(id, coffeeInvoices) {
  return axios.put(`${COFFEEINVOICES_URL}/put/${id}`, coffeeInvoices);
}
// UPDATE Status  
export function updateStatusForCoffeeInvoices(ids, status) {
  return axios.post(`${COFFEEINVOICES_URL}/updateStatusForCoffeeInvoices`, {
    ids,
    status,
  });
}
// DELETE = the coffeeInvoices from the server  
export function deleteCoffeeInvoice(coffeeInvoicesId) {
  return axios.delete(`${COFFEEINVOICES_URL}/delete/${coffeeInvoicesId}`);
}
// DELETE CoffeeInvoices by ids  
export function deleteCoffeeInvoices(ids) {
return axios.post(`${COFFEEINVOICES_URL}/deleteCoffeeInvoices`, ids);
}