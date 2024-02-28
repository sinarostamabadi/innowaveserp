import axios from "axios";
export const ACCOUNTFLOATING_URL = "AccountFloating";
// CREATE = add a new accountFloating to the server
export function createAccountFloating(accountFloating) {
  return axios.post(`${ACCOUNTFLOATING_URL}/post`, accountFloating);
}
// READ
export function getAllAccountFloating() {
  return axios.get(`${ACCOUNTFLOATING_URL}/get`);
}
export function getAccountFloatingById(accountFloatingId) {
  return axios.get(`${ACCOUNTFLOATING_URL}/get/${accountFloatingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findAccountFloatings(queryParams) {
  return axios.post(`${ACCOUNTFLOATING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateAccountFloating(id, accountFloating) {
  return axios.put(`${ACCOUNTFLOATING_URL}/put/${id}`, accountFloating);
}
// UPDATE Status
export function updateStatusForAccountFloating(ids, status) {
  return axios.post(`${ACCOUNTFLOATING_URL}/updateStatusForAccountFloating`, {
    ids,
    status,
  });
}
// DELETE = the accountFloating from the server
export function deleteAccountFloating(accountFloatingId) {
  return axios.delete(`${ACCOUNTFLOATING_URL}/delete/${accountFloatingId}`);
}
// DELETE AccountFloating by ids
export function deleteAccountFloatings(ids) {
  return axios.post(`${ACCOUNTFLOATING_URL}/deleteAccountFloating`, ids);
}

// SUGGESTION AccountFloating
export function suggestAccountFloating(query) {
  return axios.post(`${ACCOUNTFLOATING_URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
