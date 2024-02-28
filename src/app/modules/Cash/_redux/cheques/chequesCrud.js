import axios from "axios";
export const CHEQUES_URL = "Cheque";
// CREATE = add a new cheques to the server
export function createCheque(cheques) {
  return axios.post(`${CHEQUES_URL}/post`, cheques);
}
// READ
export function getAllCheques() {
  return axios.get(`${CHEQUES_URL}/get`);
}
export function getChequeById(chequesId) {
  return axios.get(`${CHEQUES_URL}/get/${chequesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCheques(queryParams) {
  return axios.post(`${CHEQUES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCheque(id, cheques) {
  return axios.put(`${CHEQUES_URL}/put/${id}`, cheques);
}
// UPDATE Status
export function updateStatusForCheques(ids, status) {
  return axios.post(`${CHEQUES_URL}/updateStatusForCheques`, {
    ids,
    status,
  });
}
// DELETE = the cheques from the server
export function deleteCheque(chequesId) {
  return axios.delete(`${CHEQUES_URL}/delete/${chequesId}`);
}
// DELETE Cheques by ids
export function deleteCheques(ids) {
  return axios.post(`${CHEQUES_URL}/deleteCheques`, ids);
}
