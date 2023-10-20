
import * as requestFromServer from "./actionsCrud";
import { actionsSlice, callTypes } from "./actionsSlice";
const { actions } = actionsSlice;
export const fetchActions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findActions(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.actionsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find actions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAction = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.actionFetched({ actionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getActionById(id)  
    .then((response) => {
      const action = response.data;
      dispatch(actions.actionFetched({ actionForEdit: action }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find action";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAction = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAction(id)  
    .then((response) => {
      dispatch(actions.actionDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete action";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAction = (actionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAction(actionForCreation)  
    .then((response) => {
      const action = response.data;
      dispatch(actions.actionCreated(action));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create action";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAction = (action) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAction(action)  
    .then((response) => {
      dispatch(actions.actionUpdated({ action }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update action";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateActionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForActions(ids, status)  
    .then(() => {
      dispatch(actions.actionsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update actions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteActions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteActions(ids)  
    .then(() => {
      dispatch(actions.actionsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete actions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 