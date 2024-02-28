import axios from "axios";
export const SETTLEMENTS_URL = "Settlement";
// CREATE = add a new settlements to the server
export function createSettlement(settlements) {
  return axios.post(`${SETTLEMENTS_URL}/post`, settlements);
}
// READ
export function getAllSettlements() {
  return axios.get(`${SETTLEMENTS_URL}/get`);
}
export function getSettlementById(settlementsId) {
  return axios.get(`${SETTLEMENTS_URL}/get/${settlementsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findSettlements(queryParams) {
  return axios.post(`${SETTLEMENTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateSettlement(id, settlements) {
  return axios.put(`${SETTLEMENTS_URL}/put/${id}`, settlements);
}
// UPDATE Status
export function updateStatusForSettlements(ids, status) {
  return axios.post(`${SETTLEMENTS_URL}/updateStatusForSettlements`, {
    ids,
    status,
  });
}
// DELETE = the settlements from the server
export function deleteSettlement(settlementsId) {
  return axios.delete(`${SETTLEMENTS_URL}/delete/${settlementsId}`);
}
// DELETE Settlements by ids
export function deleteSettlements(ids) {
  return axios.post(`${SETTLEMENTS_URL}/deleteSettlements`, ids);
}
