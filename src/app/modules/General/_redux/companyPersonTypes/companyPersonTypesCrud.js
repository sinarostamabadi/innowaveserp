import axios from "axios";
export const PERSONTYPES_URL = "CompanyPersonType";
// CREATE = add a new companyPersonTypes to the server
export function createCompanyPersonType(companyPersonTypes) {
  return axios.post(`${PERSONTYPES_URL}/post`, companyPersonTypes);
}
// READ
export function getAllCompanyPersonTypes() {
  return axios.get(`${PERSONTYPES_URL}/getall`);
}
export function getCompanyPersonTypeById(companyPersonTypesId) {
  return axios.get(`${PERSONTYPES_URL}/get/${companyPersonTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCompanyPersonTypes(queryParams) {
  return axios.post(`${PERSONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCompanyPersonType(id, companyPersonTypes) {
  return axios.put(`${PERSONTYPES_URL}/put/${id}`, companyPersonTypes);
}
// UPDATE Status
export function updateStatusForCompanyPersonTypes(ids, status) {
  return axios.post(`${PERSONTYPES_URL}/updateStatusForCompanyPersonTypes`, {
    ids,
    status,
  });
}
// DELETE = the companyPersonTypes from the server
export function deleteCompanyPersonType(companyPersonTypesId) {
  return axios.delete(`${PERSONTYPES_URL}/delete/${companyPersonTypesId}`);
}
// DELETE CompanyPersonTypes by ids
export function deleteCompanyPersonTypes(ids) {
  return axios.post(`${PERSONTYPES_URL}/deleteCompanyPersonTypes`, ids);
}
