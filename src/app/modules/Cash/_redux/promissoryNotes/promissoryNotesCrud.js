import axios from "axios";
export const PROMISSORYNOTES_URL = "PromissoryNote";
// CREATE = add a new promissoryNotes to the server
export function createPromissoryNote(promissoryNotes) {
  return axios.post(`${PROMISSORYNOTES_URL}/post`, promissoryNotes);
}
// READ
export function getAllPromissoryNotes() {
  return axios.get(`${PROMISSORYNOTES_URL}/get`);
}
export function getPromissoryNoteById(promissoryNotesId) {
  return axios.get(`${PROMISSORYNOTES_URL}/get/${promissoryNotesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPromissoryNotes(queryParams) {
  return axios.post(`${PROMISSORYNOTES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePromissoryNote(id, promissoryNotes) {
  return axios.put(`${PROMISSORYNOTES_URL}/put/${id}`, promissoryNotes);
}
// UPDATE Status
export function updateStatusForPromissoryNotes(ids, status) {
  return axios.post(`${PROMISSORYNOTES_URL}/updateStatusForPromissoryNotes`, {
    ids,
    status,
  });
}
// DELETE = the promissoryNotes from the server
export function deletePromissoryNote(promissoryNotesId) {
  return axios.delete(`${PROMISSORYNOTES_URL}/delete/${promissoryNotesId}`);
}
// DELETE PromissoryNotes by ids
export function deletePromissoryNotes(ids) {
  return axios.post(`${PROMISSORYNOTES_URL}/deletePromissoryNotes`, ids);
}
