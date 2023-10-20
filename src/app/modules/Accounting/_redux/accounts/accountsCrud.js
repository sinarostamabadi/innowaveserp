
import axios from "axios";
export const ACCOUNTS_URL = "Account";
// CREATE = add a new accounts to the server 
export function createAccount(accounts) { 
  return axios.post(`${ACCOUNTS_URL}/post`, accounts); 
}
// READ  
export function getAllAccounts() {
  return axios.get(`${ACCOUNTS_URL}/get`);
}
export function getAccountById(accountsId) {
  return axios.get(`${ACCOUNTS_URL}/get/${accountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findAccounts(queryParams) {
  return axios.post(`${ACCOUNTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAccount(id, accounts) {
  return axios.put(`${ACCOUNTS_URL}/put/${id}`, accounts);
}
// UPDATE Status  
export function updateStatusForAccounts(ids, status) {
  return axios.post(`${ACCOUNTS_URL}/updateStatusForAccounts`, {
    ids,
    status,
  });
}
// DELETE = the accounts from the server  
export function deleteAccount(accountsId) {
  return axios.delete(`${ACCOUNTS_URL}/delete/${accountsId}`);
}
// DELETE Accounts by ids  
export function deleteAccounts(ids) {
return axios.post(`${ACCOUNTS_URL}/deleteAccounts`, ids);
}

// SUGGESION ACCOUNT
export function suggestAccount(query) {
  return axios.post(`${ACCOUNTS_URL}/get`, {
    Filters: [{ Property: "FullTitle", Operation: 7, Values: [query] }],
    OrderBy: "FullTitle asc",
    PageNumber: 1,
    PageSize: 10,
  });
}