
import axios from "axios";
export const ACTIONS_URL = "Action";
// CREATE = add a new actions to the server 
export function createAction(actions) { 
  return axios.post(`${ACTIONS_URL}/post`, actions); 
}
// READ  
export function getAllActions() {
  return axios.get(`${ACTIONS_URL}/get`);
}
export function getActionById(actionsId) {
  return axios.get(`${ACTIONS_URL}/get/${actionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findActions(queryParams) {
  return axios.post(`${ACTIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateAction(id, actions) {
  return axios.put(`${ACTIONS_URL}/put/${id}`, actions);
}
// UPDATE Status  
export function updateStatusForActions(ids, status) {
  return axios.post(`${ACTIONS_URL}/updateStatusForActions`, {
    ids,
    status,
  });
}
// DELETE = the actions from the server  
export function deleteAction(actionsId) {
  return axios.delete(`${ACTIONS_URL}/delete/${actionsId}`);
}
// DELETE Actions by ids  
export function deleteActions(ids) {
return axios.post(`${ACTIONS_URL}/deleteActions`, ids);
}