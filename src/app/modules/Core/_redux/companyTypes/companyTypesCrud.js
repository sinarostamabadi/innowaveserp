import axios from "axios";
export const COMPANYTYPES_URL = "CompanyType";
// CREATE = add a new companyTypes to the server 
export function createCompanyType(companyTypes) { 
  return axios.post(`${COMPANYTYPES_URL}/post`, companyTypes); 
}
// READ  
export function getAllCompanyTypes() {
  return axios.get(`${COMPANYTYPES_URL}/getAll`);
}
export function getCompanyTypeById(companyTypesId) {
  return axios.get(`${COMPANYTYPES_URL}/${companyTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCompanyTypes(queryParams) {
  return axios.post(`${COMPANYTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCompanyType(companyTypes) {
  return axios.put(`${COMPANYTYPES_URL}`, companyTypes);
}
// UPDATE Status  
export function updateStatusForCompanyTypes(ids, status) {
  return axios.post(`${COMPANYTYPES_URL}/updateStatusForCompanyTypes`, {
    ids,
    status,
  });
}
// DELETE = the companyTypes from the server  
export function deleteCompanyType(companyTypesId) {
  return axios.delete(`${COMPANYTYPES_URL}/${companyTypesId}`);
}
// DELETE CompanyTypes by ids  
export function deleteCompanyTypes(ids) {
return axios.post(`${COMPANYTYPES_URL}/deleteCompanyTypes`, ids);
}
