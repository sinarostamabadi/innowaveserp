
import * as requestFromServer from "./rolesesCrud";
import { rolesesSlice, callTypes } from "./rolesesSlice";
const { actions } = rolesesSlice;
export const fetchRoleses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRoleses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.rolesesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find roleses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRoles = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.rolesFetched({ rolesForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRolesById(id)  
    .then((response) => {
      const roles = response.data;
      dispatch(actions.rolesFetched({ rolesForEdit: roles }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRoles = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRoles(id)  
    .then((response) => {
      dispatch(actions.rolesDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete roles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRoles = (rolesForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRoles(rolesForCreation)  
    .then((response) => {
      const roles = response.data;
      dispatch(actions.rolesCreated(roles));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create roles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRoles = (roles) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRoles(roles)  
    .then((response) => {
      dispatch(actions.rolesUpdated({ roles }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update roles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRolesesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRoleses(ids, status)  
    .then(() => {
      dispatch(actions.rolesesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update roleses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRoleses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRoleses(ids)  
    .then(() => {
      dispatch(actions.rolesesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete roleses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 