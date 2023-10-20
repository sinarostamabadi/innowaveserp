import * as requestFromServer from "./personSpecialDaysCrud";
import { personSpecialDaysSlice, callTypes } from "./personSpecialDaysSlice";

const { actions } = personSpecialDaysSlice;

export const fetchPersonSpecialDays = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPersonSpecialDays(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.personSpecialDaysFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find personSpecialDays";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPersonSpecialDay = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.personSpecialDayFetched({ personSpecialDayForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPersonSpecialDayById(id)  
    .then((response) => {
      const personSpecialDay = response.data;
      dispatch(actions.personSpecialDayFetched({ personSpecialDayForEdit: personSpecialDay }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find personSpecialDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonSpecialDay = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePersonSpecialDay(id)  
    .then((response) => {
      dispatch(actions.personSpecialDayDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete personSpecialDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPersonSpecialDay = (personSpecialDayForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPersonSpecialDay(personSpecialDayForCreation)  
    .then((response) => {
      const personSpecialDay = response.data;
      dispatch(actions.personSpecialDayCreated(personSpecialDay));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create personSpecialDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonSpecialDay = (personSpecialDay) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePersonSpecialDay(personSpecialDay)  
    .then((response) => {
      dispatch(actions.personSpecialDayUpdated({ personSpecialDay }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update personSpecialDay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonSpecialDaysStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPersonSpecialDays(ids, status)  
    .then(() => {
      dispatch(actions.personSpecialDaysStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update personSpecialDays status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonSpecialDays = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePersonSpecialDays(ids)  
    .then(() => {
      dispatch(actions.personSpecialDaysDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete personSpecialDays";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 