import axios from "axios";
export const IOTRANSACTIONTYPES_URL = "IOTransactionType";
// CREATE = add a new iOTransactionTypes to the server
export function createIOTransactionType(iOTransactionTypes) {
  return axios.post(`${IOTRANSACTIONTYPES_URL}/post`, iOTransactionTypes);
}
// READ
export function getAllIOTransactionTypes() {
  return axios.get(`${IOTRANSACTIONTYPES_URL}/get`);
}
export function getIOTransactionTypeById(iOTransactionTypesId) {
  return axios.get(`${IOTRANSACTIONTYPES_URL}/get/${iOTransactionTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findIOTransactionTypes(queryParams) {
  return axios.post(`${IOTRANSACTIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateIOTransactionType(id, iOTransactionTypes) {
  return axios.put(`${IOTRANSACTIONTYPES_URL}/put/${id}`, iOTransactionTypes);
}
// UPDATE Status
export function updateStatusForIOTransactionTypes(ids, status) {
  return axios.post(
    `${IOTRANSACTIONTYPES_URL}/updateStatusForIOTransactionTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the iOTransactionTypes from the server
export function deleteIOTransactionType(iOTransactionTypesId) {
  return axios.delete(
    `${IOTRANSACTIONTYPES_URL}/delete/${iOTransactionTypesId}`
  );
}
// DELETE IOTransactionTypes by ids
export function deleteIOTransactionTypes(ids) {
  return axios.post(`${IOTRANSACTIONTYPES_URL}/deleteIOTransactionTypes`, ids);
}
