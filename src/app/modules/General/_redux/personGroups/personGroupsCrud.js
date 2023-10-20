
import axios from "axios";
export const PersonGroup_Url = "PersonGroup";
// CREATE = add a new personGroups to the server 
export function createPersonGroup(personGroups) { 
  return axios.post(`${PersonGroup_Url}/post`, personGroups); 
}
// READ  
export function getAllPersonGroups() {
  return axios.get(`${PersonGroup_Url}/getall`);
}
export function getPersonGroupById(personGroupsId) {
  return axios.get(`${PersonGroup_Url}/get/${personGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPersonGroups(queryParams) {
  return axios.post(`${PersonGroup_Url}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePersonGroup(id, personGroups) {
  return axios.put(`${PersonGroup_Url}/put/${id}`, personGroups);
}
// UPDATE Status  
export function updateStatusForPersonGroups(ids, status) {
  return axios.post(`${PersonGroup_Url}/updateStatusForPersonGroups`, {
    ids,
    status,
  });
}
// DELETE = the personGroups from the server  
export function deletePersonGroup(personGroupsId) {
  return axios.delete(`${PersonGroup_Url}/delete/${personGroupsId}`);
}
// DELETE PersonGroups by ids  
export function deletePersonGroups(ids) {
return axios.post(`${PersonGroup_Url}/deletePersonGroups`, ids);
}

// SUGGESION personGroup
export function suggestPersonGroup(query) {
  return axios.post(`${PersonGroup_Url}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}