
import * as requestFromServer from "./employeePhysicalConditionsCrud";
import { employeePhysicalConditionsSlice, callTypes } from "./employeePhysicalConditionsSlice";
const { actions } = employeePhysicalConditionsSlice;
export const fetchEmployeePhysicalConditions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeePhysicalConditions(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeePhysicalConditionsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeePhysicalConditions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeePhysicalCondition = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeePhysicalConditionFetched({ employeePhysicalConditionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeePhysicalConditionById(id)  
    .then((response) => {
      const employeePhysicalCondition = response.data;
      dispatch(actions.employeePhysicalConditionFetched({ employeePhysicalConditionForEdit: employeePhysicalCondition }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeePhysicalCondition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeePhysicalCondition = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeePhysicalCondition(id)  
    .then((response) => {
      dispatch(actions.employeePhysicalConditionDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeePhysicalCondition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeePhysicalCondition = (employeePhysicalConditionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeePhysicalCondition(employeePhysicalConditionForCreation)  
    .then((response) => {
      const employeePhysicalCondition = response.data;
      dispatch(actions.employeePhysicalConditionCreated(employeePhysicalCondition));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeePhysicalCondition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeePhysicalCondition = (employeePhysicalCondition) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeePhysicalCondition(employeePhysicalCondition)  
    .then((response) => {
      dispatch(actions.employeePhysicalConditionUpdated({ employeePhysicalCondition }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeePhysicalCondition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeePhysicalConditionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeePhysicalConditions(ids, status)  
    .then(() => {
      dispatch(actions.employeePhysicalConditionsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeePhysicalConditions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeePhysicalConditions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeePhysicalConditions(ids)  
    .then(() => {
      dispatch(actions.employeePhysicalConditionsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeePhysicalConditions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 