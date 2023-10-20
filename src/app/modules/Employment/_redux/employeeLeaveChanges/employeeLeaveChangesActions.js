
import * as requestFromServer from "./employeeLeaveChangesCrud";
import { employeeLeaveChangesSlice, callTypes } from "./employeeLeaveChangesSlice";
const { actions } = employeeLeaveChangesSlice;
export const fetchEmployeeLeaveChanges = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeLeaveChanges(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeLeaveChangesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeLeaveChanges";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeLeaveChange = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeLeaveChangeFetched({ employeeLeaveChangeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeLeaveChangeById(id)  
    .then((response) => {
      const employeeLeaveChange = response.data;
      dispatch(actions.employeeLeaveChangeFetched({ employeeLeaveChangeForEdit: employeeLeaveChange }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeLeaveChange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeLeaveChange = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeLeaveChange(id)  
    .then((response) => {
      dispatch(actions.employeeLeaveChangeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeLeaveChange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeLeaveChange = (employeeLeaveChangeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeLeaveChange(employeeLeaveChangeForCreation)  
    .then((response) => {
      const employeeLeaveChange = response.data;
      dispatch(actions.employeeLeaveChangeCreated(employeeLeaveChange));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeLeaveChange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeLeaveChange = (employeeLeaveChange) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeLeaveChange(employeeLeaveChange)  
    .then((response) => {
      dispatch(actions.employeeLeaveChangeUpdated({ employeeLeaveChange }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeLeaveChange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeLeaveChangesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeLeaveChanges(ids, status)  
    .then(() => {
      dispatch(actions.employeeLeaveChangesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeLeaveChanges status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeLeaveChanges = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeLeaveChanges(ids)  
    .then(() => {
      dispatch(actions.employeeLeaveChangesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeLeaveChanges";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 