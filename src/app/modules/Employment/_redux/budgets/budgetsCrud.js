import axios from "axios";
export const BUDGETS_URL = "Budget";
// CREATE = add a new budgets to the server
export function createBudget(budgets) {
  return axios.post(`${BUDGETS_URL}/post`, budgets);
}
// READ
export function getAllBudgets() {
  return axios.get(`${BUDGETS_URL}/get`);
}
export function getBudgetById(budgetsId) {
  return axios.get(`${BUDGETS_URL}/get/${budgetsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBudgets(queryParams) {
  return axios.post(`${BUDGETS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBudget(id, budgets) {
  return axios.put(`${BUDGETS_URL}/put/${id}`, budgets);
}
// UPDATE Status
export function updateStatusForBudgets(ids, status) {
  return axios.post(`${BUDGETS_URL}/updateStatusForBudgets`, {
    ids,
    status,
  });
}
// DELETE = the budgets from the server
export function deleteBudget(budgetsId) {
  return axios.delete(`${BUDGETS_URL}/delete/${budgetsId}`);
}
// DELETE Budgets by ids
export function deleteBudgets(ids) {
  return axios.post(`${BUDGETS_URL}/deleteBudgets`, ids);
}
