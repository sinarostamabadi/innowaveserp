import axios from "axios";
export const LINES_URL = "Line";
// CREATE = add a new lines to the server
export function createLine(lines) {
  return axios.post(`${LINES_URL}/post`, lines);
}
// READ
export function getAllLines() {
  return axios.get(`${LINES_URL}/getAll`);
}
export function getLineById(linesId) {
  return axios.get(`${LINES_URL}/get/${linesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findLines(queryParams) {
  return axios.post(`${LINES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateLine(id, lines) {
  return axios.put(`${LINES_URL}/put/${id}`, lines);
}
// UPDATE Status
export function updateStatusForLines(ids, status) {
  return axios.post(`${LINES_URL}/updateStatusForLines`, {
    ids,
    status,
  });
}
// DELETE = the lines from the server
export function deleteLine(linesId) {
  return axios.delete(`${LINES_URL}/delete/${linesId}`);
}
// DELETE Lines by ids
export function deleteLines(ids) {
  return axios.post(`${LINES_URL}/deleteLines`, ids);
}
