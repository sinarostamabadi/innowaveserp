
import * as requestFromServer from "./employeeMissionsCrud";
import { employeeMissionsSlice, callTypes } from "./employeeMissionsSlice";
const { actions } = employeeMissionsSlice;
export const fetchEmployeeMissions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeMissions(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeMissionsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeMissions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeMission = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeMissionFetched({ employeeMissionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeMissionById(id)  
    .then((response) => {
      const employeeMission = response.data;
      dispatch(actions.employeeMissionFetched({ employeeMissionForEdit: employeeMission }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeMission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeMission = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeMission(id)  
    .then((response) => {
      dispatch(actions.employeeMissionDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeMission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeMission = (employeeMissionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeMission(employeeMissionForCreation)  
    .then((response) => {
      const employeeMission = response.data;
      dispatch(actions.employeeMissionCreated(employeeMission));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeMission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeMission = (employeeMission) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeMission(employeeMission)  
    .then((response) => {
      dispatch(actions.employeeMissionUpdated({ employeeMission }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeMission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeMissionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeMissions(ids, status)  
    .then(() => {
      dispatch(actions.employeeMissionsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeMissions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeMissions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeMissions(ids)  
    .then(() => {
      dispatch(actions.employeeMissionsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeMissions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 