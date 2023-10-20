
import axios from "axios";
export const RESTAURANTINVOICEDISCOUNTS_URL = "RestaurantInvoiceDiscount";
// CREATE = add a new restaurantInvoiceDiscounts to the server 
export function createRestaurantInvoiceDiscount(restaurantInvoiceDiscounts) { 
  return axios.post(`${RESTAURANTINVOICEDISCOUNTS_URL}/post`, restaurantInvoiceDiscounts); 
}
// READ  
export function getAllRestaurantInvoiceDiscounts() {
  return axios.get(`${RESTAURANTINVOICEDISCOUNTS_URL}/get`);
}
export function getRestaurantInvoiceDiscountById(restaurantInvoiceDiscountsId) {
  return axios.get(`${RESTAURANTINVOICEDISCOUNTS_URL}/get/${restaurantInvoiceDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantInvoiceDiscounts(queryParams) {
  return axios.post(`${RESTAURANTINVOICEDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantInvoiceDiscount(id, restaurantInvoiceDiscounts) {
  return axios.put(`${RESTAURANTINVOICEDISCOUNTS_URL}/put/${id}`, restaurantInvoiceDiscounts);
}
// UPDATE Status  
export function updateStatusForRestaurantInvoiceDiscounts(ids, status) {
  return axios.post(`${RESTAURANTINVOICEDISCOUNTS_URL}/updateStatusForRestaurantInvoiceDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the restaurantInvoiceDiscounts from the server  
export function deleteRestaurantInvoiceDiscount(restaurantInvoiceDiscountsId) {
  return axios.delete(`${RESTAURANTINVOICEDISCOUNTS_URL}/delete/${restaurantInvoiceDiscountsId}`);
}
// DELETE RestaurantInvoiceDiscounts by ids  
export function deleteRestaurantInvoiceDiscounts(ids) {
return axios.post(`${RESTAURANTINVOICEDISCOUNTS_URL}/deleteRestaurantInvoiceDiscounts`, ids);
}