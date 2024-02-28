import axios from "axios";
export const TIMEPRICEING_URL = "TimePriceing";
// CREATE = add a new timePriceing to the server
export function createTimePriceing(timePriceing) {
  return axios.post(`${TIMEPRICEING_URL}/post`, timePriceing);
}
// READ
export function getAllTimePriceing() {
  return axios.get(`${TIMEPRICEING_URL}/get`);
}
export function getTimePriceingById(timePriceingId) {
  return axios.get(`${TIMEPRICEING_URL}/get/${timePriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findTimePriceings(queryParams) {
  return axios.post(`${TIMEPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateTimePriceing(id, timePriceing) {
  return axios.put(`${TIMEPRICEING_URL}/put/${id}`, timePriceing);
}
// UPDATE Status
export function updateStatusForTimePriceing(ids, status) {
  return axios.post(`${TIMEPRICEING_URL}/updateStatusForTimePriceing`, {
    ids,
    status,
  });
}
// DELETE = the timePriceing from the server
export function deleteTimePriceing(timePriceingId) {
  return axios.delete(`${TIMEPRICEING_URL}/delete/${timePriceingId}`);
}
// DELETE TimePriceing by ids
export function deleteTimePriceings(ids) {
  return axios.post(`${TIMEPRICEING_URL}/deleteTimePriceing`, ids);
}
