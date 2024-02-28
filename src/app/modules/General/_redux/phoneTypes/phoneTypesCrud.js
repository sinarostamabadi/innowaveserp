import axios from "axios";
export const PHONETYPES_URL = "PhoneType";
// CREATE = add a new phoneTypes to the server
export function createPhoneType(phoneTypes) {
  return axios.post(`${PHONETYPES_URL}/post`, phoneTypes);
}
// READ
export function getAllPhoneTypes() {
  return axios.get(`${PHONETYPES_URL}/getall`);
}
export function getPhoneTypeById(phoneTypesId) {
  return axios.get(`${PHONETYPES_URL}/get/${phoneTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPhoneTypes(queryParams) {
  return axios.post(`${PHONETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePhoneType(id, phoneTypes) {
  return axios.put(`${PHONETYPES_URL}/put/${id}`, phoneTypes);
}
// UPDATE Status
export function updateStatusForPhoneTypes(ids, status) {
  return axios.post(`${PHONETYPES_URL}/updateStatusForPhoneTypes`, {
    ids,
    status,
  });
}
// DELETE = the phoneTypes from the server
export function deletePhoneType(phoneTypesId) {
  return axios.delete(`${PHONETYPES_URL}/delete/${phoneTypesId}`);
}
// DELETE PhoneTypes by ids
export function deletePhoneTypes(ids) {
  return axios.post(`${PHONETYPES_URL}/deletePhoneTypes`, ids);
}
