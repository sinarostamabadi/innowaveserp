import axios from "axios";
export const UNITCONVERSIONS_URL = "UnitConversion";
// CREATE = add a new unitConversions to the server
export function createUnitConversion(unitConversions) {
  return axios.post(`${UNITCONVERSIONS_URL}/post`, unitConversions);
}
// READ
export function getAllUnitConversions() {
  return axios.get(`${UNITCONVERSIONS_URL}/get`);
}
export function getUnitConversionById(unitConversionsId) {
  return axios.get(`${UNITCONVERSIONS_URL}/get/${unitConversionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findUnitConversions(queryParams) {
  return axios.post(`${UNITCONVERSIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateUnitConversion(id, unitConversions) {
  return axios.put(`${UNITCONVERSIONS_URL}/put/${id}`, unitConversions);
}
// UPDATE Status
export function updateStatusForUnitConversions(ids, status) {
  return axios.post(`${UNITCONVERSIONS_URL}/updateStatusForUnitConversions`, {
    ids,
    status,
  });
}
// DELETE = the unitConversions from the server
export function deleteUnitConversion(unitConversionsId) {
  return axios.delete(`${UNITCONVERSIONS_URL}/delete/${unitConversionsId}`);
}
// DELETE UnitConversions by ids
export function deleteUnitConversions(ids) {
  return axios.post(`${UNITCONVERSIONS_URL}/deleteUnitConversions`, ids);
}
