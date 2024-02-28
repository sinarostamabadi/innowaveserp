import axios from "axios";
export const CENTERS_URL = "Center";
// CREATE = add a new centers to the server
export function createCenter(centers) {
  return axios.post(`${CENTERS_URL}/post`, centers);
}
// READ
export function getAllCenters() {
  return axios.get(`${CENTERS_URL}/getAll`);
}
export function getCenterById(centersId) {
  return axios.get(`${CENTERS_URL}/get/${centersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCenters(queryParams) {
  return axios.post(`${CENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCenter(id, centers) {
  return axios.put(`${CENTERS_URL}/put/${id}`, centers);
}
// UPDATE Status
export function updateStatusForCenters(ids, status) {
  return axios.post(`${CENTERS_URL}/updateStatusForCenters`, {
    ids,
    status,
  });
}
// DELETE = the centers from the server
export function deleteCenter(centersId) {
  return axios.delete(`${CENTERS_URL}/delete/${centersId}`);
}
// DELETE Centers by ids
export function deleteCenters(ids) {
  return axios.post(`${CENTERS_URL}/deleteCenters`, ids);
}
