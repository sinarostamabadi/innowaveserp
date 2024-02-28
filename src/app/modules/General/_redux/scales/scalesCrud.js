import axios from "axios";
export const BANKS_URL = "Scale";
// CREATE = add a new scales to the server
export function createScale(scales) {
  return axios.post(`${BANKS_URL}/post`, scales);
}
// READ
export function getAllScales() {
  return axios.get(`${BANKS_URL}/getAll`);
}
export function getScaleById(scalesId) {
  return axios.get(`${BANKS_URL}/get/${scalesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findScales(queryParams) {
  return axios.post(`${BANKS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateScale(id, scales) {
  return axios.put(`${BANKS_URL}/put/${id}`, scales);
}
// UPDATE Status
export function updateStatusForScales(ids, status) {
  return axios.post(`${BANKS_URL}/updateStatusForScales`, {
    ids,
    status,
  });
}
// DELETE = the scales from the server
export function deleteScale(scalesId) {
  return axios.delete(`${BANKS_URL}/delete/${scalesId}`);
}
// DELETE Scales by ids
export function deleteScales(ids) {
  return axios.post(`${BANKS_URL}/deleteScales`, ids);
}
