
import axios from "axios";
export const URL = "Pos";
// CREATE = add a new poses to the server 
export function createPos(poses) { 
  return axios.post(`${URL}/post`, poses); 
}
// READ  
export function getAllPoses() {
  return axios.get(`${URL}/getAll`);
}
export function getPosById(posesId) {
  return axios.get(`${URL}/get/${posesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPoses(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePos(id, poses) {
  return axios.put(`${URL}/put/${id}`, poses);
}
// UPDATE Status  
export function updateStatusForPoses(ids, status) {
  return axios.post(`${URL}/updateStatusForPoses`, {
    ids,
    status,
  });
}
// DELETE = the poses from the server  
export function deletePos(posesId) {
  return axios.delete(`${URL}/delete/${posesId}`);
}
// DELETE Poses by ids  
export function deletePoses(ids) {
return axios.post(`${URL}/deletePoses`, ids);
}

export function suggest(query) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "SerialNo", Operation: 7, Values: [query] }],
    OrderBy: "SerialNo asc",
    PageNumber: 1,
    PageSize: 10,
  });
}