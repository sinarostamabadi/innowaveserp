import axios from "axios";
export const URL = "BodyBuildingCloset";

// CREATE = add a new closets to the server
export function createCloset(closets) {
  return axios.post(`${URL}/post`, closets);
}
// READ
export function getAllClosets() {
  return axios.get(`${URL}/getAll`);
}
export function getClosetById(closetsId) {
  return axios.get(`${URL}/get/${closetsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findClosets(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateCloset(id, closets) {
  return axios.put(`${URL}/put/${id}`, closets);
}
// UPDATE Status
export function updateStatusForClosets(ids, status) {
  return axios.post(`${URL}/updateStatusForClosets`, {
    ids,
    status,
  });
}
// DELETE = the closets from the server
export function deleteCloset(closetsId) {
  return axios.delete(`${URL}/delete/${closetsId}`);
}
// DELETE Closets by ids
export function deleteClosets(ids) {
  return axios.post(`${URL}/deleteClosets`, ids);
}

// SUGGESION BRAND
export function suggestCloset(query) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

export function openCloset(closetId) {
  return axios.post(`${URL}/Open`, {
    BodyBuildingClosetId: closetId,
  });
}

export function freeCloset(closetId) {
  return axios.post(`${URL}/SetFree`, {
    BodyBuildingClosetId: closetId,
  });
}
