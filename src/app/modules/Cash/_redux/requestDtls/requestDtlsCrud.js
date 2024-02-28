import axios from "axios";
export const REQUESTDTLS_URL = "RequestDtl";
// CREATE = add a new requestDtls to the server
export function createRequestDtl(requestDtls) {
  return axios.post(`${REQUESTDTLS_URL}/post`, requestDtls);
}
// READ
export function getAllRequestDtls() {
  return axios.get(`${REQUESTDTLS_URL}/get`);
}
export function getRequestDtlById(requestDtlsId) {
  return axios.get(`${REQUESTDTLS_URL}/get/${requestDtlsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRequestDtls(queryParams) {
  return axios.post(`${REQUESTDTLS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRequestDtl(id, requestDtls) {
  return axios.put(`${REQUESTDTLS_URL}/put/${id}`, requestDtls);
}
// UPDATE Status
export function updateStatusForRequestDtls(ids, status) {
  return axios.post(`${REQUESTDTLS_URL}/updateStatusForRequestDtls`, {
    ids,
    status,
  });
}
// DELETE = the requestDtls from the server
export function deleteRequestDtl(requestDtlsId) {
  return axios.delete(`${REQUESTDTLS_URL}/delete/${requestDtlsId}`);
}
// DELETE RequestDtls by ids
export function deleteRequestDtls(ids) {
  return axios.post(`${REQUESTDTLS_URL}/deleteRequestDtls`, ids);
}
