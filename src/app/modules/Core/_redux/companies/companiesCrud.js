import axios from "axios";
export const COMPANIES_URL = "Company";
export const PERSONS_URL = "Person";
// CREATE = add a new companies to the server
export function createCompany(companies) {
  return axios.post(`${PERSONS_URL}/post`, companies);
}
// READ
export function getAllCompanies() {
  return axios.get(`${COMPANIES_URL}/get`);
}
export function getCompanyById(companiesId) {
  return axios.get(`${PERSONS_URL}/Get/${companiesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCompanies(queryParams) {
  return axios.post(`${COMPANIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCompany(id, companies) {
  return axios.put(`${PERSONS_URL}/put/${id}`, companies);
}
// UPDATE Status
export function updateStatusForCompanies(ids, status) {
  return axios.post(`${COMPANIES_URL}/updateStatusForCompanies`, {
    ids,
    status,
  });
}
// DELETE = the companies from the server
export function deleteCompany(companiesId) {
  return axios.delete(`${PERSONS_URL}/Delete/${companiesId}`);
}
// DELETE Companies by ids
export function deleteCompanies(ids) {
  return axios.post(`${PERSONS_URL}/deleteCompanies`, ids);
}
