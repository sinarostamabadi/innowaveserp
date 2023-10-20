import * as requestFromServer from "./accountFloatingCrud";
import { accountFloatingsSlice, callTypes } from "./accountFloatingSlice";
const { actions } = accountFloatingsSlice;

export const fetchAccountFloatings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAccountFloatings(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.accountFloatingsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAccountFloating = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.accountFloatingFetched({ accountFloatingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAccountFloatingById(id)  
    .then((response) => {
      const accountFloating = response.data;
      dispatch(actions.accountFloatingFetched({ accountFloatingForEdit: accountFloating }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloating = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAccountFloating(id)  
    .then((response) => {
      dispatch(actions.accountFloatingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAccountFloating = (accountFloating) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAccountFloating(accountFloating)  
    .then((response) => {
      const accountFloating = response.data;
      dispatch(actions.accountFloatingCreated(accountFloating));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloating = (id, accountFloating) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAccountFloating(id, accountFloating)
    .then((response) => {
      dispatch(actions.accountFloatingUpdated({ accountFloating }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloatingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAccountFloating(ids, status)
    .then(() => {
      dispatch(actions.accountFloatingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountFloating status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountFloatings(ids)
    .then(() => {
      dispatch(actions.accountFloatingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloating";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};