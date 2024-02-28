import * as requestFromServer from "./accountTypesCrud";
import { accountTypesSlice, callTypes } from "./accountTypesSlice";
const { actions } = accountTypesSlice;
export const fetchAccountTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAccountTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.accountTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find accountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAccountType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.accountTypeFetched({ accountTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAccountTypeById(id)
    .then((response) => {
      const accountType = response.data;
      dispatch(actions.accountTypeFetched({ accountTypeForEdit: accountType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find accountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountType(id)
    .then((response) => {
      dispatch(actions.accountTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAccountType = (accountTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAccountType(accountTypeForCreation)
    .then((response) => {
      const accountType = response.data;
      dispatch(actions.accountTypeCreated(accountType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create accountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountType = (id, accountType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAccountType(id, accountType)
    .then((response) => {
      dispatch(actions.accountTypeUpdated({ accountType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAccountTypes(ids, status)
    .then(() => {
      dispatch(actions.accountTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountTypes(ids)
    .then(() => {
      dispatch(actions.accountTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
