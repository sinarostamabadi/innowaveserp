import axios from "axios";
export const ORGANIZATIONCHARTEMPLOYEES_URL = "OrganizationChartEmployee";
// CREATE = add a new organizationChartEmployees to the server
export function createOrganizationChartEmployee(organizationChartEmployees) {
  return axios.post(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/post`,
    organizationChartEmployees
  );
}
// READ
export function getAllOrganizationChartEmployees() {
  return axios.get(`${ORGANIZATIONCHARTEMPLOYEES_URL}/get`);
}
export function getOrganizationChartEmployeeById(organizationChartEmployeesId) {
  return axios.get(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/get/${organizationChartEmployeesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findOrganizationChartEmployees(queryParams) {
  return axios.post(`${ORGANIZATIONCHARTEMPLOYEES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateOrganizationChartEmployee(
  id,
  organizationChartEmployees
) {
  return axios.put(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/put/${id}`,
    organizationChartEmployees
  );
}
// UPDATE Status
export function updateStatusForOrganizationChartEmployees(ids, status) {
  return axios.post(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/updateStatusForOrganizationChartEmployees`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the organizationChartEmployees from the server
export function deleteOrganizationChartEmployee(organizationChartEmployeesId) {
  return axios.delete(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/delete/${organizationChartEmployeesId}`
  );
}
// DELETE OrganizationChartEmployees by ids
export function deleteOrganizationChartEmployees(ids) {
  return axios.post(
    `${ORGANIZATIONCHARTEMPLOYEES_URL}/deleteOrganizationChartEmployees`,
    ids
  );
}
