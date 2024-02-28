import axios from "axios";
export const URL = "BodyBuildingPack";
// CREATE = add a new packs to the server
export function createPack(packs) {
  return axios.post(`${URL}/post`, packs);
}
// READ
export function getAllPacks() {
  return axios.post(`${URL}/get`, {
    Filters: [],
    OrderBy: "NameFa asc",
    PageNumber: 1,
    PageSize: 200,
  });
}
export function getPackById(packsId) {
  return axios.get(`${URL}/get/${packsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPacks(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePack(id, packs) {
  return axios.put(`${URL}/put/${id}`, packs);
}
// UPDATE Status
export function updateStatusForPacks(ids, status) {
  return axios.post(`${URL}/updateStatusForPacks`, {
    ids,
    status,
  });
}
// DELETE = the packs from the server
export function deletePack(packsId) {
  return axios.delete(`${URL}/delete/${packsId}`);
}
// DELETE Packs by ids
export function deletePacks(ids) {
  return axios.post(`${URL}/deletePacks`, ids);
}

// SUGGESTION MenuItem
// export function suggestion(code) {
//   return axios.post(`${URL}/Suggestion`, {term: code});
// }

export function suggestion(term) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [term] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
