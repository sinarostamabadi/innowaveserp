import * as requestFromServer from "./menuGroupsCrud";
import { menuGroupsSlice, callTypes } from "./menuGroupsSlice";
const { actions } = menuGroupsSlice;
export const fetchMenuGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMenuGroups(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuGroupsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.menuGroupFetched({ menuGroupForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMenuGroupById(id)
    .then((response) => {
      const menuGroup = response.data;
      dispatch(actions.menuGroupFetched({ menuGroupForEdit: menuGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuGroup(id)
    .then((response) => {
      dispatch(actions.menuGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuGroup = (menuGroupForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMenuGroup(menuGroupForCreation)
    .then((response) => {
      const menuGroup = response.data;
      dispatch(actions.menuGroupCreated(menuGroup));
    })
    .catch((error) => {
      error.clientMessage = "Can't create menuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuGroup = (menuGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMenuGroup(menuGroup)
    .then((response) => {
      dispatch(actions.menuGroupUpdated({ menuGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMenuGroups(ids, status)
    .then(() => {
      dispatch(actions.menuGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuGroups(ids)
    .then(() => {
      dispatch(actions.menuGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
