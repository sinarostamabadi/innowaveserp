import axios from "axios";
export const SETTING_URL = "Setting";
// CREATE = add a new setting to the server
export function createSetting(setting) {
  return axios.post(`${SETTING_URL}/post`, setting);
}
// READ
export function getAllSetting() {
  return axios.get(`${SETTING_URL}/get`);
}
export function getSettingById(settingId) {
  return axios.get(`${SETTING_URL}/get/${settingId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findSetting(queryParams) {
  return axios.post(`${SETTING_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateSetting(id, setting) {
  return axios.put(`${SETTING_URL}/put/${id}`, setting);
}
// UPDATE Status
export function updateStatusForSetting(ids, status) {
  return axios.post(`${SETTING_URL}/updateStatusForSetting`, {
    ids,
    status,
  });
}
// DELETE = the setting from the server
export function deleteSetting(settingId) {
  return axios.delete(`${SETTING_URL}/delete/${settingId}`);
}
// DELETE Setting by ids
export function deleteSettings(ids) {
  return axios.post(`${SETTING_URL}/deleteSetting`, ids);
}
