import axios from "axios";
export const RESTAURANTMENUITEMS_URL = "BodyBuildingContract";
// CREATE = add a new contracts to the server
export function createContract(contracts) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/post`, contracts);
}
// READ
export function getAllContracts() {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, {
    Filters: [],
    OrderBy: "NameFa asc",
    PageNumber: 1,
    PageSize: 200,
  });
}
export function getContractById(contractsId) {
  return axios.get(`${RESTAURANTMENUITEMS_URL}/get/${contractsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findContracts(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateContract(id, contracts) {
  return axios.put(`${RESTAURANTMENUITEMS_URL}/put/${id}`, contracts);
}
// UPDATE Status
export function updateStatusForContracts(ids, status) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/updateStatusForContracts`, {
    ids,
    status,
  });
}
// DELETE = the contracts from the server
export function deleteContract(contractsId) {
  return axios.delete(`${RESTAURANTMENUITEMS_URL}/delete/${contractsId}`);
}
// DELETE Contracts by ids
export function deleteContracts(ids) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/deleteContracts`, ids);
}

// SUGGESTION MenuItem
export function suggestionMenuItem(code) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/Suggestion`, { term: code });
}
