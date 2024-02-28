import axios from "axios";
export const RECEIPTS_URL = "BowlingCompetition";
// CREATE = add a new bowlingCompetitions to the server
export function createBowlingCompetition(bowlingCompetitions) {
  return axios.post(`${RECEIPTS_URL}/post`, bowlingCompetitions);
}
// READ
export function getAllBowlingCompetitions() {
  return axios.get(`${RECEIPTS_URL}/get`);
}
export function getBowlingCompetitionById(bowlingCompetitionsId) {
  return axios.get(`${RECEIPTS_URL}/get/${bowlingCompetitionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBowlingCompetitions(queryParams) {
  return axios.post(`${RECEIPTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBowlingCompetition(id, bowlingCompetitions) {
  return axios.put(`${RECEIPTS_URL}/put/${id}`, bowlingCompetitions);
}
// UPDATE Status
export function updateStatusForBowlingCompetitions(ids, status) {
  return axios.post(`${RECEIPTS_URL}/updateStatusForBowlingCompetitions`, {
    ids,
    status,
  });
}
// DELETE = the bowlingCompetitions from the server
export function deleteBowlingCompetition(bowlingCompetitionsId) {
  return axios.delete(`${RECEIPTS_URL}/delete/${bowlingCompetitionsId}`);
}
// DELETE BowlingCompetitions by ids
export function deleteBowlingCompetitions(ids) {
  return axios.post(`${RECEIPTS_URL}/deleteBowlingCompetitions`, ids);
}
