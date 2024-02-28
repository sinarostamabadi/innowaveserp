import axios from "axios";
export const LOGINHISTORIES_URL = "LoginHistory";
// CREATE = add a new loginHistories to the server
export function createLoginHistory(loginHistories) {
  return axios.post(`${LOGINHISTORIES_URL}/post`, loginHistories);
}
// READ
export function getAllLoginHistories() {
  return axios.get(`${LOGINHISTORIES_URL}/get`);
}
export function getLoginHistoryById(loginHistoriesId) {
  return axios.get(`${LOGINHISTORIES_URL}/get/${loginHistoriesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findLoginHistories(queryParams) {
  return axios.post(`${LOGINHISTORIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateLoginHistory(id, loginHistories) {
  return axios.put(`${LOGINHISTORIES_URL}/put/${id}`, loginHistories);
}
// UPDATE Status
export function updateStatusForLoginHistories(ids, status) {
  return axios.post(`${LOGINHISTORIES_URL}/updateStatusForLoginHistories`, {
    ids,
    status,
  });
}
// DELETE = the loginHistories from the server
export function deleteLoginHistory(loginHistoriesId) {
  return axios.delete(`${LOGINHISTORIES_URL}/delete/${loginHistoriesId}`);
}
// DELETE LoginHistories by ids
export function deleteLoginHistories(ids) {
  return axios.post(`${LOGINHISTORIES_URL}/deleteLoginHistories`, ids);
}
