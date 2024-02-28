import axios from "axios";
export const BILLIARDTIMEPRICEING_URL = "BilliardTimePriceing";
// CREATE = add a new billiardTimePriceing to the server
export function createBilliardTimePriceing(billiardTimePriceing) {
  return axios.post(`${BILLIARDTIMEPRICEING_URL}/post`, billiardTimePriceing);
}
// READ
export function getAllBilliardTimePriceing() {
  return axios.get(`${BILLIARDTIMEPRICEING_URL}/get`);
}
export function getBilliardTimePriceingById(billiardTimePriceingId) {
  return axios.get(`${BILLIARDTIMEPRICEING_URL}/get/${billiardTimePriceingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBilliardTimePriceing(queryParams) {
  return axios.post(`${BILLIARDTIMEPRICEING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBilliardTimePriceing(id, billiardTimePriceing) {
  return axios.put(
    `${BILLIARDTIMEPRICEING_URL}/put/${id}`,
    billiardTimePriceing
  );
}
// UPDATE Status
export function updateStatusForBilliardTimePriceing(ids, status) {
  return axios.post(
    `${BILLIARDTIMEPRICEING_URL}/updateStatusForBilliardTimePriceing`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the billiardTimePriceing from the server
export function deleteBilliardTimePriceing(billiardTimePriceingId) {
  return axios.delete(
    `${BILLIARDTIMEPRICEING_URL}/delete/${billiardTimePriceingId}`
  );
}
// DELETE BilliardTimePriceing by ids
export function deleteBilliardTimePriceing(ids) {
  return axios.post(
    `${BILLIARDTIMEPRICEING_URL}/deleteBilliardTimePriceing`,
    ids
  );
}
