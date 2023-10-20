
import axios from "axios";
export const COSTTYPES_URL = "BuySettlementType";
// CREATE = add a new buySettlementTypes to the server 
export function createBuySettlementType(buySettlementTypes) { 
  return axios.post(`${COSTTYPES_URL}/post`, buySettlementTypes); 
}
// READ  
export function getAllBuySettlementTypes() {
  return axios.get(`${COSTTYPES_URL}/getAll`);
}
export function getBuySettlementTypeById(buySettlementTypesId) {
  return axios.get(`${COSTTYPES_URL}/get/${buySettlementTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBuySettlementTypes(queryParams) {
  return axios.post(`${COSTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBuySettlementType(id, buySettlementTypes) {
  return axios.put(`${COSTTYPES_URL}/put/${id}`, buySettlementTypes);
}
// UPDATE Status  
export function updateStatusForBuySettlementTypes(ids, status) {
  return axios.post(`${COSTTYPES_URL}/updateStatusForBuySettlementTypes`, {
    ids,
    status,
  });
}
// DELETE = the buySettlementTypes from the server  
export function deleteBuySettlementType(buySettlementTypesId) {
  return axios.delete(`${COSTTYPES_URL}/delete/${buySettlementTypesId}`);
}
// DELETE BuySettlementTypes by ids  
export function deleteBuySettlementTypes(ids) {
return axios.post(`${COSTTYPES_URL}/deleteBuySettlementTypes`, ids);
}