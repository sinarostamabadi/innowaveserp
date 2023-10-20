
import * as requestFromServer from "./employeeMonthlyCalculatedsCrud";
import { employeeMonthlyCalculatedsSlice, callTypes } from "./employeeMonthlyCalculatedsSlice";
const { actions } = employeeMonthlyCalculatedsSlice;
export const fetchEmployeeMonthlyCalculateds = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeMonthlyCalculateds(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeMonthlyCalculatedsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeMonthlyCalculateds";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeMonthlyCalculated = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeMonthlyCalculatedFetched({ employeeMonthlyCalculatedForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeMonthlyCalculatedById(id)  
    .then((response) => {
      const employeeMonthlyCalculated = response.data;
      dispatch(actions.employeeMonthlyCalculatedFetched({ employeeMonthlyCalculatedForEdit: employeeMonthlyCalculated }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeMonthlyCalculated";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeMonthlyCalculated = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeMonthlyCalculated(id)  
    .then((response) => {
      dispatch(actions.employeeMonthlyCalculatedDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeMonthlyCalculated";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeMonthlyCalculated = (employeeMonthlyCalculatedForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeMonthlyCalculated(employeeMonthlyCalculatedForCreation)  
    .then((response) => {
      const employeeMonthlyCalculated = response.data;
      dispatch(actions.employeeMonthlyCalculatedCreated(employeeMonthlyCalculated));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeMonthlyCalculated";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeMonthlyCalculated = (employeeMonthlyCalculated) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeMonthlyCalculated(employeeMonthlyCalculated)  
    .then((response) => {
      dispatch(actions.employeeMonthlyCalculatedUpdated({ employeeMonthlyCalculated }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeMonthlyCalculated";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeMonthlyCalculatedsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeMonthlyCalculateds(ids, status)  
    .then(() => {
      dispatch(actions.employeeMonthlyCalculatedsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeMonthlyCalculateds status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeMonthlyCalculateds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeMonthlyCalculateds(ids)  
    .then(() => {
      dispatch(actions.employeeMonthlyCalculatedsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeMonthlyCalculateds";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 