import axios from "axios";
export const PAYMENTSTATUSES_URL = "PaymentStatus";
// CREATE = add a new paymentStatuses to the server
export function createPaymentStatus(paymentStatuses) {
  return axios.post(`${PAYMENTSTATUSES_URL}/post`, paymentStatuses);
}
// READ
export function getAllPaymentStatuses() {
  return axios.get(`${PAYMENTSTATUSES_URL}/get`);
}
export function getPaymentStatusById(paymentStatusesId) {
  return axios.get(`${PAYMENTSTATUSES_URL}/get/${paymentStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPaymentStatuses(queryParams) {
  return axios.post(`${PAYMENTSTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePaymentStatus(id, paymentStatuses) {
  return axios.put(`${PAYMENTSTATUSES_URL}/put/${id}`, paymentStatuses);
}
// UPDATE Status
export function updateStatusForPaymentStatuses(ids, status) {
  return axios.post(`${PAYMENTSTATUSES_URL}/updateStatusForPaymentStatuses`, {
    ids,
    status,
  });
}
// DELETE = the paymentStatuses from the server
export function deletePaymentStatus(paymentStatusesId) {
  return axios.delete(`${PAYMENTSTATUSES_URL}/delete/${paymentStatusesId}`);
}
// DELETE PaymentStatuses by ids
export function deletePaymentStatuses(ids) {
  return axios.post(`${PAYMENTSTATUSES_URL}/deletePaymentStatuses`, ids);
}
