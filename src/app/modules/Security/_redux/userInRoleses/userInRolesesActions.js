
import * as requestFromServer from "./userInRolesesCrud";
import { userInRolesesSlice, callTypes } from "./userInRolesesSlice";
const { actions } = userInRolesesSlice;
export const fetchUserInRoleses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findUserInRoleses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.userInRolesesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find userInRoleses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUserInRoles = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userInRolesFetched({ userInRolesForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getUserInRolesById(id)  
    .then((response) => {
      const userInRoles = response.data;
      dispatch(actions.userInRolesFetched({ userInRolesForEdit: userInRoles }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find userInRoles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserInRoles = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteUserInRoles(id)  
    .then((response) => {
      dispatch(actions.userInRolesDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete userInRoles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUserInRoles = (userInRolesForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createUserInRoles(userInRolesForCreation)  
    .then((response) => {
      const userInRoles = response.data;
      dispatch(actions.userInRolesCreated(userInRoles));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create userInRoles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUserInRoles = (userInRoles) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateUserInRoles(userInRoles)  
    .then((response) => {
      dispatch(actions.userInRolesUpdated({ userInRoles }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update userInRoles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUserInRolesesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForUserInRoleses(ids, status)  
    .then(() => {
      dispatch(actions.userInRolesesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update userInRoleses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserInRoleses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteUserInRoleses(ids)  
    .then(() => {
      dispatch(actions.userInRolesesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete userInRoleses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 