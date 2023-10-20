
import axios from "axios";
export const RESTAURANTINVOICESTATUSES_URL = "RestaurantInvoiceStatus";
// READ  
export function getAllRestaurantInvoiceStatuses() {
  return axios.get(`${RESTAURANTINVOICESTATUSES_URL}/getall`);
}
