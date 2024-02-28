import axios from "axios";
export const INFOAREAS_URL = "InfoArea";
// CREATE = add a new infoAreas to the server
export function createInfoArea(infoAreas) {
  return axios.post(`${INFOAREAS_URL}/post`, infoAreas);
}
// READ
export function getAllInfoAreas() {
  return axios.get(`${INFOAREAS_URL}/get`);
}
export function getInfoAreaById(infoAreasId) {
  return axios.get(`${INFOAREAS_URL}/get/${infoAreasId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findInfoAreas(queryParams) {
  return axios.post(`${INFOAREAS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateInfoArea(id, infoAreas) {
  return axios.put(`${INFOAREAS_URL}/put/${id}`, infoAreas);
}
// UPDATE Status
export function updateStatusForInfoAreas(ids, status) {
  return axios.post(`${INFOAREAS_URL}/updateStatusForInfoAreas`, {
    ids,
    status,
  });
}
// DELETE = the infoAreas from the server
export function deleteInfoArea(infoAreasId) {
  return axios.delete(`${INFOAREAS_URL}/delete/${infoAreasId}`);
}
// DELETE InfoAreas by ids
export function deleteInfoAreas(ids) {
  return axios.post(`${INFOAREAS_URL}/deleteInfoAreas`, ids);
}
