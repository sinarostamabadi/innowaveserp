
import * as requestFromServer from "./accountFloatingGroupsCrud";
import { accountFloatingGroupsSlice, callTypes } from "./accountFloatingGroupsSlice";
const { actions } = accountFloatingGroupsSlice;
export const fetchAccountFloatingGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAccountFloatingGroups(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.accountFloatingGroupsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAccountFloatingGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.accountFloatingGroupFetched({ accountFloatingGroupForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAccountFloatingGroupById(id)  
    .then((response) => {
      const accountFloatingGroup = response.data;
      dispatch(actions.accountFloatingGroupFetched({ accountFloatingGroupForEdit: accountFloatingGroup }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatingGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAccountFloatingGroup(id)  
    .then((response) => {
      dispatch(actions.accountFloatingGroupDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAccountFloatingGroup = (accountFloatingGroupForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAccountFloatingGroup(accountFloatingGroupForCreation)
    .then((response) => {
      const accountFloatingGroup = response.data;
      dispatch(actions.accountFloatingGroupCreated(accountFloatingGroup));
    })
    .catch((error) => {
      error.clientMessage = "Can't create accountFloatingGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloatingGroup = (id, accountFloatingGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAccountFloatingGroup(id, accountFloatingGroup)
    .then((response) => {
      dispatch(actions.accountFloatingGroupUpdated({ accountFloatingGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountFloatingGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloatingGroupStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAccountFloatingGroups(ids, status)
    .then(() => {
      dispatch(actions.accountFloatingGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountFloatingGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatingGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountFloatingGroups(ids)
    .then(() => {
      dispatch(actions.accountFloatingGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};