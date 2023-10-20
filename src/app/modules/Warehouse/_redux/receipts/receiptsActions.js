
import * as requestFromServer from "./receiptsCrud";
import { receiptsSlice, callTypes } from "./receiptsSlice";
const { actions } = receiptsSlice;
export const fetchReceipts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findReceipts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.receiptsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receipts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchReceipt = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.receiptFetched({ receiptForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getReceiptById(id)  
    .then((response) => {
      const receipt = response.data;
      dispatch(actions.receiptFetched({ receiptForEdit: receipt }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceipt = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceipt(id)  
    .then((response) => {
      dispatch(actions.receiptDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createReceipt = (receiptForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createReceipt(receiptForCreation)  
    .then((response) => {
      const receipt = response.data;
      fnCallBack(receipt);

      dispatch(actions.receiptCreated(receipt));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceipt = (id, receipt, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateReceipt(id, receipt)  
    .then((response) => {
      fnCallBack(receipt);
      dispatch(actions.receiptUpdated({ receipt }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receipt";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReceiptsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForReceipts(ids, status)  
    .then(() => {
      dispatch(actions.receiptsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update receipts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReceipts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReceipts(ids)  
    .then(() => {
      dispatch(actions.receiptsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete receipts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};