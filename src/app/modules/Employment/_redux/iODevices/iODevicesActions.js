import * as requestFromServer from "./iODevicesCrud";
import { iODevicesSlice, callTypes } from "./iODevicesSlice";
const { actions } = iODevicesSlice;
export const fetchIODevices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIODevices(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.iODevicesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find iODevices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchIODevice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.iODeviceFetched({ iODeviceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIODeviceById(id)
    .then((response) => {
      const iODevice = response.data;
      dispatch(actions.iODeviceFetched({ iODeviceForEdit: iODevice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find iODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODevice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIODevice(id)
    .then((response) => {
      dispatch(actions.iODeviceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createIODevice = (iODeviceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIODevice(iODeviceForCreation)
    .then((response) => {
      const iODevice = response.data;
      dispatch(actions.iODeviceCreated(iODevice));
    })
    .catch((error) => {
      error.clientMessage = "Can't create iODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODevice = (iODevice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIODevice(iODevice)
    .then((response) => {
      dispatch(actions.iODeviceUpdated({ iODevice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iODevice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODevicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIODevices(ids, status)
    .then(() => {
      dispatch(actions.iODevicesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iODevices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODevices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIODevices(ids)
    .then(() => {
      dispatch(actions.iODevicesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iODevices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
