import axios from "axios";
export const POSUSERS_URL = "PosUser";
// CREATE = add a new posUsers to the server
export function createPosUser(posUsers) {
  return axios.post(`${POSUSERS_URL}/post`, posUsers);
}
// READ
export function getAllPosUsers() {
  return axios.get(`${POSUSERS_URL}/get`);
}
export function getPosUserById(posUsersId) {
  return axios.get(`${POSUSERS_URL}/get/${posUsersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPosUsers(queryParams) {
  return axios.post(`${POSUSERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePosUser(id, posUsers) {
  return axios.put(`${POSUSERS_URL}/put/${id}`, posUsers);
}
// UPDATE Status
export function updateStatusForPosUsers(ids, status) {
  return axios.post(`${POSUSERS_URL}/updateStatusForPosUsers`, {
    ids,
    status,
  });
}
// DELETE = the posUsers from the server
export function deletePosUser(posUsersId) {
  return axios.delete(`${POSUSERS_URL}/delete/${posUsersId}`);
}
// DELETE PosUsers by ids
export function deletePosUsers(ids) {
  return axios.post(`${POSUSERS_URL}/deletePosUsers`, ids);
}
