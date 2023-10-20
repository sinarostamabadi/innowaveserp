
import * as requestFromServer from "./loginHistoriesCrud";
import { loginHistoriesSlice, callTypes } from "./loginHistoriesSlice";
const { actions } = loginHistoriesSlice;
export const fetchLoginHistories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findLoginHistories(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.loginHistoriesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find loginHistories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLoginHistory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.loginHistoryFetched({ loginHistoryForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getLoginHistoryById(id)  
    .then((response) => {
      const loginHistory = response.data;
      dispatch(actions.loginHistoryFetched({ loginHistoryForEdit: loginHistory }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find loginHistory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLoginHistory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteLoginHistory(id)  
    .then((response) => {
      dispatch(actions.loginHistoryDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete loginHistory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLoginHistory = (loginHistoryForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createLoginHistory(loginHistoryForCreation)  
    .then((response) => {
      const loginHistory = response.data;
      dispatch(actions.loginHistoryCreated(loginHistory));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create loginHistory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLoginHistory = (loginHistory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateLoginHistory(loginHistory)  
    .then((response) => {
      dispatch(actions.loginHistoryUpdated({ loginHistory }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update loginHistory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLoginHistoriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForLoginHistories(ids, status)  
    .then(() => {
      dispatch(actions.loginHistoriesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update loginHistories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLoginHistories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteLoginHistories(ids)  
    .then(() => {
      dispatch(actions.loginHistoriesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete loginHistories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 