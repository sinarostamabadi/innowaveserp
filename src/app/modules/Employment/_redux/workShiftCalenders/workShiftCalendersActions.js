
import * as requestFromServer from "./workShiftCalendersCrud";
import { workShiftCalendersSlice, callTypes } from "./workShiftCalendersSlice";
const { actions } = workShiftCalendersSlice;
export const fetchWorkShiftCalenders = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findWorkShiftCalenders(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.workShiftCalendersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find workShiftCalenders";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchWorkShiftCalender = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.workShiftCalenderFetched({ workShiftCalenderForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getWorkShiftCalenderById(id)  
    .then((response) => {
      const workShiftCalender = response.data;
      dispatch(actions.workShiftCalenderFetched({ workShiftCalenderForEdit: workShiftCalender }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find workShiftCalender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWorkShiftCalender = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteWorkShiftCalender(id)  
    .then((response) => {
      dispatch(actions.workShiftCalenderDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete workShiftCalender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createWorkShiftCalender = (workShiftCalenderForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createWorkShiftCalender(workShiftCalenderForCreation)  
    .then((response) => {
      const workShiftCalender = response.data;
      dispatch(actions.workShiftCalenderCreated(workShiftCalender));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create workShiftCalender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWorkShiftCalender = (workShiftCalender) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateWorkShiftCalender(workShiftCalender)  
    .then((response) => {
      dispatch(actions.workShiftCalenderUpdated({ workShiftCalender }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update workShiftCalender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWorkShiftCalendersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForWorkShiftCalenders(ids, status)  
    .then(() => {
      dispatch(actions.workShiftCalendersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update workShiftCalenders status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWorkShiftCalenders = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteWorkShiftCalenders(ids)  
    .then(() => {
      dispatch(actions.workShiftCalendersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete workShiftCalenders";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 