import axios from "axios";
export const URL = "BodyBuildingDiscount";
// CREATE = add a new discounts to the server
export function createDiscount(discounts) {
  return axios.post(`${URL}/post`, discounts);
}
// READ
export function getAllDiscounts() {
  return axios.post(`${URL}/get`, {
    Filters: [],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 200,
  });
}
export function getDiscountById(discountsId) {
  return axios.get(`${URL}/get/${discountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findDiscounts(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateDiscount(id, discounts) {
  return axios.put(`${URL}/put/${id}`, discounts);
}
// UPDATE Status
export function updateStatusForDiscounts(ids, status) {
  return axios.post(`${URL}/updateStatusForDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the discounts from the server
export function deleteDiscount(discountsId) {
  return axios.delete(`${URL}/delete/${discountsId}`);
}
// DELETE Discounts by ids
export function deleteDiscounts(ids) {
  return axios.post(`${URL}/deleteDiscounts`, ids);
}

// SUGGESTION MenuItem
export function suggestion(term) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [term] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
