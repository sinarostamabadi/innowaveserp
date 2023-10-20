
import * as requestFromServer from "./operationTypeAccountsCrud";
import { operationTypeAccountsSlice, callTypes } from "./operationTypeAccountsSlice";
const { actions } = operationTypeAccountsSlice;
export const fetchOperationTypeAccounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOperationTypeAccounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.operationTypeAccountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operationTypeAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOperationTypeAccount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.operationTypeAccountFetched({ operationTypeAccountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOperationTypeAccountById(id)  
    .then((response) => {
      const operationTypeAccount = response.data;
      dispatch(actions.operationTypeAccountFetched({ operationTypeAccountForEdit: operationTypeAccount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operationTypeAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperationTypeAccount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperationTypeAccount(id)  
    .then((response) => {
      dispatch(actions.operationTypeAccountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operationTypeAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOperationTypeAccount = (operationTypeAccountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOperationTypeAccount(operationTypeAccountForCreation)  
    .then((response) => {
      const operationTypeAccount = response.data;
      dispatch(actions.operationTypeAccountCreated(operationTypeAccount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create operationTypeAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperationTypeAccount = (operationTypeAccount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOperationTypeAccount(operationTypeAccount)  
    .then((response) => {
      dispatch(actions.operationTypeAccountUpdated({ operationTypeAccount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operationTypeAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperationTypeAccountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOperationTypeAccounts(ids, status)  
    .then(() => {
      dispatch(actions.operationTypeAccountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operationTypeAccounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperationTypeAccounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperationTypeAccounts(ids)  
    .then(() => {
      dispatch(actions.operationTypeAccountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operationTypeAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 