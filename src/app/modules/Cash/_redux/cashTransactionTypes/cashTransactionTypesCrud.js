import axios from "axios";
export const CASHTRANSACTIONTYPES_URL = "CashTransactionType";
// CREATE = add a new cashTransactionTypes to the server
export function createCashTransactionType(cashTransactionTypes) {
  return axios.post(`${CASHTRANSACTIONTYPES_URL}/post`, cashTransactionTypes);
}
// READ
export function getAll() {
  return axios.get(`${CASHTRANSACTIONTYPES_URL}/getAll`);
}
export function getCashTransactionTypeById(cashTransactionTypesId) {
  return axios.get(`${CASHTRANSACTIONTYPES_URL}/get/${cashTransactionTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCashTransactionTypes(queryParams) {
  return axios.post(`${CASHTRANSACTIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCashTransactionType(id, cashTransactionTypes) {
  return axios.put(
    `${CASHTRANSACTIONTYPES_URL}/put/${id}`,
    cashTransactionTypes
  );
}
// UPDATE Status
export function updateStatusForCashTransactionTypes(ids, status) {
  return axios.post(
    `${CASHTRANSACTIONTYPES_URL}/updateStatusForCashTransactionTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the cashTransactionTypes from the server
export function deleteCashTransactionType(cashTransactionTypesId) {
  return axios.delete(
    `${CASHTRANSACTIONTYPES_URL}/delete/${cashTransactionTypesId}`
  );
}
// DELETE CashTransactionTypes by ids
export function deleteCashTransactionTypes(ids) {
  return axios.post(
    `${CASHTRANSACTIONTYPES_URL}/deleteCashTransactionTypes`,
    ids
  );
}
