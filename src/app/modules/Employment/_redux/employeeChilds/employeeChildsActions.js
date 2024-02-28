import * as requestFromServer from "./employeeChildsCrud";
import { employeeChildsSlice, callTypes } from "./employeeChildsSlice";
const { actions } = employeeChildsSlice;
export const fetchEmployeeChilds = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeChilds(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeChildsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeChilds";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeChild = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeChildFetched({ employeeChildForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeChildById(id)
    .then((response) => {
      const employeeChild = response.data;
      dispatch(
        actions.employeeChildFetched({ employeeChildForEdit: employeeChild })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeChild";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeChild = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeChild(id)
    .then((response) => {
      dispatch(actions.employeeChildDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeChild";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeChild = (employeeChildForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployeeChild(employeeChildForCreation)
    .then((response) => {
      const employeeChild = response.data;
      dispatch(actions.employeeChildCreated(employeeChild));
    })
    .catch((error) => {
      error.clientMessage = "Can't create employeeChild";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeChild = (employeeChild) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployeeChild(employeeChild)
    .then((response) => {
      dispatch(actions.employeeChildUpdated({ employeeChild }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeChild";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeChildsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeChilds(ids, status)
    .then(() => {
      dispatch(actions.employeeChildsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeChilds status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeChilds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeChilds(ids)
    .then(() => {
      dispatch(actions.employeeChildsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeChilds";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
