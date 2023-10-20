import axios from "axios";
export const UNITMEASUREGROUPS_URL = "UnitMeasureGroup";
// CREATE = add a new unitMeasureGroups to the server 
export function createUnitMeasureGroup(unitMeasureGroups) { 
  return axios.post(`${UNITMEASUREGROUPS_URL}/post`, unitMeasureGroups); 
}
// READ  
export function getAllUnitMeasureGroups() {
  return axios.get(`${UNITMEASUREGROUPS_URL}/get`);
}
export function getUnitMeasureGroupById(unitMeasureGroupsId) {
  return axios.get(`${UNITMEASUREGROUPS_URL}/get/${unitMeasureGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findUnitMeasureGroups(queryParams) {
  return axios.post(`${UNITMEASUREGROUPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateUnitMeasureGroup(id, unitMeasureGroups) {
  return axios.put(`${UNITMEASUREGROUPS_URL}/put/${id}`, unitMeasureGroups);
}
// UPDATE Status  
export function updateStatusForUnitMeasureGroups(ids, status) {
  return axios.post(`${UNITMEASUREGROUPS_URL}/updateStatusForUnitMeasureGroups`, {
    ids,
    status,
  });
}
// DELETE = the unitMeasureGroups from the server  
export function deleteUnitMeasureGroup(unitMeasureGroupsId) {
  return axios.delete(`${UNITMEASUREGROUPS_URL}/delete/${unitMeasureGroupsId}`);
}
// DELETE UnitMeasureGroups by ids  
export function deleteUnitMeasureGroups(ids) {
return axios.post(`${UNITMEASUREGROUPS_URL}/deleteUnitMeasureGroups`, ids);
}