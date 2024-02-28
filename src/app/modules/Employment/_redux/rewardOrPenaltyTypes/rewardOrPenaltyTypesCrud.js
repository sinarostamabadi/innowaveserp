import axios from "axios";
export const REWARDORPENALTYTYPES_URL = "RewardOrPenaltyType";
// CREATE = add a new rewardOrPenaltyTypes to the server
export function createRewardOrPenaltyType(rewardOrPenaltyTypes) {
  return axios.post(`${REWARDORPENALTYTYPES_URL}/post`, rewardOrPenaltyTypes);
}
// READ
export function getAllRewardOrPenaltyTypes() {
  return axios.get(`${REWARDORPENALTYTYPES_URL}/get`);
}
export function getRewardOrPenaltyTypeById(rewardOrPenaltyTypesId) {
  return axios.get(`${REWARDORPENALTYTYPES_URL}/get/${rewardOrPenaltyTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRewardOrPenaltyTypes(queryParams) {
  return axios.post(`${REWARDORPENALTYTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRewardOrPenaltyType(id, rewardOrPenaltyTypes) {
  return axios.put(
    `${REWARDORPENALTYTYPES_URL}/put/${id}`,
    rewardOrPenaltyTypes
  );
}
// UPDATE Status
export function updateStatusForRewardOrPenaltyTypes(ids, status) {
  return axios.post(
    `${REWARDORPENALTYTYPES_URL}/updateStatusForRewardOrPenaltyTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the rewardOrPenaltyTypes from the server
export function deleteRewardOrPenaltyType(rewardOrPenaltyTypesId) {
  return axios.delete(
    `${REWARDORPENALTYTYPES_URL}/delete/${rewardOrPenaltyTypesId}`
  );
}
// DELETE RewardOrPenaltyTypes by ids
export function deleteRewardOrPenaltyTypes(ids) {
  return axios.post(
    `${REWARDORPENALTYTYPES_URL}/deleteRewardOrPenaltyTypes`,
    ids
  );
}
