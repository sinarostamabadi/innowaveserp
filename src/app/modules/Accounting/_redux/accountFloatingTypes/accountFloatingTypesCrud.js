import axios from "axios";
export const ACCOUNTFLOATINGTYPES_URL = "AccountFloatingType";
// CREATE = add a new accountFloatingTypes to the server
export function createAccountFloatingType(accountFloatingTypes) {
  return axios.post(`${ACCOUNTFLOATINGTYPES_URL}/post`, accountFloatingTypes);
}
// READ
export function getAllAccountFloatingTypes() {
  return axios.get(`${ACCOUNTFLOATINGTYPES_URL}/getAll`);
}
export function getAccountFloatingTypeById(accountFloatingTypesId) {
  return axios.get(`${ACCOUNTFLOATINGTYPES_URL}/get/${accountFloatingTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findAccountFloatingTypes(queryParams) {
  return axios.post(`${ACCOUNTFLOATINGTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateAccountFloatingType(id, accountFloatingTypes) {
  return axios.put(
    `${ACCOUNTFLOATINGTYPES_URL}/put/${id}`,
    accountFloatingTypes
  );
}
// UPDATE Status
export function updateStatusForAccountFloatingTypes(ids, status) {
  return axios.post(
    `${ACCOUNTFLOATINGTYPES_URL}/updateStatusForAccountFloatingTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the accountFloatingTypes from the server
export function deleteAccountFloatingType(accountFloatingTypesId) {
  return axios.delete(
    `${ACCOUNTFLOATINGTYPES_URL}/delete/${accountFloatingTypesId}`
  );
}
// DELETE AccountFloatingTypes by ids
export function deleteAccountFloatingTypes(ids) {
  return axios.post(
    `${ACCOUNTFLOATINGTYPES_URL}/deleteAccountFloatingTypes`,
    ids
  );
}
