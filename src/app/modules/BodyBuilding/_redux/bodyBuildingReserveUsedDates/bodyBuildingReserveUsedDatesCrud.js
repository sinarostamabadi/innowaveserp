import axios from "axios";
export const BODYBUILDINGRESERVEUSEDDATES_URL = "BodyBuildingReserveUsedDate";
// CREATE = add a new bodyBuildingReserveUsedDates to the server
export function createBodyBuildingReserveUsedDate(
  bodyBuildingReserveUsedDates
) {
  return axios.post(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/post`,
    bodyBuildingReserveUsedDates
  );
}
// READ
export function getAllBodyBuildingReserveUsedDates() {
  return axios.get(`${BODYBUILDINGRESERVEUSEDDATES_URL}/get`);
}
export function getBodyBuildingReserveUsedDateById(
  bodyBuildingReserveUsedDatesId
) {
  return axios.get(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/get/${bodyBuildingReserveUsedDatesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBodyBuildingReserveUsedDates(queryParams) {
  return axios.post(`${BODYBUILDINGRESERVEUSEDDATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBodyBuildingReserveUsedDate(
  id,
  bodyBuildingReserveUsedDates
) {
  return axios.put(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/put/${id}`,
    bodyBuildingReserveUsedDates
  );
}
// UPDATE Status
export function updateStatusForBodyBuildingReserveUsedDates(ids, status) {
  return axios.post(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/updateStatusForBodyBuildingReserveUsedDates`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the bodyBuildingReserveUsedDates from the server
export function deleteBodyBuildingReserveUsedDate(
  bodyBuildingReserveUsedDatesId
) {
  return axios.delete(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/delete/${bodyBuildingReserveUsedDatesId}`
  );
}
// DELETE BodyBuildingReserveUsedDates by ids
export function deleteBodyBuildingReserveUsedDates(ids) {
  return axios.post(
    `${BODYBUILDINGRESERVEUSEDDATES_URL}/deleteBodyBuildingReserveUsedDates`,
    ids
  );
}
