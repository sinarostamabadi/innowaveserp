import * as requestFromServer from "./calendarsCrud";
import { calendarsSlice, callTypes } from "./calendarsSlice";
const { actions } = calendarsSlice;
export const fetchCalendars = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCalendars(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.calendarsFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find calendars";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCalendar = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.calendarFetched({ calendarForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCalendarById(id)  
    .then((response) => {
      const calendar = response.data;
      dispatch(actions.calendarFetched({ calendarForEdit: calendar }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find calendar";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCalendar = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCalendar(id)  
    .then((response) => {
      dispatch(actions.calendarDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete calendar";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCalendar = (calendarForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCalendar(calendarForCreation)  
    .then((response) => {
      const calendar = response.data;
      dispatch(actions.calendarCreated(calendar));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create calendar";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCalendar = (calendar) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCalendar(calendar)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.calendarUpdated({ calendar }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update calendar";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCalendarsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCalendars(ids, status)  
    .then(() => {
      dispatch(actions.calendarsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update calendars status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCalendars = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCalendars(ids)  
    .then(() => {
      dispatch(actions.calendarsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete calendars";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
