import axios from "axios";
export const PROFITLOSSITEMS_URL = "ProfitLossItem";
// CREATE = add a new profitLossItems to the server
export function createProfitLossItem(profitLossItems) {
  return axios.post(`${PROFITLOSSITEMS_URL}/post`, profitLossItems);
}
// READ
export function getAllProfitLossItems() {
  return axios.get(`${PROFITLOSSITEMS_URL}/get`);
}
export function getProfitLossItemById(profitLossItemsId) {
  return axios.get(`${PROFITLOSSITEMS_URL}/get/${profitLossItemsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findProfitLossItems(queryParams) {
  return axios.post(`${PROFITLOSSITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateProfitLossItem(id, profitLossItems) {
  return axios.put(`${PROFITLOSSITEMS_URL}/put/${id}`, profitLossItems);
}
// UPDATE Status
export function updateStatusForProfitLossItems(ids, status) {
  return axios.post(`${PROFITLOSSITEMS_URL}/updateStatusForProfitLossItems`, {
    ids,
    status,
  });
}
// DELETE = the profitLossItems from the server
export function deleteProfitLossItem(profitLossItemsId) {
  return axios.delete(`${PROFITLOSSITEMS_URL}/delete/${profitLossItemsId}`);
}
// DELETE ProfitLossItems by ids
export function deleteProfitLossItems(ids) {
  return axios.post(`${PROFITLOSSITEMS_URL}/deleteProfitLossItems`, ids);
}
