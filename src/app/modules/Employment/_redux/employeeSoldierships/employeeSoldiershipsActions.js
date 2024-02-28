import * as requestFromServer from "./employeeSoldiershipsCrud";
import {
  employeeSoldiershipsSlice,
  callTypes,
} from "./employeeSoldiershipsSlice";
const { actions } = employeeSoldiershipsSlice;
export const fetchEmployeeSoldierships = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeSoldierships(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeSoldiershipsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeSoldierships";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeSoldiership = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeSoldiershipFetched({
        employeeSoldiershipForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeSoldiershipById(id)
    .then((response) => {
      const employeeSoldiership = response.data;
      dispatch(
        actions.employeeSoldiershipFetched({
          employeeSoldiershipForEdit: employeeSoldiership,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeSoldiership";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeSoldiership = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeSoldiership(id)
    .then((response) => {
      dispatch(actions.employeeSoldiershipDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeSoldiership";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeSoldiership =
  (employeeSoldiershipForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createEmployeeSoldiership(employeeSoldiershipForCreation)
      .then((response) => {
        const employeeSoldiership = response.data;
        dispatch(actions.employeeSoldiershipCreated(employeeSoldiership));
      })
      .catch((error) => {
        error.clientMessage = "Can't create employeeSoldiership";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeSoldiership =
  (employeeSoldiership) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateEmployeeSoldiership(employeeSoldiership)
      .then((response) => {
        dispatch(actions.employeeSoldiershipUpdated({ employeeSoldiership }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update employeeSoldiership";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeSoldiershipsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeSoldierships(ids, status)
    .then(() => {
      dispatch(actions.employeeSoldiershipsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeSoldierships status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeSoldierships = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeSoldierships(ids)
    .then(() => {
      dispatch(actions.employeeSoldiershipsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeSoldierships";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
