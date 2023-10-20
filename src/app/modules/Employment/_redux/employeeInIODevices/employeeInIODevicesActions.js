
import * as requestFromServer from "./employeeInIODevicesCrud";
import { employeeInIODevicesSlice, callTypes } from "./employeeInIODevicesSlice";
const { actions } = employeeInIODevicesSlice;
export const fetchEmployeeInIODevices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeInIODevices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeInIODevicesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeInIODevices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeInIODevice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeInIODeviceFetched({ employeeInIODeviceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeInIODeviceById(id)  
    .then((response) => {
      const employeeInIODevice = response.data;
      dispatch(actions.employeeInIODeviceFetched({ employeeInIODeviceForEdit: employeeInIODevice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeInIODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeInIODevice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeInIODevice(id)  
    .then((response) => {
      dispatch(actions.employeeInIODeviceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeInIODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeInIODevice = (employeeInIODeviceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeInIODevice(employeeInIODeviceForCreation)  
    .then((response) => {
      const employeeInIODevice = response.data;
      dispatch(actions.employeeInIODeviceCreated(employeeInIODevice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeInIODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeInIODevice = (employeeInIODevice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeInIODevice(employeeInIODevice)  
    .then((response) => {
      dispatch(actions.employeeInIODeviceUpdated({ employeeInIODevice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeInIODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeInIODevicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeInIODevices(ids, status)  
    .then(() => {
      dispatch(actions.employeeInIODevicesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeInIODevices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeInIODevices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeInIODevices(ids)  
    .then(() => {
      dispatch(actions.employeeInIODevicesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeInIODevices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 