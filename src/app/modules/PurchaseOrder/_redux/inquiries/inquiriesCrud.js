import axios from "axios";
export const INQUIRIES_URL = "Inquiry";
// CREATE = add a new inquiries to the server
export function createInquiry(inquiries) {
  return axios.post(`${INQUIRIES_URL}/post`, inquiries);
}
// READ
export function getAllInquiries() {
  return axios.get(`${INQUIRIES_URL}/get`);
}
export function getInquiryById(inquiriesId) {
  return axios.get(`${INQUIRIES_URL}/get/${inquiriesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findInquiries(queryParams) {
  return axios.post(`${INQUIRIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateInquiry(id, inquiries) {
  return axios.put(`${INQUIRIES_URL}/put/${id}`, inquiries);
}
// UPDATE Status
export function updateStatusForInquiries(ids, status) {
  return axios.post(`${INQUIRIES_URL}/updateStatusForInquiries`, {
    ids,
    status,
  });
}
// DELETE = the inquiries from the server
export function deleteInquiry(inquiriesId) {
  return axios.delete(`${INQUIRIES_URL}/delete/${inquiriesId}`);
}
// DELETE Inquiries by ids
export function deleteInquiries(ids) {
  return axios.post(`${INQUIRIES_URL}/deleteInquiries`, ids);
}
