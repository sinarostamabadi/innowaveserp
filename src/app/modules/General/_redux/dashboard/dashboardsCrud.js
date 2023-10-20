import axios from "axios";

export const DASHBOARD_URL = "Services";

// Get All
export function getAllDashboards() {
  return axios.get(`${DASHBOARD_URL}/GetAll`);
}

// Get By Id
export function getDashboardById(dashboardsId) {
  return axios.get(`${DASHBOARD_URL}/${dashboardsId}`);
}

// Get By Filter & Paging
export function findDashboards(queryParams) {
  return axios.post(`${DASHBOARD_URL}/get`, queryParams);
}
