
import axios from "axios";
export const ORGANIZATIONCHARTS_URL = "OrganizationChart";
// CREATE = add a new organizationCharts to the server 
export function createOrganizationChart(organizationCharts) { 
  return axios.post(`${ORGANIZATIONCHARTS_URL}/post`, organizationCharts); 
}
// READ  
export function getAllOrganizationCharts() {
  return axios.get(`${ORGANIZATIONCHARTS_URL}/get`);
}
export function getOrganizationChartById(organizationChartsId) {
  return axios.get(`${ORGANIZATIONCHARTS_URL}/get/${organizationChartsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findOrganizationCharts(queryParams) {
  return axios.post(`${ORGANIZATIONCHARTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateOrganizationChart(id, organizationCharts) {
  return axios.put(`${ORGANIZATIONCHARTS_URL}/put/${id}`, organizationCharts);
}
// UPDATE Status  
export function updateStatusForOrganizationCharts(ids, status) {
  return axios.post(`${ORGANIZATIONCHARTS_URL}/updateStatusForOrganizationCharts`, {
    ids,
    status,
  });
}
// DELETE = the organizationCharts from the server  
export function deleteOrganizationChart(organizationChartsId) {
  return axios.delete(`${ORGANIZATIONCHARTS_URL}/delete/${organizationChartsId}`);
}
// DELETE OrganizationCharts by ids  
export function deleteOrganizationCharts(ids) {
return axios.post(`${ORGANIZATIONCHARTS_URL}/deleteOrganizationCharts`, ids);
}