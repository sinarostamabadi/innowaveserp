
import * as requestFromServer from "./iODeviceTransactionTypesCrud";
import { iODeviceTransactionTypesSlice, callTypes } from "./iODeviceTransactionTypesSlice";
const { actions } = iODeviceTransactionTypesSlice;
export const fetchIODeviceTransactionTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findIODeviceTransactionTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.iODeviceTransactionTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find iODeviceTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchIODeviceTransactionType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.iODeviceTransactionTypeFetched({ iODeviceTransactionTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getIODeviceTransactionTypeById(id)  
    .then((response) => {
      const iODeviceTransactionType = response.data;
      dispatch(actions.iODeviceTransactionTypeFetched({ iODeviceTransactionTypeForEdit: iODeviceTransactionType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find iODeviceTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODeviceTransactionType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteIODeviceTransactionType(id)  
    .then((response) => {
      dispatch(actions.iODeviceTransactionTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete iODeviceTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createIODeviceTransactionType = (iODeviceTransactionTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createIODeviceTransactionType(iODeviceTransactionTypeForCreation)  
    .then((response) => {
      const iODeviceTransactionType = response.data;
      dispatch(actions.iODeviceTransactionTypeCreated(iODeviceTransactionType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create iODeviceTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODeviceTransactionType = (iODeviceTransactionType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateIODeviceTransactionType(iODeviceTransactionType)  
    .then((response) => {
      dispatch(actions.iODeviceTransactionTypeUpdated({ iODeviceTransactionType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update iODeviceTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIODeviceTransactionTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForIODeviceTransactionTypes(ids, status)  
    .then(() => {
      dispatch(actions.iODeviceTransactionTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update iODeviceTransactionTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIODeviceTransactionTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteIODeviceTransactionTypes(ids)  
    .then(() => {
      dispatch(actions.iODeviceTransactionTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete iODeviceTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 