import axios from "axios";
export const URL = "Bank";
// CREATE = add a new banks to the server 
export function createBank(banks) { 
  return axios.post(`${URL}/post`, banks); 
}
// READ  
export function getAllBanks() {
  return axios.get(`${URL}/getAll`);
}
export function getBankById(banksId) {
  return axios.get(`${URL}/get/${banksId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBanks(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBank(id, banks) {
  return axios.put(`${URL}/put/${id}`, banks);
}
// UPDATE Status  
export function updateStatusForBanks(ids, status) {
  return axios.post(`${URL}/updateStatusForBanks`, {
    ids,
    status,
  });
}
// DELETE = the banks from the server  
export function deleteBank(banksId) {
  return axios.delete(`${URL}/delete/${banksId}`);
}
// DELETE Banks by ids  
export function deleteBanks(ids) {
return axios.post(`${URL}/deleteBanks`, ids);
}

export function suggest(query) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "TitleFa", Operation: 7, Values: [query] }],
    OrderBy: "TitleFa asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
