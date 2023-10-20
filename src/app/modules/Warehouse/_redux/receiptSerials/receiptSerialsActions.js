
import * as requestFromServer from "./receiptSerialsCrud";
import { receiptSerialsSlice, callTypes } from "./receiptSerialsSlice";
const { actions } = receiptSerialsSlice;
export const fetchReceiptSerials = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findReceiptSerials(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.receiptSerialsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receiptSerials";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchReceiptSerial = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.receiptSerialFetched({ receiptSerialForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getReceiptSerialById(id)  
    .then((response) => {
      const receiptSerial = response.data;
      dispatch(actions.receiptSerialFetched({ receiptSerialForEdit: receiptSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receiptSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceiptSerial = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceiptSerial(id)  
    .then((response) => {
      dispatch(actions.receiptSerialDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receiptSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createReceiptSerial = (receiptSerialForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createReceiptSerial(receiptSerialForCreation)  
    .then((response) => {
      const receiptSerial = response.data;
      dispatch(actions.receiptSerialCreated(receiptSerial));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create receiptSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceiptSerial = (receiptSerial) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateReceiptSerial(receiptSerial)  
    .then((response) => {
      dispatch(actions.receiptSerialUpdated({ receiptSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receiptSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceiptSerialsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForReceiptSerials(ids, status)  
    .then(() => {
      dispatch(actions.receiptSerialsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receiptSerials status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceiptSerials = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceiptSerials(ids)  
    .then(() => {
      dispatch(actions.receiptSerialsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receiptSerials";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 