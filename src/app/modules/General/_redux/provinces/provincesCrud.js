import axios from "axios";
export const PROVINCES_URL = "Province";
// CREATE = add a new provinces to the server
export function createProvince(provinces) {
  return axios.post(`${PROVINCES_URL}/post`, provinces);
}
// READ
export function getAllProvinces() {
  return axios.get(`${PROVINCES_URL}/get`);
}
export function getProvinceById(provincesId) {
  return axios.get(`${PROVINCES_URL}/get/${provincesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findProvinces(queryParams) {
  return axios.post(`${PROVINCES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateProvince(id, provinces) {
  return axios.put(`${PROVINCES_URL}/put/${id}`, provinces);
}
// UPDATE Status
export function updateStatusForProvinces(ids, status) {
  return axios.post(`${PROVINCES_URL}/updateStatusForProvinces`, {
    ids,
    status,
  });
}
// DELETE = the provinces from the server
export function deleteProvince(provincesId) {
  return axios.delete(`${PROVINCES_URL}/delete/${provincesId}`);
}
// DELETE Provinces by ids
export function deleteProvinces(ids) {
  return axios.post(`${PROVINCES_URL}/deleteProvinces`, ids);
}
