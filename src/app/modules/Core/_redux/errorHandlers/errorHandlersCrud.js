import axios from "axios";
export const ERRORHANDLERS_URL = "ErrorHandler";
// CREATE = add a new errorHandlers to the server
export function createErrorHandler(errorHandlers) {
  return axios.post(`${ERRORHANDLERS_URL}/post`, errorHandlers);
}
// READ
export function getAllErrorHandlers() {
  return axios.get(`${ERRORHANDLERS_URL}/get`);
}
export function getErrorHandlerById(errorHandlersId) {
  return axios.get(`${ERRORHANDLERS_URL}/${errorHandlersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findErrorHandlers(queryParams) {
  return axios.post(`${ERRORHANDLERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateErrorHandler(errorHandlers) {
  return axios.put(`${ERRORHANDLERS_URL}`, errorHandlers);
}
// UPDATE Status
export function updateStatusForErrorHandlers(ids, status) {
  return axios.post(`${ERRORHANDLERS_URL}/updateStatusForErrorHandlers`, {
    ids,
    status,
  });
}
// DELETE = the errorHandlers from the server
export function deleteErrorHandler(errorHandlersId) {
  return axios.delete(`${ERRORHANDLERS_URL}/${errorHandlersId}`);
}
// DELETE ErrorHandlers by ids
export function deleteErrorHandlers(ids) {
  return axios.post(`${ERRORHANDLERS_URL}/deleteErrorHandlers`, ids);
}
