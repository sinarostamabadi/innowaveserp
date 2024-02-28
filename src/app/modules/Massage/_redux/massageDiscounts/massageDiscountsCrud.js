import axios from "axios";
export const MASSAGEDISCOUNTS_URL = "MassageDiscount";
// CREATE = add a new massageDiscounts to the server
export function createMassageDiscount(massageDiscounts) {
  return axios.post(`${MASSAGEDISCOUNTS_URL}/post`, massageDiscounts);
}
// READ
export function getAllMassageDiscounts() {
  return axios.get(`${MASSAGEDISCOUNTS_URL}/get`);
}
export function getMassageDiscountById(massageDiscountsId) {
  return axios.get(`${MASSAGEDISCOUNTS_URL}/get/${massageDiscountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMassageDiscounts(queryParams) {
  return axios.post(`${MASSAGEDISCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMassageDiscount(id, massageDiscounts) {
  return axios.put(`${MASSAGEDISCOUNTS_URL}/put/${id}`, massageDiscounts);
}
// UPDATE Status
export function updateStatusForMassageDiscounts(ids, status) {
  return axios.post(`${MASSAGEDISCOUNTS_URL}/updateStatusForMassageDiscounts`, {
    ids,
    status,
  });
}
// DELETE = the massageDiscounts from the server
export function deleteMassageDiscount(massageDiscountsId) {
  return axios.delete(`${MASSAGEDISCOUNTS_URL}/delete/${massageDiscountsId}`);
}
// DELETE MassageDiscounts by ids
export function deleteMassageDiscounts(ids) {
  return axios.post(`${MASSAGEDISCOUNTS_URL}/deleteMassageDiscounts`, ids);
}
