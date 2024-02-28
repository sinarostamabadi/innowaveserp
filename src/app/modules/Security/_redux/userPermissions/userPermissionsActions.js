import * as requestFromServer from "./userPermissionsCrud";
import { userPermissionsSlice, callTypes } from "./userPermissionsSlice";
const { actions } = userPermissionsSlice;
export const fetchUserPermissions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUserPermissions(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.userPermissionsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find userPermissions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUserPermission = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.userPermissionFetched({ userPermissionForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserPermissionById(id)
    .then((response) => {
      const userPermission = response.data;
      dispatch(
        actions.userPermissionFetched({ userPermissionForEdit: userPermission })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find userPermission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserPermission = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserPermission(id)
    .then((response) => {
      dispatch(actions.userPermissionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userPermission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUserPermission =
  (userPermissionForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createUserPermission(userPermissionForCreation)
      .then((response) => {
        const userPermission = response.data;
        dispatch(actions.userPermissionCreated(userPermission));
      })
      .catch((error) => {
        error.clientMessage = "Can't create userPermission";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateUserPermission = (userPermission) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUserPermission(userPermission)
    .then((response) => {
      dispatch(actions.userPermissionUpdated({ userPermission }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update userPermission";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUserPermissionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUserPermissions(ids, status)
    .then(() => {
      dispatch(actions.userPermissionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update userPermissions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserPermissions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserPermissions(ids)
    .then(() => {
      dispatch(actions.userPermissionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userPermissions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
