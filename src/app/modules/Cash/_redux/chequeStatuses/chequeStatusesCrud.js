import axios from "axios";
export const CHEQUESTATUSES_URL = "ChequeStatus";
// CREATE = add a new chequeStatuses to the server
export function createChequeStatus(chequeStatuses) {
  return axios.post(`${CHEQUESTATUSES_URL}/post`, chequeStatuses);
}
// READ
export function getAllChequeStatuses() {
  return axios.get(`${CHEQUESTATUSES_URL}/get`);
}
export function getChequeStatusById(chequeStatusesId) {
  return axios.get(`${CHEQUESTATUSES_URL}/get/${chequeStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findChequeStatuses(queryParams) {
  return axios.post(`${CHEQUESTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateChequeStatus(id, chequeStatuses) {
  return axios.put(`${CHEQUESTATUSES_URL}/put/${id}`, chequeStatuses);
}
// UPDATE Status
export function updateStatusForChequeStatuses(ids, status) {
  return axios.post(`${CHEQUESTATUSES_URL}/updateStatusForChequeStatuses`, {
    ids,
    status,
  });
}
// DELETE = the chequeStatuses from the server
export function deleteChequeStatus(chequeStatusesId) {
  return axios.delete(`${CHEQUESTATUSES_URL}/delete/${chequeStatusesId}`);
}
// DELETE ChequeStatuses by ids
export function deleteChequeStatuses(ids) {
  return axios.post(`${CHEQUESTATUSES_URL}/deleteChequeStatuses`, ids);
}
