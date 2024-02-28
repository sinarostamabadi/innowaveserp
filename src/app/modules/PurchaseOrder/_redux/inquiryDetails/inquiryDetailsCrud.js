import axios from "axios";
export const INQUIRYDETAILS_URL = "InquiryDetail";
// CREATE = add a new inquiryDetails to the server
export function createInquiryDetail(inquiryDetails) {
  return axios.post(`${INQUIRYDETAILS_URL}/post`, inquiryDetails);
}
// READ
export function getAllInquiryDetails() {
  return axios.get(`${INQUIRYDETAILS_URL}/get`);
}
export function getInquiryDetailById(inquiryDetailsId) {
  return axios.get(`${INQUIRYDETAILS_URL}/get/${inquiryDetailsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findInquiryDetails(queryParams) {
  return axios.post(`${INQUIRYDETAILS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateInquiryDetail(id, inquiryDetails) {
  return axios.put(`${INQUIRYDETAILS_URL}/put/${id}`, inquiryDetails);
}
// UPDATE Status
export function updateStatusForInquiryDetails(ids, status) {
  return axios.post(`${INQUIRYDETAILS_URL}/updateStatusForInquiryDetails`, {
    ids,
    status,
  });
}
// DELETE = the inquiryDetails from the server
export function deleteInquiryDetail(inquiryDetailsId) {
  return axios.delete(`${INQUIRYDETAILS_URL}/delete/${inquiryDetailsId}`);
}
// DELETE InquiryDetails by ids
export function deleteInquiryDetails(ids) {
  return axios.post(`${INQUIRYDETAILS_URL}/deleteInquiryDetails`, ids);
}
