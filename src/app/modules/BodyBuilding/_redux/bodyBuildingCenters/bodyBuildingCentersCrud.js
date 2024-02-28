import axios from "axios";
export const BODYBUILDINGCENTERS_URL = "BodyBuildingCenter";
// CREATE = add a new bodyBuildingCenters to the server
export function createBodyBuildingCenter(bodyBuildingCenters) {
  return axios.post(`${BODYBUILDINGCENTERS_URL}/post`, bodyBuildingCenters);
}
// READ
export function getAllBodyBuildingCenters() {
  return axios.get(`${BODYBUILDINGCENTERS_URL}/get`);
}
export function getBodyBuildingCenterById(bodyBuildingCentersId) {
  return axios.get(`${BODYBUILDINGCENTERS_URL}/get/${bodyBuildingCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBodyBuildingCenters(queryParams) {
  return axios.post(`${BODYBUILDINGCENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBodyBuildingCenter(id, bodyBuildingCenters) {
  return axios.put(`${BODYBUILDINGCENTERS_URL}/put/${id}`, bodyBuildingCenters);
}
// UPDATE Status
export function updateStatusForBodyBuildingCenters(ids, status) {
  return axios.post(
    `${BODYBUILDINGCENTERS_URL}/updateStatusForBodyBuildingCenters`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the bodyBuildingCenters from the server
export function deleteBodyBuildingCenter(bodyBuildingCentersId) {
  return axios.delete(
    `${BODYBUILDINGCENTERS_URL}/delete/${bodyBuildingCentersId}`
  );
}
// DELETE BodyBuildingCenters by ids
export function deleteBodyBuildingCenters(ids) {
  return axios.post(
    `${BODYBUILDINGCENTERS_URL}/deleteBodyBuildingCenters`,
    ids
  );
}
