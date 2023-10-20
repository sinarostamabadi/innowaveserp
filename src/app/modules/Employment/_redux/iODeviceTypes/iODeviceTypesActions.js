
import * as requestFromServer from "./iODeviceTypesCrud";
import { iODeviceTypesSlice, callTypes } from "./iODeviceTypesSlice";
const { actions } = iODeviceTypesSlice;
export const fetchIODeviceTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findIODeviceTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.iODeviceTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find iODeviceTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchIODeviceType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.iODeviceTypeFetched({ iODeviceTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getIODeviceTypeById(id)  
    .then((response) => {
      const iODeviceType = response.data;
      dispatch(actions.iODeviceTypeFetched({ iODeviceTypeForEdit: iODeviceType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find iODeviceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODeviceType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteIODeviceType(id)  
    .then((response) => {
      dispatch(actions.iODeviceTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete iODeviceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createIODeviceType = (iODeviceTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createIODeviceType(iODeviceTypeForCreation)  
    .then((response) => {
      const iODeviceType = response.data;
      dispatch(actions.iODeviceTypeCreated(iODeviceType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create iODeviceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODeviceType = (iODeviceType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateIODeviceType(iODeviceType)  
    .then((response) => {
      dispatch(actions.iODeviceTypeUpdated({ iODeviceType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update iODeviceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODeviceTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForIODeviceTypes(ids, status)  
    .then(() => {
      dispatch(actions.iODeviceTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update iODeviceTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODeviceTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteIODeviceTypes(ids)  
    .then(() => {
      dispatch(actions.iODeviceTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete iODeviceTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 