import axios from "axios";
export const RESERVES_URL = "BowlingTeam";
// CREATE = add a new bowlingTeams to the server
export function createBowlingTeam(bowlingTeams) {
  return axios.post(`${RESERVES_URL}/post`, bowlingTeams);
}
// READ
export function getAllBowlingTeams() {
  return axios.get(`${RESERVES_URL}/get`);
}
export function getBowlingTeamById(bowlingTeamsId) {
  return axios.get(`${RESERVES_URL}/get/${bowlingTeamsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBowlingTeams(queryParams) {
  return axios.post(`${RESERVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBowlingTeam(id, bowlingTeams) {
  return axios.put(`${RESERVES_URL}/put/${id}`, bowlingTeams);
}
// UPDATE Status
export function updateStatusForBowlingTeams(ids, status) {
  return axios.post(`${RESERVES_URL}/updateStatusForBowlingTeams`, {
    ids,
    status,
  });
}
// DELETE = the bowlingTeams from the server
export function deleteBowlingTeam(bowlingTeamsId) {
  return axios.delete(`${RESERVES_URL}/delete/${bowlingTeamsId}`);
}
// DONE = the bowlingTeams from the server
export function doneBowlingTeam(id, bowlingTeams) {
  return axios.put(`${RESERVES_URL}/done/${id}`, bowlingTeams);
}
// ADDTIME = the bowlingTeams from the server
export function addTimeBowlingTeam(id, bowlingTeams) {
  return axios.put(`${RESERVES_URL}/addTime/${id}`, bowlingTeams);
}
// DELETE BowlingTeams by ids
export function deleteBowlingTeams(ids) {
  return axios.post(`${RESERVES_URL}/deleteBowlingTeams`, ids);
}

// GET Active BowlingTeam
// export function getActiveBowlingTeamByLine(id) {
//   return axios.post(`${RESERVES_URL}/get`, {
//     PageNumber: 1,
//     PageSize: 1,
//     OrderBy: "BowlingTeamId asc",
//     Filters: [
//       { Property: "LineId", Operation: 5, Values: [id] },
//       { Property: "IsActive", Operation: 5, Values: ["1"] },
//     ],
//   });
// }

// GET Active BowlingTeam
export function getActiveBowlingTeamByLine(lineId) {
  return axios.get(`${RESERVES_URL}/ActiveBowlingTeam/${lineId}`);
}