import * as requestFromServer from "./employeeWorkShiftsCrud";
import { employeeWorkShiftsSlice, callTypes } from "./employeeWorkShiftsSlice";
const { actions } = employeeWorkShiftsSlice;
export const fetchEmployeeWorkShifts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeWorkShifts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeWorkShiftsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeWorkShifts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeWorkShift = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeWorkShiftFetched({ employeeWorkShiftForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeWorkShiftById(id)
    .then((response) => {
      const employeeWorkShift = response.data;
      dispatch(
        actions.employeeWorkShiftFetched({
          employeeWorkShiftForEdit: employeeWorkShift,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeWorkShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeWorkShift = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeWorkShift(id)
    .then((response) => {
      dispatch(actions.employeeWorkShiftDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeWorkShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeWorkShift =
  (employeeWorkShiftForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createEmployeeWorkShift(employeeWorkShiftForCreation)
      .then((response) => {
        const employeeWorkShift = response.data;
        dispatch(actions.employeeWorkShiftCreated(employeeWorkShift));
      })
      .catch((error) => {
        error.clientMessage = "Can't create employeeWorkShift";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeWorkShift = (employeeWorkShift) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployeeWorkShift(employeeWorkShift)
    .then((response) => {
      dispatch(actions.employeeWorkShiftUpdated({ employeeWorkShift }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeWorkShift";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeWorkShiftsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeWorkShifts(ids, status)
    .then(() => {
      dispatch(actions.employeeWorkShiftsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeWorkShifts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeWorkShifts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeWorkShifts(ids)
    .then(() => {
      dispatch(actions.employeeWorkShiftsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeWorkShifts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
