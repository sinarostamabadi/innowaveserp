
import * as requestFromServer from "./bankTransfersCrud";
import { bankTransfersSlice, callTypes } from "./bankTransfersSlice";
const { actions } = bankTransfersSlice;
export const fetchBankTransfers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBankTransfers(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bankTransfersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bankTransfers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBankTransfer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bankTransferFetched({ bankTransferForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBankTransferById(id)  
    .then((response) => {
      const bankTransfer = response.data;
      dispatch(actions.bankTransferFetched({ bankTransferForEdit: bankTransfer }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bankTransfer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBankTransfer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBankTransfer(id)  
    .then((response) => {
      dispatch(actions.bankTransferDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bankTransfer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBankTransfer = (bankTransferForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBankTransfer(bankTransferForCreation)  
    .then((response) => {
      const bankTransfer = response.data;
      dispatch(actions.bankTransferCreated(bankTransfer));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bankTransfer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBankTransfer = (bankTransfer) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBankTransfer(bankTransfer)  
    .then((response) => {
      dispatch(actions.bankTransferUpdated({ bankTransfer }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bankTransfer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBankTransfersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBankTransfers(ids, status)  
    .then(() => {
      dispatch(actions.bankTransfersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bankTransfers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBankTransfers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBankTransfers(ids)  
    .then(() => {
      dispatch(actions.bankTransfersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bankTransfers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 