import axios from "axios";
export const CORETRANSACTIONPLACES_URL = "CoreTransactionPlace";
// CREATE = add a new coreTransactionPlaces to the server
export function createCoreTransactionPlace(coreTransactionPlaces) {
  return axios.post(`${CORETRANSACTIONPLACES_URL}/post`, coreTransactionPlaces);
}
// READ
export function getAllCoreTransactionPlaces() {
  return axios.get(`${CORETRANSACTIONPLACES_URL}/get`);
}
export function getCoreTransactionPlaceById(coreTransactionPlacesId) {
  return axios.get(`${CORETRANSACTIONPLACES_URL}/${coreTransactionPlacesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findCoreTransactionPlaces(queryParams) {
  return axios.post(`${CORETRANSACTIONPLACES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCoreTransactionPlace(coreTransactionPlaces) {
  return axios.put(`${CORETRANSACTIONPLACES_URL}`, coreTransactionPlaces);
}
// UPDATE Status
export function updateStatusForCoreTransactionPlaces(ids, status) {
  return axios.post(
    `${CORETRANSACTIONPLACES_URL}/updateStatusForCoreTransactionPlaces`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the coreTransactionPlaces from the server
export function deleteCoreTransactionPlace(coreTransactionPlacesId) {
  return axios.delete(
    `${CORETRANSACTIONPLACES_URL}/${coreTransactionPlacesId}`
  );
}
// DELETE CoreTransactionPlaces by ids
export function deleteCoreTransactionPlaces(ids) {
  return axios.post(
    `${CORETRANSACTIONPLACES_URL}/deleteCoreTransactionPlaces`,
    ids
  );
}
