
import * as requestFromServer from "./receiptDtlsCrud";
import { receiptDtlsSlice, callTypes } from "./receiptDtlsSlice";
const { actions } = receiptDtlsSlice;
export const fetchReceiptDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findReceiptDtls(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.receiptDtlsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receiptDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchReceiptDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.receiptDtlFetched({ receiptDtlForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getReceiptDtlById(id)  
    .then((response) => {
      const receiptDtl = response.data;
      dispatch(actions.receiptDtlFetched({ receiptDtlForEdit: receiptDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receiptDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceiptDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceiptDtl(id)  
    .then((response) => {
      dispatch(actions.receiptDtlDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receiptDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createReceiptDtl = (receiptDtlForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createReceiptDtl(receiptDtlForCreation)  
    .then((response) => {
      const receiptDtl = response.data;
      dispatch(actions.receiptDtlCreated(receiptDtl));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create receiptDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceiptDtl = (receiptDtl) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateReceiptDtl(receiptDtl)  
    .then((response) => {
      dispatch(actions.receiptDtlUpdated({ receiptDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receiptDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceiptDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForReceiptDtls(ids, status)  
    .then(() => {
      dispatch(actions.receiptDtlsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receiptDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceiptDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceiptDtls(ids)  
    .then(() => {
      dispatch(actions.receiptDtlsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receiptDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 