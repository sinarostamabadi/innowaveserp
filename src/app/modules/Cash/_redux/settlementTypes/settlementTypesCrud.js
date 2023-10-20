
import axios from "axios";
export const SETTLEMENTTYPES_URL = "SettlementType";
// CREATE = add a new settlementTypes to the server 
export function createSettlementType(settlementTypes) { 
  return axios.post(`${SETTLEMENTTYPES_URL}/post`, settlementTypes); 
}
// READ  
export function getAllSettlementTypes() {
  return axios.get(`${SETTLEMENTTYPES_URL}/get`);
}
export function getSettlementTypeById(settlementTypesId) {
  return axios.get(`${SETTLEMENTTYPES_URL}/get/${settlementTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSettlementTypes(queryParams) {
  return axios.post(`${SETTLEMENTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSettlementType(id, settlementTypes) {
  return axios.put(`${SETTLEMENTTYPES_URL}/put/${id}`, settlementTypes);
}
// UPDATE Status  
export function updateStatusForSettlementTypes(ids, status) {
  return axios.post(`${SETTLEMENTTYPES_URL}/updateStatusForSettlementTypes`, {
    ids,
    status,
  });
}
// DELETE = the settlementTypes from the server  
export function deleteSettlementType(settlementTypesId) {
  return axios.delete(`${SETTLEMENTTYPES_URL}/delete/${settlementTypesId}`);
}
// DELETE SettlementTypes by ids  
export function deleteSettlementTypes(ids) {
return axios.post(`${SETTLEMENTTYPES_URL}/deleteSettlementTypes`, ids);
}