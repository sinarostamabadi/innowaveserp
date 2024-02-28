import axios from "axios";
export const PHONES_URL = "Wallet";
// CREATE = add a new wallets to the server
export function createWallet(wallets) {
  return axios.post(`${PHONES_URL}/post`, wallets);
}
// READ
export function getAllWallets() {
  return axios.get(`${PHONES_URL}/get`);
}
export function getWalletById(walletsId) {
  return axios.get(`${PHONES_URL}/${walletsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findWallets(queryParams) {
  return axios.post(`${PHONES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateWallet(wallets) {
  return axios.put(`${PHONES_URL}`, wallets);
}
// UPDATE Status
export function updateStatusForWallets(ids, status) {
  return axios.post(`${PHONES_URL}/updateStatusForWallets`, {
    ids,
    status,
  });
}
// DELETE = the wallets from the server
export function deleteWallet(walletsId) {
  return axios.delete(`${PHONES_URL}/${walletsId}`);
}
// DELETE Wallets by ids
export function deleteWallets(ids) {
  return axios.post(`${PHONES_URL}/deleteWallets`, ids);
}
