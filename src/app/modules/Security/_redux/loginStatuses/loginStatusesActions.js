import * as requestFromServer from "./loginStatusesCrud";
import { loginStatusesSlice, callTypes } from "./loginStatusesSlice";
const { actions } = loginStatusesSlice;
export const fetchLoginStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLoginStatuses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.loginStatusesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find loginStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLoginStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.loginStatusFetched({ loginStatusForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLoginStatusById(id)
    .then((response) => {
      const loginStatus = response.data;
      dispatch(actions.loginStatusFetched({ loginStatusForEdit: loginStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find loginStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLoginStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLoginStatus(id)
    .then((response) => {
      dispatch(actions.loginStatusDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete loginStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLoginStatus = (loginStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLoginStatus(loginStatusForCreation)
    .then((response) => {
      const loginStatus = response.data;
      dispatch(actions.loginStatusCreated(loginStatus));
    })
    .catch((error) => {
      error.clientMessage = "Can't create loginStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLoginStatus = (loginStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLoginStatus(loginStatus)
    .then((response) => {
      dispatch(actions.loginStatusUpdated({ loginStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update loginStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLoginStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLoginStatuses(ids, status)
    .then(() => {
      dispatch(actions.loginStatusesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update loginStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLoginStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLoginStatuses(ids)
    .then(() => {
      dispatch(actions.loginStatusesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete loginStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
