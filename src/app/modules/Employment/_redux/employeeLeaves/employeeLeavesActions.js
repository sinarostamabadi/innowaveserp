import * as requestFromServer from "./employeeLeavesCrud";
import { employeeLeavesSlice, callTypes } from "./employeeLeavesSlice";
const { actions } = employeeLeavesSlice;
export const fetchEmployeeLeaves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeLeaves(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeLeavesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeLeaves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeLeave = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeLeaveFetched({ employeeLeaveForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeLeaveById(id)
    .then((response) => {
      const employeeLeave = response.data;
      dispatch(
        actions.employeeLeaveFetched({ employeeLeaveForEdit: employeeLeave })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeLeave";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeLeave = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeLeave(id)
    .then((response) => {
      dispatch(actions.employeeLeaveDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeLeave";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeLeave = (employeeLeaveForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployeeLeave(employeeLeaveForCreation)
    .then((response) => {
      const employeeLeave = response.data;
      dispatch(actions.employeeLeaveCreated(employeeLeave));
    })
    .catch((error) => {
      error.clientMessage = "Can't create employeeLeave";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeLeave = (employeeLeave) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployeeLeave(employeeLeave)
    .then((response) => {
      dispatch(actions.employeeLeaveUpdated({ employeeLeave }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeLeave";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeLeavesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeLeaves(ids, status)
    .then(() => {
      dispatch(actions.employeeLeavesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeLeaves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeLeaves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeLeaves(ids)
    .then(() => {
      dispatch(actions.employeeLeavesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeLeaves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
