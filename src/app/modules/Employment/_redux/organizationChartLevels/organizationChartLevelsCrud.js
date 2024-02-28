import axios from "axios";
export const ORGANIZATIONCHARTLEVELS_URL = "OrganizationChartLevel";
// CREATE = add a new organizationChartLevels to the server
export function createOrganizationChartLevel(organizationChartLevels) {
  return axios.post(
    `${ORGANIZATIONCHARTLEVELS_URL}/post`,
    organizationChartLevels
  );
}
// READ
export function getAllOrganizationChartLevels() {
  return axios.get(`${ORGANIZATIONCHARTLEVELS_URL}/get`);
}
export function getOrganizationChartLevelById(organizationChartLevelsId) {
  return axios.get(
    `${ORGANIZATIONCHARTLEVELS_URL}/get/${organizationChartLevelsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findOrganizationChartLevels(queryParams) {
  return axios.post(`${ORGANIZATIONCHARTLEVELS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateOrganizationChartLevel(id, organizationChartLevels) {
  return axios.put(
    `${ORGANIZATIONCHARTLEVELS_URL}/put/${id}`,
    organizationChartLevels
  );
}
// UPDATE Status
export function updateStatusForOrganizationChartLevels(ids, status) {
  return axios.post(
    `${ORGANIZATIONCHARTLEVELS_URL}/updateStatusForOrganizationChartLevels`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the organizationChartLevels from the server
export function deleteOrganizationChartLevel(organizationChartLevelsId) {
  return axios.delete(
    `${ORGANIZATIONCHARTLEVELS_URL}/delete/${organizationChartLevelsId}`
  );
}
// DELETE OrganizationChartLevels by ids
export function deleteOrganizationChartLevels(ids) {
  return axios.post(
    `${ORGANIZATIONCHARTLEVELS_URL}/deleteOrganizationChartLevels`,
    ids
  );
}
