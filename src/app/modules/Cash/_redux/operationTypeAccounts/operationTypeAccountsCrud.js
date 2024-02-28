import axios from "axios";
export const OPERATIONTYPEACCOUNTS_URL = "OperationTypeAccount";
// CREATE = add a new operationTypeAccounts to the server
export function createOperationTypeAccount(operationTypeAccounts) {
  return axios.post(`${OPERATIONTYPEACCOUNTS_URL}/post`, operationTypeAccounts);
}
// READ
export function getAllOperationTypeAccounts() {
  return axios.get(`${OPERATIONTYPEACCOUNTS_URL}/get`);
}
export function getOperationTypeAccountById(operationTypeAccountsId) {
  return axios.get(
    `${OPERATIONTYPEACCOUNTS_URL}/get/${operationTypeAccountsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findOperationTypeAccounts(queryParams) {
  return axios.post(`${OPERATIONTYPEACCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateOperationTypeAccount(id, operationTypeAccounts) {
  return axios.put(
    `${OPERATIONTYPEACCOUNTS_URL}/put/${id}`,
    operationTypeAccounts
  );
}
// UPDATE Status
export function updateStatusForOperationTypeAccounts(ids, status) {
  return axios.post(
    `${OPERATIONTYPEACCOUNTS_URL}/updateStatusForOperationTypeAccounts`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the operationTypeAccounts from the server
export function deleteOperationTypeAccount(operationTypeAccountsId) {
  return axios.delete(
    `${OPERATIONTYPEACCOUNTS_URL}/delete/${operationTypeAccountsId}`
  );
}
// DELETE OperationTypeAccounts by ids
export function deleteOperationTypeAccounts(ids) {
  return axios.post(
    `${OPERATIONTYPEACCOUNTS_URL}/deleteOperationTypeAccounts`,
    ids
  );
}
