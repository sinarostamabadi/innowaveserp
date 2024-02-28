import axios from "axios";
export const EDUCATIONS_URL = "Education";
// CREATE = add a new educations to the server
export function createEducation(educations) {
  return axios.post(`${EDUCATIONS_URL}/post`, educations);
}
// READ
export function getAllEducations() {
  return axios.get(`${EDUCATIONS_URL}/get`);
}
export function getEducationById(educationsId) {
  return axios.get(`${EDUCATIONS_URL}/get/${educationsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEducations(queryParams) {
  return axios.post(`${EDUCATIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEducation(id, educations) {
  return axios.put(`${EDUCATIONS_URL}/put/${id}`, educations);
}
// UPDATE Status
export function updateStatusForEducations(ids, status) {
  return axios.post(`${EDUCATIONS_URL}/updateStatusForEducations`, {
    ids,
    status,
  });
}
// DELETE = the educations from the server
export function deleteEducation(educationsId) {
  return axios.delete(`${EDUCATIONS_URL}/delete/${educationsId}`);
}
// DELETE Educations by ids
export function deleteEducations(ids) {
  return axios.post(`${EDUCATIONS_URL}/deleteEducations`, ids);
}
