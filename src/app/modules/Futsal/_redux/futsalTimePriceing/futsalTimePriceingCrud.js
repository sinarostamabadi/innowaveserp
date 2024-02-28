import axios from "axios";
export const FUTSALTIMEPRICEING_URL = "FutsalTimePriceing";
// CREATE = add a new futsalTimePriceing to the server
export function createFutsalTimePriceing(futsalTimePriceing) {
  return axios.post(`${FUTSALTIMEPRICEING_URL}/post`, futsalTimePriceing);
}
// READ
export function getAllFutsalTimePriceing() {
  return axios.get(`${FUTSALTIMEPRICEING_URL}/get`);
}
export function getFutsalTimePriceingById(futsalTimePriceingId) {
  return axios.get(`${FUTSALTIMEPRICEING_URL}/get/${futsalTimePriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findFutsalTimePriceings(queryParams) {
  return axios.post(`${FUTSALTIMEPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateFutsalTimePriceing(id, futsalTimePriceing) {
  return axios.put(`${FUTSALTIMEPRICEING_URL}/put/${id}`, futsalTimePriceing);
}
// UPDATE Status
export function updateStatusForFutsalTimePriceing(ids, status) {
  return axios.post(
    `${FUTSALTIMEPRICEING_URL}/updateStatusForFutsalTimePriceing`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the futsalTimePriceing from the server
export function deleteFutsalTimePriceing(futsalTimePriceingId) {
  return axios.delete(
    `${FUTSALTIMEPRICEING_URL}/delete/${futsalTimePriceingId}`
  );
}
// DELETE FutsalTimePriceing by ids
export function deleteFutsalTimePriceings(ids) {
  return axios.post(`${FUTSALTIMEPRICEING_URL}/deleteFutsalTimePriceing`, ids);
}
