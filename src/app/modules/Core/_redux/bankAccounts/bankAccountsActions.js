import * as requestFromServer from "./bankAccountsCrud";
import { bankAccountsSlice, callTypes } from "./bankAccountsSlice";
const { actions } = bankAccountsSlice;
export const fetchBankAccounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBankAccounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bankAccountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bankAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBankAccount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bankAccountFetched({ bankAccountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBankAccountById(id)  
    .then((response) => {
      const bankAccount = response.data;
      dispatch(actions.bankAccountFetched({ bankAccountForEdit: bankAccount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBankAccount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBankAccount(id)  
    .then((response) => {
      dispatch(actions.bankAccountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createBankAccount = (bankAccountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBankAccount(bankAccountForCreation)  
    .then((response) => {
      const bankAccount = response.data;
      dispatch(actions.bankAccountCreated(bankAccount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateBankAccount = (id, bankAccount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBankAccount(id, bankAccount)  
    .then((response) => {
      dispatch(actions.bankAccountUpdated({ bankAccount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bankAccount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateBankAccountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBankAccounts(ids, status)  
    .then(() => {
      dispatch(actions.bankAccountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bankAccounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBankAccounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBankAccounts(ids)  
    .then(() => {
      dispatch(actions.bankAccountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bankAccounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
