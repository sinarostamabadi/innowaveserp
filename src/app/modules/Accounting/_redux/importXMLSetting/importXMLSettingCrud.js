import axios from "axios";
export const IMPORTXMLSETTING_URL = "ImportXMLSetting";
// CREATE = add a new importXMLSetting to the server
export function createImportXMLSetting(importXMLSetting) {
  return axios.post(`${IMPORTXMLSETTING_URL}/post`, importXMLSetting);
}
// READ
export function getAllImportXMLSetting() {
  return axios.get(`${IMPORTXMLSETTING_URL}/get`);
}
export function getImportXMLSettingById(importXMLSettingId) {
  return axios.get(`${IMPORTXMLSETTING_URL}/get/${importXMLSettingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findImportXMLSetting(queryParams) {
  return axios.post(`${IMPORTXMLSETTING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateImportXMLSetting(id, importXMLSetting) {
  return axios.put(`${IMPORTXMLSETTING_URL}/put/${id}`, importXMLSetting);
}
// UPDATE Status
export function updateStatusForImportXMLSetting(ids, status) {
  return axios.post(`${IMPORTXMLSETTING_URL}/updateStatusForImportXMLSetting`, {
    ids,
    status,
  });
}
// DELETE = the importXMLSetting from the server
export function deleteImportXMLSetting(importXMLSettingId) {
  return axios.delete(`${IMPORTXMLSETTING_URL}/delete/${importXMLSettingId}`);
}
// DELETE ImportXMLSetting by ids
export function deleteImportXMLSetting(ids) {
  return axios.post(`${IMPORTXMLSETTING_URL}/deleteImportXMLSetting`, ids);
}
