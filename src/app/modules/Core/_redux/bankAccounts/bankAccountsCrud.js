import axios from "axios";
export const url = "BankAccount";
// CREATE = add a new bankAccounts to the server
export function createBankAccount(bankAccounts) {
  return axios.post(`${url}/post`, bankAccounts);
}
// READ
export function getAllBankAccounts() {
  return axios.get(`${url}/get`);
}
export function getBankAccountById(bankAccountsId) {
  return axios.get(`${url}/get/${bankAccountsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBankAccounts(queryParams) {
  return axios.post(`${url}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBankAccount(id, bankAccount) {
  return axios.put(`${url}/put/${id}`, bankAccount);
}
// UPDATE Status
export function updateStatusForBankAccounts(ids, status) {
  return axios.post(`${url}/updateStatusForBankAccounts`, {
    ids,
    status,
  });
}
// DELETE = the bankAccounts from the server
export function deleteBankAccount(bankAccountsId) {
  return axios.delete(`${url}/delete/${bankAccountsId}`);
}
// DELETE BankAccounts by ids
export function deleteBankAccounts(ids) {
  return axios.post(`${url}/deleteBankAccounts`, ids);
}

export function suggest(query) {
  return axios.post(`${url}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
