
import * as requestFromServer from "./posUsersCrud";
import { posUsersSlice, callTypes } from "./posUsersSlice";
const { actions } = posUsersSlice;
export const fetchPosUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPosUsers(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.posUsersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find posUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPosUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.posUserFetched({ posUserForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPosUserById(id)  
    .then((response) => {
      const posUser = response.data;
      dispatch(actions.posUserFetched({ posUserForEdit: posUser }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find posUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePosUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePosUser(id)  
    .then((response) => {
      dispatch(actions.posUserDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete posUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPosUser = (posUserForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPosUser(posUserForCreation)  
    .then((response) => {
      const posUser = response.data;
      dispatch(actions.posUserCreated(posUser));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create posUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePosUser = (posUser) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePosUser(posUser)  
    .then((response) => {
      dispatch(actions.posUserUpdated({ posUser }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update posUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePosUsersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPosUsers(ids, status)  
    .then(() => {
      dispatch(actions.posUsersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update posUsers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePosUsers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePosUsers(ids)  
    .then(() => {
      dispatch(actions.posUsersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete posUsers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 