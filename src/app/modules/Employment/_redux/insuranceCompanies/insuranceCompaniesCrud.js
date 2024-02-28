import axios from "axios";
export const INSURANCECOMPANIES_URL = "InsuranceCompany";
// CREATE = add a new insuranceCompanies to the server
export function createInsuranceCompany(insuranceCompanies) {
  return axios.post(`${INSURANCECOMPANIES_URL}/post`, insuranceCompanies);
}
// READ
export function getAllInsuranceCompanies() {
  return axios.get(`${INSURANCECOMPANIES_URL}/get`);
}
export function getInsuranceCompanyById(insuranceCompaniesId) {
  return axios.get(`${INSURANCECOMPANIES_URL}/get/${insuranceCompaniesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findInsuranceCompanies(queryParams) {
  return axios.post(`${INSURANCECOMPANIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateInsuranceCompany(id, insuranceCompanies) {
  return axios.put(`${INSURANCECOMPANIES_URL}/put/${id}`, insuranceCompanies);
}
// UPDATE Status
export function updateStatusForInsuranceCompanies(ids, status) {
  return axios.post(
    `${INSURANCECOMPANIES_URL}/updateStatusForInsuranceCompanies`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the insuranceCompanies from the server
export function deleteInsuranceCompany(insuranceCompaniesId) {
  return axios.delete(
    `${INSURANCECOMPANIES_URL}/delete/${insuranceCompaniesId}`
  );
}
// DELETE InsuranceCompanies by ids
export function deleteInsuranceCompanies(ids) {
  return axios.post(`${INSURANCECOMPANIES_URL}/deleteInsuranceCompanies`, ids);
}
