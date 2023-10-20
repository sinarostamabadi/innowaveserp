
import axios from "axios";
export const INSURANCETYPES_URL = "InsuranceType";
// CREATE = add a new insuranceTypes to the server 
export function createInsuranceType(insuranceTypes) { 
  return axios.post(`${INSURANCETYPES_URL}/post`, insuranceTypes); 
}
// READ  
export function getAllInsuranceTypes() {
  return axios.get(`${INSURANCETYPES_URL}/get`);
}
export function getInsuranceTypeById(insuranceTypesId) {
  return axios.get(`${INSURANCETYPES_URL}/get/${insuranceTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findInsuranceTypes(queryParams) {
  return axios.post(`${INSURANCETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateInsuranceType(id, insuranceTypes) {
  return axios.put(`${INSURANCETYPES_URL}/put/${id}`, insuranceTypes);
}
// UPDATE Status  
export function updateStatusForInsuranceTypes(ids, status) {
  return axios.post(`${INSURANCETYPES_URL}/updateStatusForInsuranceTypes`, {
    ids,
    status,
  });
}
// DELETE = the insuranceTypes from the server  
export function deleteInsuranceType(insuranceTypesId) {
  return axios.delete(`${INSURANCETYPES_URL}/delete/${insuranceTypesId}`);
}
// DELETE InsuranceTypes by ids  
export function deleteInsuranceTypes(ids) {
return axios.post(`${INSURANCETYPES_URL}/deleteInsuranceTypes`, ids);
}