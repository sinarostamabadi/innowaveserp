import axios from "axios";
export const BANKTRANSFERS_URL = "BankTransfer";
// CREATE = add a new bankTransfers to the server
export function createBankTransfer(bankTransfers) {
  return axios.post(`${BANKTRANSFERS_URL}/post`, bankTransfers);
}
// READ
export function getAllBankTransfers() {
  return axios.get(`${BANKTRANSFERS_URL}/get`);
}
export function getBankTransferById(bankTransfersId) {
  return axios.get(`${BANKTRANSFERS_URL}/get/${bankTransfersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBankTransfers(queryParams) {
  return axios.post(`${BANKTRANSFERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBankTransfer(id, bankTransfers) {
  return axios.put(`${BANKTRANSFERS_URL}/put/${id}`, bankTransfers);
}
// UPDATE Status
export function updateStatusForBankTransfers(ids, status) {
  return axios.post(`${BANKTRANSFERS_URL}/updateStatusForBankTransfers`, {
    ids,
    status,
  });
}
// DELETE = the bankTransfers from the server
export function deleteBankTransfer(bankTransfersId) {
  return axios.delete(`${BANKTRANSFERS_URL}/delete/${bankTransfersId}`);
}
// DELETE BankTransfers by ids
export function deleteBankTransfers(ids) {
  return axios.post(`${BANKTRANSFERS_URL}/deleteBankTransfers`, ids);
}
