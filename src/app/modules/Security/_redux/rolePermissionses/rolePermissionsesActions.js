import * as requestFromServer from "./rolePermissionsesCrud";
import { rolePermissionsesSlice, callTypes } from "./rolePermissionsesSlice";
const { actions } = rolePermissionsesSlice;
export const fetchRolePermissionses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRolePermissionses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.rolePermissionsesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find rolePermissionses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRolePermissions = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.rolePermissionsFetched({ rolePermissionsForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRolePermissionsById(id)
    .then((response) => {
      const rolePermissions = response.data;
      dispatch(
        actions.rolePermissionsFetched({
          rolePermissionsForEdit: rolePermissions,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find rolePermissions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRolePermissions = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRolePermissions(id)
    .then((response) => {
      dispatch(actions.rolePermissionsDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete rolePermissions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRolePermissions =
  (rolePermissionsForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRolePermissions(rolePermissionsForCreation)
      .then((response) => {
        const rolePermissions = response.data;
        dispatch(actions.rolePermissionsCreated(rolePermissions));
      })
      .catch((error) => {
        error.clientMessage = "Can't create rolePermissions";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRolePermissions = (rolePermissions) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRolePermissions(rolePermissions)
    .then((response) => {
      dispatch(actions.rolePermissionsUpdated({ rolePermissions }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update rolePermissions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRolePermissionsesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRolePermissionses(ids, status)
    .then(() => {
      dispatch(actions.rolePermissionsesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update rolePermissionses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRolePermissionses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRolePermissionses(ids)
    .then(() => {
      dispatch(actions.rolePermissionsesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete rolePermissionses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
