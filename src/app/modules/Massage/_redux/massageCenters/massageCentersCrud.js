import axios from "axios";
export const MASSAGECENTERS_URL = "MassageCenter";
// CREATE = add a new massageCenters to the server
export function createMassageCenter(massageCenters) {
  return axios.post(`${MASSAGECENTERS_URL}/post`, massageCenters);
}
// READ
export function getAllMassageCenters() {
  return axios.get(`${MASSAGECENTERS_URL}/get`);
}
export function getMassageCenterById(massageCentersId) {
  return axios.get(`${MASSAGECENTERS_URL}/get/${massageCentersId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findMassageCenters(queryParams) {
  return axios.post(`${MASSAGECENTERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateMassageCenter(id, massageCenters) {
  return axios.put(`${MASSAGECENTERS_URL}/put/${id}`, massageCenters);
}
// UPDATE Status
export function updateStatusForMassageCenters(ids, status) {
  return axios.post(`${MASSAGECENTERS_URL}/updateStatusForMassageCenters`, {
    ids,
    status,
  });
}
// DELETE = the massageCenters from the server
export function deleteMassageCenter(massageCentersId) {
  return axios.delete(`${MASSAGECENTERS_URL}/delete/${massageCentersId}`);
}
// DELETE MassageCenters by ids
export function deleteMassageCenters(ids) {
  return axios.post(`${MASSAGECENTERS_URL}/deleteMassageCenters`, ids);
}
