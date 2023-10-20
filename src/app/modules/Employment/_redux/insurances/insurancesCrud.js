
import axios from "axios";
export const INSURANCES_URL = "Insurance";
// CREATE = add a new insurances to the server 
export function createInsurance(insurances) { 
  return axios.post(`${INSURANCES_URL}/post`, insurances); 
}
// READ  
export function getAllInsurances() {
  return axios.get(`${INSURANCES_URL}/get`);
}
export function getInsuranceById(insurancesId) {
  return axios.get(`${INSURANCES_URL}/get/${insurancesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findInsurances(queryParams) {
  return axios.post(`${INSURANCES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateInsurance(id, insurances) {
  return axios.put(`${INSURANCES_URL}/put/${id}`, insurances);
}
// UPDATE Status  
export function updateStatusForInsurances(ids, status) {
  return axios.post(`${INSURANCES_URL}/updateStatusForInsurances`, {
    ids,
    status,
  });
}
// DELETE = the insurances from the server  
export function deleteInsurance(insurancesId) {
  return axios.delete(`${INSURANCES_URL}/delete/${insurancesId}`);
}
// DELETE Insurances by ids  
export function deleteInsurances(ids) {
return axios.post(`${INSURANCES_URL}/deleteInsurances`, ids);
}