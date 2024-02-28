import * as requestFromServer from "./employeeSpecialDatesCrud";
import {
  employeeSpecialDatesSlice,
  callTypes,
} from "./employeeSpecialDatesSlice";
const { actions } = employeeSpecialDatesSlice;
export const fetchEmployeeSpecialDates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeSpecialDates(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeSpecialDatesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeSpecialDates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeSpecialDate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeSpecialDateFetched({
        employeeSpecialDateForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeSpecialDateById(id)
    .then((response) => {
      const employeeSpecialDate = response.data;
      dispatch(
        actions.employeeSpecialDateFetched({
          employeeSpecialDateForEdit: employeeSpecialDate,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeSpecialDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeSpecialDate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeSpecialDate(id)
    .then((response) => {
      dispatch(actions.employeeSpecialDateDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeSpecialDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeSpecialDate =
  (employeeSpecialDateForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createEmployeeSpecialDate(employeeSpecialDateForCreation)
      .then((response) => {
        const employeeSpecialDate = response.data;
        dispatch(actions.employeeSpecialDateCreated(employeeSpecialDate));
      })
      .catch((error) => {
        error.clientMessage = "Can't create employeeSpecialDate";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeSpecialDate =
  (employeeSpecialDate) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateEmployeeSpecialDate(employeeSpecialDate)
      .then((response) => {
        dispatch(actions.employeeSpecialDateUpdated({ employeeSpecialDate }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update employeeSpecialDate";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeSpecialDatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeSpecialDates(ids, status)
    .then(() => {
      dispatch(actions.employeeSpecialDatesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeSpecialDates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeSpecialDates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeSpecialDates(ids)
    .then(() => {
      dispatch(actions.employeeSpecialDatesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeSpecialDates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
