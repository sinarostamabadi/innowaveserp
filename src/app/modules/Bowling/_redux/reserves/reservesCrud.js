import axios from "axios";
export const RESERVES_URL = "Reserve";
// CREATE = add a new reserves to the server
export function createReserve(reserves) {
  return axios.post(`${RESERVES_URL}/post`, reserves);
}
// READ
export function getAllReserves() {
  return axios.get(`${RESERVES_URL}/get`);
}
export function getReserveById(reservesId) {
  return axios.get(`${RESERVES_URL}/get/${reservesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findReserves(queryParams) {
  return axios.post(`${RESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateReserve(id, reserves) {
  return axios.put(`${RESERVES_URL}/put/${id}`, reserves);
}
// UPDATE Status
export function updateStatusForReserves(ids, status) {
  return axios.post(`${RESERVES_URL}/updateStatusForReserves`, {
    ids,
    status,
  });
}
// DELETE = the reserves from the server
export function deleteReserve(reservesId) {
  return axios.delete(`${RESERVES_URL}/delete/${reservesId}`);
}
// DONE = the reserves from the server
export function doneReserve(id, reserves) {
  return axios.put(`${RESERVES_URL}/done/${id}`, reserves);
}
// ADDTIME = the reserves from the server
export function addTimeReserve(id, reserves) {
  return axios.put(`${RESERVES_URL}/addTime/${id}`, reserves);
}
// DELETE Reserves by ids
export function deleteReserves(ids) {
  return axios.post(`${RESERVES_URL}/deleteReserves`, ids);
}

// GET Active Reserve
// export function getActiveReserveByLine(id) {
//   return axios.post(`${RESERVES_URL}/get`, {
//     PageNumber: 1,
//     PageSize: 1,
//     OrderBy: "ReserveId asc",
//     Filters: [
//       { Property: "LineId", Operation: 5, Values: [id] },
//       { Property: "IsActive", Operation: 5, Values: ["1"] },
//     ],
//   });
// }

// GET Active Reserve
export function getActiveReserveByLine(lineId) {
  return axios.get(`${RESERVES_URL}/ActiveReserve/${lineId}`);
}

export function releaseLine(lineId) {
  return axios.get(`${RESERVES_URL}/ActiveReserve/${lineId}`);
}

export function getReport(restaurantParams) {
  return axios.post(`${RESERVES_URL}/getReserveReport`, restaurantParams);
}
