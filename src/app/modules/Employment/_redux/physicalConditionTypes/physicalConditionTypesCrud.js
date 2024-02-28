import axios from "axios";
export const PHYSICALCONDITIONTYPES_URL = "PhysicalConditionType";
// CREATE = add a new physicalConditionTypes to the server
export function createPhysicalConditionType(physicalConditionTypes) {
  return axios.post(
    `${PHYSICALCONDITIONTYPES_URL}/post`,
    physicalConditionTypes
  );
}
// READ
export function getAllPhysicalConditionTypes() {
  return axios.get(`${PHYSICALCONDITIONTYPES_URL}/get`);
}
export function getPhysicalConditionTypeById(physicalConditionTypesId) {
  return axios.get(
    `${PHYSICALCONDITIONTYPES_URL}/get/${physicalConditionTypesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findPhysicalConditionTypes(queryParams) {
  return axios.post(`${PHYSICALCONDITIONTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePhysicalConditionType(id, physicalConditionTypes) {
  return axios.put(
    `${PHYSICALCONDITIONTYPES_URL}/put/${id}`,
    physicalConditionTypes
  );
}
// UPDATE Status
export function updateStatusForPhysicalConditionTypes(ids, status) {
  return axios.post(
    `${PHYSICALCONDITIONTYPES_URL}/updateStatusForPhysicalConditionTypes`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the physicalConditionTypes from the server
export function deletePhysicalConditionType(physicalConditionTypesId) {
  return axios.delete(
    `${PHYSICALCONDITIONTYPES_URL}/delete/${physicalConditionTypesId}`
  );
}
// DELETE PhysicalConditionTypes by ids
export function deletePhysicalConditionTypes(ids) {
  return axios.post(
    `${PHYSICALCONDITIONTYPES_URL}/deletePhysicalConditionTypes`,
    ids
  );
}
