
import axios from "axios";
export const INQUIRYSTATUSES_URL = "InquiryStatus";
// CREATE = add a new inquiryStatuses to the server 
export function createInquiryStatus(inquiryStatuses) { 
  return axios.post(`${INQUIRYSTATUSES_URL}/post`, inquiryStatuses); 
}
// READ  
export function getAllInquiryStatuses() {
  return axios.get(`${INQUIRYSTATUSES_URL}/get`);
}
export function getInquiryStatusById(inquiryStatusesId) {
  return axios.get(`${INQUIRYSTATUSES_URL}/get/${inquiryStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findInquiryStatuses(queryParams) {
  return axios.post(`${INQUIRYSTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateInquiryStatus(id, inquiryStatuses) {
  return axios.put(`${INQUIRYSTATUSES_URL}/put/${id}`, inquiryStatuses);
}
// UPDATE Status  
export function updateStatusForInquiryStatuses(ids, status) {
  return axios.post(`${INQUIRYSTATUSES_URL}/updateStatusForInquiryStatuses`, {
    ids,
    status,
  });
}
// DELETE = the inquiryStatuses from the server  
export function deleteInquiryStatus(inquiryStatusesId) {
  return axios.delete(`${INQUIRYSTATUSES_URL}/delete/${inquiryStatusesId}`);
}
// DELETE InquiryStatuses by ids  
export function deleteInquiryStatuses(ids) {
return axios.post(`${INQUIRYSTATUSES_URL}/deleteInquiryStatuses`, ids);
}