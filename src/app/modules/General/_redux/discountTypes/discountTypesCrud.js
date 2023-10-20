import axios from "axios";
export const DISCOUNTTYPES_URL = "DiscountType";
// CREATE = add a new discountTypes to the server 
export function createDiscountType(discountTypes) { 
  return axios.post(`${DISCOUNTTYPES_URL}/post`, discountTypes); 
}
// READ  
export function getAll() {
  return axios.get(`${DISCOUNTTYPES_URL}/getAll`);
}
export function getDiscountTypeById(discountTypesId) {
  return axios.get(`${DISCOUNTTYPES_URL}/get/${discountTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findDiscountTypes(queryParams) {
  return axios.post(`${DISCOUNTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateDiscountType(id, discountTypes) {
  return axios.put(`${DISCOUNTTYPES_URL}/put/${id}`, discountTypes);
}
// UPDATE Status  
export function updateStatusForDiscountTypes(ids, status) {
  return axios.post(`${DISCOUNTTYPES_URL}/updateStatusForDiscountTypes`, {
    ids,
    status,
  });
}
// DELETE = the discountTypes from the server  
export function deleteDiscountType(discountTypesId) {
  return axios.delete(`${DISCOUNTTYPES_URL}/delete/${discountTypesId}`);
}
// DELETE DiscountTypes by ids  
export function deleteDiscountTypes(ids) {
return axios.post(`${DISCOUNTTYPES_URL}/deleteDiscountTypes`, ids);
}