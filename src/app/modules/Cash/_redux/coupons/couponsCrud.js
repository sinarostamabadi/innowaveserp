
import axios from "axios";
export const URL = "Coupon";
// CREATE = add a new coupons to the server
export function create(data) {
  return axios.post(`${URL}/post`, data);
}
// READ
export function getAll() {
  return axios.get(`${URL}/getAll`);
}
export function getById(id) {
  return axios.get(`${URL}/get/${id}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function find(params) {
  return axios.post(`${URL}/get`, params);
}
// UPDATE = update the procuct on the server
export function update(id, data) {
  return axios.put(`${URL}/put/${id}`, data);
}
// DELETE = the coupons from the server
export function remove(id) {
  return axios.delete(`${URL}/delete/${id}`);
}
// DELETE Coupons by ids
export function removeIds(ids) {
return axios.post(`${URL}/deleteCoupons`, ids);
}
export function getUseLocations() {
  return axios.get(`/entity/getAll`);
}

export function suggest(query) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "CouponNumber", Operation: 7, Values: [query] }],
    OrderBy: "CouponNumber asc",
    PageNumber: 1,
    PageSize: 10,
  });
}