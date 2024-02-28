import * as requestFromServer from "./workShiftsCrud";
import { workShiftsSlice, callTypes } from "./workShiftsSlice";
const { actions } = workShiftsSlice;
export const fetchWorkShifts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findWorkShifts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.workShiftsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find workShifts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchWorkShift = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.workShiftFetched({ workShiftForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getWorkShiftById(id)
    .then((response) => {
      const workShift = response.data;
      dispatch(actions.workShiftFetched({ workShiftForEdit: workShift }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find workShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWorkShift = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWorkShift(id)
    .then((response) => {
      dispatch(actions.workShiftDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete workShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createWorkShift = (workShiftForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createWorkShift(workShiftForCreation)
    .then((response) => {
      const workShift = response.data;
      dispatch(actions.workShiftCreated(workShift));
    })
    .catch((error) => {
      error.clientMessage = "Can't create workShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWorkShift = (workShift) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateWorkShift(workShift)
    .then((response) => {
      dispatch(actions.workShiftUpdated({ workShift }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update workShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWorkShiftsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForWorkShifts(ids, status)
    .then(() => {
      dispatch(actions.workShiftsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update workShifts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWorkShifts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWorkShifts(ids)
    .then(() => {
      dispatch(actions.workShiftsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete workShifts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
