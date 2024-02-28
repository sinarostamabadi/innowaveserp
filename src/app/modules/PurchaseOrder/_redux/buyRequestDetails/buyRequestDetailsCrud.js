import axios from "axios";
export const BUYREQUESTDETAILS_URL = "BuyRequestDetail";
// CREATE = add a new buyRequestDetails to the server
export function createBuyRequestDetail(buyRequestDetails) {
  return axios.post(`${BUYREQUESTDETAILS_URL}/post`, buyRequestDetails);
}
// READ
export function getAllBuyRequestDetails() {
  return axios.get(`${BUYREQUESTDETAILS_URL}/get`);
}
export function getBuyRequestDetailById(buyRequestDetailsId) {
  return axios.get(`${BUYREQUESTDETAILS_URL}/get/${buyRequestDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBuyRequestDetails(queryParams) {
  return axios.post(`${BUYREQUESTDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBuyRequestDetail(id, buyRequestDetails) {
  return axios.put(`${BUYREQUESTDETAILS_URL}/put/${id}`, buyRequestDetails);
}
// UPDATE Status
export function updateStatusForBuyRequestDetails(ids, status) {
  return axios.post(
    `${BUYREQUESTDETAILS_URL}/updateStatusForBuyRequestDetails`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the buyRequestDetails from the server
export function deleteBuyRequestDetail(buyRequestDetailsId) {
  return axios.delete(`${BUYREQUESTDETAILS_URL}/delete/${buyRequestDetailsId}`);
}
// DELETE BuyRequestDetails by ids
export function deleteBuyRequestDetails(ids) {
  return axios.post(`${BUYREQUESTDETAILS_URL}/deleteBuyRequestDetails`, ids);
}
