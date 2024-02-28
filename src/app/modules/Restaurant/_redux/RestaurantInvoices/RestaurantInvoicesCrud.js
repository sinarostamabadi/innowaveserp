import axios from "axios";
export const RESTAURANTINVOICES_URL = "RestaurantInvoice";

// CREATE = add a new restaurantInvoices to the server
export function createRestaurantInvoice(restaurantInvoices) {
  return axios.post(`${RESTAURANTINVOICES_URL}/post`, restaurantInvoices);
}

// READ
export function getAllRestaurantInvoices() {
  return axios.get(`${RESTAURANTINVOICES_URL}/get`);
}

export function getRestaurantInvoiceById(restaurantInvoicesId) {
  return axios.get(`${RESTAURANTINVOICES_URL}/get/${restaurantInvoicesId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantInvoices(queryParams) {
  return axios.post(`${RESTAURANTINVOICES_URL}/get`, queryParams);
}

// UPDATE = update the procuct on the server
export function updateRestaurantInvoice(id, restaurantInvoices) {
  return axios.put(`${RESTAURANTINVOICES_URL}/put/${id}`, restaurantInvoices);
}

// UPDATE Statuses
export function updateStatusForRestaurantInvoices(ids, status) {
  return axios.post(
    `${RESTAURANTINVOICES_URL}/updateStatusForRestaurantInvoices`,
    {
      ids,
      status,
    }
  );
}

// UPDATE Status
export function updateStatusForRestaurantInvoice(id, status) {
  return axios.post(
    `${RESTAURANTINVOICES_URL}/updateStatusForRestaurantInvoice`,
    {
      id,
      status,
    }
  );
}

// DELETE = the restaurantInvoices from the server
export function deleteRestaurantInvoice(restaurantInvoicesId) {
  return axios.delete(
    `${RESTAURANTINVOICES_URL}/delete/${restaurantInvoicesId}`
  );
}

// DELETE RestaurantInvoices by ids
export function deleteRestaurantInvoices(ids) {
  return axios.post(`${RESTAURANTINVOICES_URL}/deleteRestaurantInvoices`, ids);
}

// DELETE RestaurantInvoices by ids
export function getReport(restaurantParams) {
  return axios.post(
    `${RESTAURANTINVOICES_URL}/GetCashReport`,
    restaurantParams
  );
}
