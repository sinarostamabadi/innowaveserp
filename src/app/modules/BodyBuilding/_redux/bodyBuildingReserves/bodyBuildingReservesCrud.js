
import axios from "axios";
export const BODYBUILDINGRESERVES_URL = "BodyBuildingReserve";
// CREATE = add a new bodyBuildingReserves to the server 
export function createBodyBuildingReserve(bodyBuildingReserves) { 
  return axios.post(`${BODYBUILDINGRESERVES_URL}/post`, bodyBuildingReserves); 
}
// READ  
export function getAllBodyBuildingReserves() {
  return axios.get(`${BODYBUILDINGRESERVES_URL}/get`);
}
export function getBodyBuildingReserveById(bodyBuildingReservesId) {
  return axios.get(`${BODYBUILDINGRESERVES_URL}/get/${bodyBuildingReservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBodyBuildingReserves(queryParams) {
  return axios.post(`${BODYBUILDINGRESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBodyBuildingReserve(id, bodyBuildingReserves) {
  return axios.put(`${BODYBUILDINGRESERVES_URL}/put/${id}`, bodyBuildingReserves);
}
// UPDATE Status  
export function updateStatusForBodyBuildingReserves(ids, status) {
  return axios.post(`${BODYBUILDINGRESERVES_URL}/updateStatusForBodyBuildingReserves`, {
    ids,
    status,
  });
}
// DELETE = the bodyBuildingReserves from the server  
export function deleteBodyBuildingReserve(bodyBuildingReservesId) {
  return axios.delete(`${BODYBUILDINGRESERVES_URL}/delete/${bodyBuildingReservesId}`);
}
// DELETE BodyBuildingReserves by ids  
export function deleteBodyBuildingReserves(ids) {
return axios.post(`${BODYBUILDINGRESERVES_URL}/deleteBodyBuildingReserves`, ids);
}