import axios from "axios";
export const PAYMENTS_URL = "Payment";
// CREATE = add a new payments to the server
export function createPayment(payments) {
  return axios.post(`${PAYMENTS_URL}/post`, payments);
}
// READ
export function getAllPayments() {
  return axios.get(`${PAYMENTS_URL}/get`);
}
export function getPaymentById(paymentsId) {
  return axios.get(`${PAYMENTS_URL}/get/${paymentsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPayments(queryParams) {
  return axios.post(`${PAYMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePayment(id, payments) {
  return axios.put(`${PAYMENTS_URL}/put/${id}`, payments);
}
// UPDATE Status
export function updateStatusForPayments(ids, status) {
  return axios.post(`${PAYMENTS_URL}/updateStatusForPayments`, {
    ids,
    status,
  });
}
// DELETE = the payments from the server
export function deletePayment(paymentsId) {
  return axios.delete(`${PAYMENTS_URL}/delete/${paymentsId}`);
}
// DELETE Payments by ids
export function deletePayments(ids) {
  return axios.post(`${PAYMENTS_URL}/deletePayments`, ids);
}
