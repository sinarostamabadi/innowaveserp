import axios from "axios";
export const REQUESTS_URL = "Request";
// CREATE = add a new requests to the server
export function createRequest(requests) {
  return axios.post(`${REQUESTS_URL}/post`, requests);
}
// READ
export function getAllRequests() {
  return axios.get(`${REQUESTS_URL}/get`);
}
export function getRequestById(requestsId) {
  return axios.get(`${REQUESTS_URL}/get/${requestsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRequests(queryParams) {
  return axios.post(`${REQUESTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRequest(id, requests) {
  return axios.put(`${REQUESTS_URL}/put/${id}`, requests);
}
// UPDATE Status
export function updateStatusForRequests(ids, status) {
  return axios.post(`${REQUESTS_URL}/updateStatusForRequests`, {
    ids,
    status,
  });
}
// DELETE = the requests from the server
export function deleteRequest(requestsId) {
  return axios.delete(`${REQUESTS_URL}/delete/${requestsId}`);
}
// DELETE Requests by ids
export function deleteRequests(ids) {
  return axios.post(`${REQUESTS_URL}/deleteRequests`, ids);
}
