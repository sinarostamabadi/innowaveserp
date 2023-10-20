
import * as requestFromServer from "./employeeEducarionsCrud";
import { employeeEducarionsSlice, callTypes } from "./employeeEducarionsSlice";
const { actions } = employeeEducarionsSlice;
export const fetchEmployeeEducarions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeEducarions(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeEducarionsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeEducarions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeEducarion = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeEducarionFetched({ employeeEducarionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeEducarionById(id)  
    .then((response) => {
      const employeeEducarion = response.data;
      dispatch(actions.employeeEducarionFetched({ employeeEducarionForEdit: employeeEducarion }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeEducarion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeEducarion = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeEducarion(id)  
    .then((response) => {
      dispatch(actions.employeeEducarionDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeEducarion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeEducarion = (employeeEducarionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeEducarion(employeeEducarionForCreation)  
    .then((response) => {
      const employeeEducarion = response.data;
      dispatch(actions.employeeEducarionCreated(employeeEducarion));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeEducarion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeEducarion = (employeeEducarion) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeEducarion(employeeEducarion)  
    .then((response) => {
      dispatch(actions.employeeEducarionUpdated({ employeeEducarion }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeEducarion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeEducarionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeEducarions(ids, status)  
    .then(() => {
      dispatch(actions.employeeEducarionsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeEducarions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeEducarions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeEducarions(ids)  
    .then(() => {
      dispatch(actions.employeeEducarionsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeEducarions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 