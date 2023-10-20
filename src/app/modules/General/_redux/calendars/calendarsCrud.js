import axios from "axios";
export const CALENDARS_URL = "Calendar";
// CREATE = add a new calendars to the server 
export function createCalendar(calendars) { 
  return axios.post(`${CALENDARS_URL}/post`, calendars); 
}
// READ  
export function getAllCalendars() {
  return axios.get(`${CALENDARS_URL}/get`);
}
export function getCalendarById(calendarsId) {
  return axios.get(`${CALENDARS_URL}/${calendarsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCalendars(queryParams) {
  return axios.post(`${CALENDARS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCalendar(calendars) {
  return axios.put(`${CALENDARS_URL}`, calendars);
}
// UPDATE Status  
export function updateStatusForCalendars(ids, status) {
  return axios.post(`${CALENDARS_URL}/updateStatusForCalendars`, {
    ids,
    status,
  });
}
// DELETE = the calendars from the server  
export function deleteCalendar(calendarsId) {
  return axios.delete(`${CALENDARS_URL}/${calendarsId}`);
}
// DELETE Calendars by ids  
export function deleteCalendars(ids) {
return axios.post(`${CALENDARS_URL}/deleteCalendars`, ids);
}
