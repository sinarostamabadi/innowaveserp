import axios from "axios";
export const FUTSALRESERVETYPES_URL = "FutsalReserveType";
// CREATE = add a new futsalReserveTypes to the server
export function createFutsalReserveType(futsalReserveTypes) {
  return axios.post(`${FUTSALRESERVETYPES_URL}/post`, futsalReserveTypes);
}
// READ
export function getAllFutsalReserveTypes() {
  return axios.get(`${FUTSALRESERVETYPES_URL}/getall`);
}
export function getFutsalReserveTypeById(futsalReserveTypesId) {
  return axios.get(`${FUTSALRESERVETYPES_URL}/get/${futsalReserveTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findFutsalReserveTypes(queryParams) {
  return axios.post(`${FUTSALRESERVETYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateFutsalReserveType(id, futsalReserveTypes) {
  return axios.put(`${FUTSALRESERVETYPES_URL}/put/${id}`, futsalReserveTypes);
}
// UPDATE Status
export function updateStatusForFutsalReserveTypes(ids, status) {
  return axios.post(
    `${FUTSALRESERVETYPES_URL}/updateStatusForFutsalReserveTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the futsalReserveTypes from the server
export function deleteFutsalReserveType(futsalReserveTypesId) {
  return axios.delete(
    `${FUTSALRESERVETYPES_URL}/delete/${futsalReserveTypesId}`
  );
}
// DELETE FutsalReserveTypes by ids
export function deleteFutsalReserveTypes(ids) {
  return axios.post(`${FUTSALRESERVETYPES_URL}/deleteFutsalReserveTypes`, ids);
}
